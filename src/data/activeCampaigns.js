/*
  Placeholder ACTIVE campaigns.
  These currently reuse past-campaign assets (images + creator clips) with a
  live-simulation config layered on top. Swap in real active campaigns later by
  editing the entries below — the page + live counters will pick them up
  automatically.

  Live model:
  - `clientRpm` is $ per 1,000 views, so budget spent is derived directly from
    the live view count (pay-per-view).
  - `anchorISO` + `baseViews` are the deterministic starting point. Views grow
    from that anchor based on real elapsed time, so refreshing the page does NOT
    reset the numbers — they keep climbing.
  - The growth rate ("velocity") scales with the budget size and how many views
    already exist, so bigger campaigns visibly move faster.
*/

export const ACTIVE_CAMPAIGNS = [
  {
    slug: 'murdadale',
    name: 'NHC Murda',
    cat: 'music',
    catLabel: 'Music',
    subtitle: '"Murdadale" — Single Launch',
    summary:
      'Indie hip-hop artist scaling a debut single across TikTok. Started with a handful of posts; now a full creator swarm is pushing the audio into discovery feeds every single day.',
    img: '/cs-nhc-murda.png',
    gradient: 'linear-gradient(135deg,#0d0d1a,#05050a)',
    clips: [
      'linear-gradient(160deg,#0d0d4a,#05051a)',
      'linear-gradient(160deg,#0a0a3a,#050515)',
      'linear-gradient(160deg,#0d0d55,#05051a)',
    ],
    videos: ['/murda-clip-1.mp4', '/murda-clip-2.mp4', '/murda-clip-3.mp4'],
    onboardedDate: '2026-05-20',
    anchorISO: '2026-06-26T09:00:00Z',
    budgetTotal: 5000,
    clientRpm: 1,
    viewsGuaranteed: 5000000,
    baseViews: 3850000,
    basePosts: 742,
    baseCreators: 318,
    platformSplit: { TikTok: 78, Instagram: 16, YouTube: 6 },
    bestVideos: [
      { handle: '@nightcore.murda', platform: 'TikTok', views: 612000, video: '/murda-clip-1.mp4' },
      { handle: '@uk.drill.daily', platform: 'TikTok', views: 488000, video: '/murda-clip-2.mp4' },
      { handle: '@thementionplug', platform: 'Instagram', views: 274000, video: '/murda-clip-3.mp4' },
    ],
  },
  {
    slug: 'based-bodyworks',
    name: 'Based Bodyworks',
    cat: 'health',
    catLabel: 'Health & Wellness',
    subtitle: 'Sports Performance',
    summary:
      'Sports performance brand putting authentic gym content in front of athletes. Creators feature the brand naturally inside training content their audiences already watch.',
    img: '/cs-base-body-works.png',
    gradient: 'linear-gradient(135deg,#1a1a0d,#0a0a05)',
    clips: [
      'linear-gradient(160deg,#4a4a0d,#1a1a05)',
      'linear-gradient(160deg,#3a3a0a,#151505)',
      'linear-gradient(160deg,#55550d,#1a1a05)',
    ],
    videos: ['/base-clip-1.mp4', '/base-clip-2.mp4', '/base-clip-3.mp4'],
    onboardedDate: '2026-06-02',
    anchorISO: '2026-06-26T09:00:00Z',
    budgetTotal: 2000,
    clientRpm: 1,
    viewsGuaranteed: 2000000,
    baseViews: 1240000,
    basePosts: 286,
    baseCreators: 142,
    platformSplit: { TikTok: 62, Instagram: 33, YouTube: 5 },
    bestVideos: [
      { handle: '@liftedwithleo', platform: 'TikTok', views: 198000, video: '/base-clip-1.mp4' },
      { handle: '@hypertrophy.hub', platform: 'Instagram', views: 142000, video: '/base-clip-2.mp4' },
      { handle: '@5amgrindset', platform: 'TikTok', views: 121000, video: '/base-clip-3.mp4' },
    ],
  },
  {
    slug: 'growing-up-italian',
    name: 'Growing Up Italian',
    cat: 'podcast',
    catLabel: 'Podcast',
    subtitle: 'Comedy Podcast',
    summary:
      'High-profile comedy podcast turning its best moments into short-form clips. Native-feeling cuts are introducing the show to a younger audience on TikTok and Reels.',
    img: '/cs-growing-up-italian.png',
    gradient: 'linear-gradient(135deg,#1a0d0d,#0a0505)',
    clips: [
      'linear-gradient(160deg,#4a0d0d,#1a0505)',
      'linear-gradient(160deg,#3a0a0a,#150505)',
      'linear-gradient(160deg,#550d0d,#1a0505)',
    ],
    videos: ['/bussin-clip-1.mp4', '/bussin-clip-2.mp4', '/bussin-clip-3.mp4'],
    onboardedDate: '2026-06-12',
    anchorISO: '2026-06-26T09:00:00Z',
    budgetTotal: 750,
    clientRpm: 1,
    viewsGuaranteed: 750000,
    baseViews: 512000,
    basePosts: 168,
    baseCreators: 96,
    platformSplit: { TikTok: 54, Instagram: 30, YouTube: 16 },
    bestVideos: [
      { handle: '@italianculture.clips', platform: 'TikTok', views: 86000, video: '/bussin-clip-1.mp4' },
      { handle: '@podcut.daily', platform: 'Instagram', views: 61000, video: '/bussin-clip-2.mp4' },
      { handle: '@nonna.knows', platform: 'TikTok', views: 47000, video: '/bussin-clip-3.mp4' },
    ],
  },
]

export function getActiveCampaign(slug) {
  return ACTIVE_CAMPAIGNS.find((c) => c.slug === slug) || null
}

/*
  Velocity factor: how fast a campaign moves. Scales with budget size and the
  number of views already accumulated, so a $5k / 4M-view campaign moves much
  faster than a $750 / 500k one. Minimum of 1 keeps small campaigns ticking at
  the baseline "1-3 views every 1-2 seconds".
*/
export function getVelocityFactor(budgetTotal, views) {
  return Math.max(1, Math.round(budgetTotal / 1000 + views / 1000000))
}

const MS_PER_SEC = 1000
const SEC_PER_DAY = 86400

/*
  Deterministic snapshot of a campaign's "current" numbers based on real elapsed
  time since its anchor. This is the source of truth for the starting values so
  the counters survive a page refresh and keep climbing.
*/
export function computeSnapshot(c, now = Date.now()) {
  const anchor = new Date(c.anchorISO).getTime()
  const elapsedSec = Math.max(0, (now - anchor) / MS_PER_SEC)
  const factor = getVelocityFactor(c.budgetTotal, c.baseViews)
  // Avg increment (2) per avg interval (1.5s) * factor -> views/sec.
  const viewsPerSecond = (2 / 1.5) * factor

  const maxViews = Math.floor(c.viewsGuaranteed * 1.5)
  let views = Math.floor(c.baseViews + viewsPerSecond * elapsedSec)
  if (views > maxViews) views = maxViews

  const budgetSpent = Math.min(c.budgetTotal, (views / 1000) * c.clientRpm)
  const budgetRemaining = Math.max(0, c.budgetTotal - budgetSpent)

  const posts = c.basePosts + Math.floor(elapsedSec / 900) // +1 post / 15 min
  const creators = c.baseCreators + Math.floor(elapsedSec / 3600) // +1 creator / hr
  const viewsPerDay = Math.round(viewsPerSecond * SEC_PER_DAY)

  return {
    views,
    budgetSpent,
    budgetRemaining,
    posts,
    creators,
    factor,
    viewsPerSecond,
    viewsPerDay,
  }
}

export function daysSince(dateStr, now = Date.now()) {
  const start = new Date(dateStr).getTime()
  return Math.max(1, Math.floor((now - start) / (SEC_PER_DAY * MS_PER_SEC)))
}

export function formatViews(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(2) + 'M'
  if (n >= 1000) return Math.round(n / 1000) + 'K'
  return String(Math.round(n))
}

export function formatFull(n) {
  return Math.round(n).toLocaleString('en-US')
}

export function formatMoney(n) {
  return '$' + Math.round(n).toLocaleString('en-US')
}
