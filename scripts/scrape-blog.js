/**
 * scrape-blog.js — GoDaddy blog scraper
 * Fetches all articles from lanebelone.com JSON feed, scrapes full body via
 * Playwright (JS-rendered content), downloads hero images, writes .md files.
 *
 * Run: node scripts/scrape-blog.js
 * Output: src/content/blog/<slug>.md, public/images/blog/<slug>-hero.<ext>
 */

const { chromium } = require('playwright')
const { load } = require('cheerio')
const fs = require('fs')
const path = require('path')
const https = require('https')
const http = require('http')

const BASE_URL = 'https://lanebelone.com'
const FEED_URL = `${BASE_URL}/blog/f.json`
const CONTENT_DIR = path.join(__dirname, '..', 'src', 'content', 'blog')
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images', 'blog')
const ERRORS_LOG = path.join(__dirname, 'scrape-errors.log')
const DELAY_MS = 2000 // polite delay between article requests

// Ensure output directories exist
fs.mkdirSync(CONTENT_DIR, { recursive: true })
fs.mkdirSync(IMAGES_DIR, { recursive: true })
if (fs.existsSync(ERRORS_LOG)) fs.unlinkSync(ERRORS_LOG)

function logError(msg) {
  console.error('[ERROR]', msg)
  fs.appendFileSync(ERRORS_LOG, msg + '\n')
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Download a file from a URL to a local path using Node's http/https.
 * Returns the local file path or null on failure.
 */
async function downloadFile(url, localPath) {
  return new Promise((resolve) => {
    const proto = url.startsWith('https') ? https : http
    const file = fs.createWriteStream(localPath)
    proto.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close()
        fs.unlinkSync(localPath)
        downloadFile(res.headers.location, localPath).then(resolve)
        return
      }
      if (res.statusCode !== 200) {
        file.close()
        fs.unlinkSync(localPath)
        resolve(null)
        return
      }
      res.pipe(file)
      file.on('finish', () => {
        file.close()
        resolve(localPath)
      })
    }).on('error', (err) => {
      file.close()
      if (fs.existsSync(localPath)) fs.unlinkSync(localPath)
      resolve(null)
    })
  })
}

/**
 * Extract hero image URL from html_content field in the JSON feed.
 * The field is always: <img src="URL"/><p>snippet...</p>
 */
function extractHeroUrl(htmlContent) {
  const match = htmlContent.match(/src="([^"]+)"/)
  return match ? match[1] : null
}

/**
 * Given a hero image URL, derive a clean local filename.
 * Returns { localPath, publicPath } where publicPath is used in frontmatter.
 */
function heroImagePaths(slug, heroUrl) {
  const ext = heroUrl.split('.').pop().split('?')[0].toLowerCase()
  const safeExt = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext) ? ext : 'jpg'
  const filename = `${slug}-hero.${safeExt}`
  return {
    localPath: path.join(IMAGES_DIR, filename),
    publicPath: `/images/blog/${filename}`,
  }
}

/**
 * Clean GoDaddy article body HTML:
 * - Remove inline style attributes
 * - Remove GoDaddy-specific class attributes
 * - Keep semantic tags: p, h1-h4, strong, em, ul, ol, li, a, br, blockquote, img
 */
function cleanHtml(rawHtml) {
  if (!rawHtml) return ''
  const $ = load(rawHtml, { decodeEntities: false })

  // Strip all class and style attributes from every element
  $('*').each((_, el) => {
    delete el.attribs.class
    delete el.attribs.style
    delete el.attribs['data-ux']
    delete el.attribs['data-aid']
    delete el.attribs['data-typography']
    delete el.attribs['data-font-scaled']
    delete el.attribs['data-promoted-from']
    delete el.attribs['data-order']
    delete el.attribs['role']
    delete el.attribs['aria-level']
  })

  // Remove empty span wrappers (GoDaddy wraps everything in <span>)
  $('span').each((_, el) => {
    const $el = $(el)
    $el.replaceWith($el.html())
  })

  return $.html('body').replace(/<\/?body>/g, '').trim()
}

/**
 * Generate a 155-char description from plain text (for SEO meta).
 */
function makeDescription(htmlBody) {
  // Strip all tags, HTML entities, and collapse whitespace
  const text = htmlBody
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
  if (text.length <= 155) return text
  const cut = text.lastIndexOf(' ', 155)
  return text.substring(0, cut > 0 ? cut : 155) + '...'
}

/**
 * Write a single article's .md file.
 */
function writeArticle(slug, title, date, category, heroPublicPath, bodyHtml) {
  const description = makeDescription(bodyHtml)

  const frontmatter = [
    '---',
    `title: ${JSON.stringify(title.trim())}`,
    `slug: ${JSON.stringify(slug)}`,
    `date: ${JSON.stringify(date)}`,
    `category: ${JSON.stringify(category)}`,
    `heroImage: ${JSON.stringify(heroPublicPath)}`,
    `description: ${JSON.stringify(description)}`,
    '---',
    '',
  ].join('\n')

  const filePath = path.join(CONTENT_DIR, `${slug}.md`)
  fs.writeFileSync(filePath, frontmatter + bodyHtml + '\n', 'utf8')
  return filePath
}

/**
 * Detect category from article title and content.
 * GoDaddy doesn't expose category via the JSON feed; derive heuristically.
 */
function detectCategory(title, htmlContent) {
  const t = title.toLowerCase()
  const c = htmlContent.toLowerCase()
  if (c.includes('distillation') || t.includes('distillation')) return 'the-distillation'
  if (t.includes('sovereignty') || c.includes('joyful sovereignty')) return 'joyful-sovereignty'
  if (t.includes('flow') || t.includes('mastery') || t.includes('creativity')) return 'performance'
  if (t.includes('podcast') || t.includes('replay') || t.includes('masterclass')) return 'media'
  if (t.includes('chakra') || t.includes('energy') || t.includes('healing')) return 'media'
  return 'philosophy'
}

async function main() {
  console.log('Fetching JSON feed from', FEED_URL)
  const feedRes = await fetch(FEED_URL)
  const feed = await feedRes.json()
  const items = feed.items || []
  console.log(`Found ${items.length} articles in feed.\n`)

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  })

  const results = []

  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const rawSlug = item.id
    const slug = decodeURIComponent(rawSlug)
    const title = item.title.trim()
    const date = item.date_modified
      ? item.date_modified.substring(0, 10)
      : new Date().toISOString().substring(0, 10)
    const heroUrl = extractHeroUrl(item.html_content || '')
    const articleUrl = item.url

    console.log(`[${i + 1}/${items.length}] ${slug}`)

    // --- Download hero image ---
    let heroPublicPath = '/images/blog/placeholder-hero.jpg'
    if (heroUrl) {
      const { localPath, publicPath } = heroImagePaths(slug, heroUrl)
      if (!fs.existsSync(localPath)) {
        const result = await downloadFile(heroUrl, localPath)
        if (result) {
          heroPublicPath = publicPath
          console.log('  ✓ Hero image downloaded:', publicPath)
        } else {
          logError(`Failed to download hero for ${slug}: ${heroUrl}`)
          heroPublicPath = publicPath // still set path even if download failed
        }
      } else {
        heroPublicPath = publicPath
        console.log('  ✓ Hero image already exists:', publicPath)
      }
    } else {
      logError(`No hero image URL found for ${slug}`)
    }

    // --- Scrape article body ---
    const page = await context.newPage()
    let bodyHtml = ''
    try {
      await page.goto(articleUrl, { waitUntil: 'load', timeout: 60000 })

      // Wait for the dynamic article content to render (RSS widget loads async)
      try {
        await page.waitForFunction(() => {
          const els = document.querySelectorAll('[class*="x-rt"]')
          return [...els].some(el => el.innerText && el.innerText.length > 500)
        }, { timeout: 20000 })
      } catch {
        // proceed anyway — content may still be partially available
      }

      // Find the x-rt element with the most text (article body)
      const xrtContents = await page.$$eval('[class*="x-rt"]', els =>
        els.map(el => ({
          textLength: (el.innerText || '').length,
          innerHTML: el.innerHTML,
        }))
      )

      const articleEl = xrtContents
        .filter(el => el.textLength > 500)
        .sort((a, b) => b.textLength - a.textLength)[0]

      if (articleEl) {
        bodyHtml = cleanHtml(articleEl.innerHTML)
        console.log(`  ✓ Body scraped (${articleEl.textLength} chars)`)
      } else {
        logError(`Could not find article body for ${slug} (no x-rt element > 500 chars)`)
        bodyHtml = '<p>Content not available.</p>'
      }
    } catch (err) {
      logError(`Page scrape error for ${slug}: ${err.message}`)
      bodyHtml = '<p>Content not available.</p>'
    } finally {
      await page.close()
    }

    // --- Detect category ---
    const category = detectCategory(title, item.html_content || '')

    // --- Write .md file ---
    const filePath = writeArticle(slug, title, date, category, heroPublicPath, bodyHtml)
    console.log(`  ✓ Written: ${path.basename(filePath)}`)
    results.push({ slug, title, date, category, heroPublicPath, status: 'ok' })

    // Polite delay between requests
    if (i < items.length - 1) await sleep(DELAY_MS)
  }

  await browser.close()

  console.log(`\n✅ Done. ${results.length} articles written to ${CONTENT_DIR}`)
  if (fs.existsSync(ERRORS_LOG)) {
    const errors = fs.readFileSync(ERRORS_LOG, 'utf8').trim()
    if (errors) {
      console.log(`\n⚠️  Errors logged to ${ERRORS_LOG}:`)
      console.log(errors)
    }
  }
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
