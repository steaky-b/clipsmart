import { webkit, devices } from 'playwright'

const iphone = devices['iPhone 13']

const browser = await webkit.launch()
const ctx = await browser.newContext({ ...iphone })
const page = await ctx.newPage()

const url = process.argv[2] || 'https://clipsmart.co.uk/'
console.log('Loading', url, 'as iPhone 13 (WebKit', browser.version() + ')')
await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
await page.waitForTimeout(2500)

const metrics = await page.evaluate(() => {
  const de = document.documentElement
  const offenders = []
  const vw = de.clientWidth
  document.querySelectorAll('*').forEach(el => {
    const r = el.getBoundingClientRect()
    if (r.width > vw + 2) {
      offenders.push({
        tag: el.tagName.toLowerCase(),
        cls: String(el.className).slice(0, 60),
        width: Math.round(r.width),
      })
    }
  })
  return {
    innerWidth: window.innerWidth,
    clientWidth: vw,
    scrollWidth: de.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    visualViewportWidth: window.visualViewport ? window.visualViewport.width : null,
    visualViewportScale: window.visualViewport ? window.visualViewport.scale : null,
    offenders: offenders.slice(0, 15),
  }
})
console.log(JSON.stringify(metrics, null, 2))

// Hamburger visible?
const burger = await page.evaluate(() => {
  const b = document.querySelector('.mob-menu-btn')
  if (!b) return 'NOT FOUND'
  const s = getComputedStyle(b)
  return { display: s.display, visible: b.getBoundingClientRect().width > 0 }
})
console.log('Hamburger:', JSON.stringify(burger))

// Scroll test — JS scroll
const scroll = await page.evaluate(async () => {
  window.scrollTo(0, 600)
  await new Promise(r => setTimeout(r, 600))
  return { jsScrollY: window.scrollY }
})
console.log('JS scroll test:', JSON.stringify(scroll))

// Touch swipe scroll test (real gesture, like a finger drag upward)
await page.evaluate(() => window.scrollTo(0, 0))
await page.waitForTimeout(300)
const t = page.touchscreen
// swipe up: press low on screen, move to top
for (let i = 0; i < 3; i++) {
  await t.tap(195, 500)
  await page.waitForTimeout(100)
}
// Use CDP-free approach: dispatch touch events via evaluate
const touchScroll = await page.evaluate(async () => {
  const before = window.scrollY
  // simulate what scrolling requires: check computed styles that block it
  const html = getComputedStyle(document.documentElement)
  const body = getComputedStyle(document.body)
  return {
    beforeY: before,
    htmlOverflowY: html.overflowY,
    htmlOverflowX: html.overflowX,
    htmlHeight: html.height,
    bodyOverflowY: body.overflowY,
    bodyOverflowX: body.overflowX,
    bodyHeight: body.height,
    bodyPosition: body.position,
    htmlPosition: html.position,
    touchAction: body.touchAction,
    docScrollHeight: document.documentElement.scrollHeight,
    winInnerHeight: window.innerHeight,
    scrollable: document.documentElement.scrollHeight > window.innerHeight,
  }
})
console.log('Scroll diagnostics:', JSON.stringify(touchScroll, null, 2))

await page.evaluate(() => window.scrollTo(0, 0))
await page.waitForTimeout(400)
await page.screenshot({ path: 'mobile-top.png' })
await page.evaluate(() => window.scrollTo(0, 1200))
await page.waitForTimeout(400)
await page.screenshot({ path: 'mobile-mid.png' })
console.log('Screenshots saved: mobile-top.png, mobile-mid.png')

await browser.close()
