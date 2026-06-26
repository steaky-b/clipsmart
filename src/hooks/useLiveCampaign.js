import { useEffect, useRef, useState } from 'react'
import { computeSnapshot, getVelocityFactor, formatFull } from '../data/activeCampaigns'

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

const ACTIVITY_VERBS = [
  'posted a new clip',
  'clip approved',
  'just went live',
  'hit a new milestone',
]

/*
  Live-feeling campaign counters.

  Seeds from the deterministic `computeSnapshot` (so the numbers match the rest
  of the site and survive refreshes), then ticks upward every 1-2 seconds. Each
  tick adds 1-3 views scaled by a velocity factor derived from the budget size
  and current view count, so bigger campaigns move noticeably faster. Budget
  spent is recomputed from the live view count via the RPM, so it depletes in
  lockstep.
*/
const EMPTY_SNAP = {
  views: 0,
  budgetSpent: 0,
  budgetRemaining: 0,
  posts: 0,
  creators: 0,
  factor: 1,
  viewsPerSecond: 0,
  viewsPerDay: 0,
}

export function useLiveCampaign(campaign) {
  const [snap, setSnap] = useState(() => (campaign ? computeSnapshot(campaign) : EMPTY_SNAP))
  const [activity, setActivity] = useState([])
  const stateRef = useRef(snap)
  const tickCountRef = useRef(0)
  const activityIdRef = useRef(0)

  useEffect(() => {
    if (!campaign) return
    stateRef.current = computeSnapshot(campaign)
    setSnap(stateRef.current)
    setActivity([])
    tickCountRef.current = 0

    let timeoutId

    const scheduleNext = () => {
      const delay = randInt(1000, 2000)
      timeoutId = setTimeout(tick, delay)
    }

    const tick = () => {
      const prev = stateRef.current
      const factor = getVelocityFactor(campaign.budgetTotal, prev.views)
      const viewDelta = randInt(1, 3) * factor

      let views = prev.views + viewDelta
      const maxViews = Math.floor(campaign.viewsGuaranteed * 1.5)
      if (views > maxViews) views = maxViews

      const budgetSpent = Math.min(campaign.budgetTotal, (views / 1000) * campaign.clientRpm)
      const budgetRemaining = Math.max(0, campaign.budgetTotal - budgetSpent)

      tickCountRef.current += 1
      let posts = prev.posts
      let creators = prev.creators
      let newEvent = null

      // Occasionally register a new creator post (cadence scales with velocity).
      const postEvery = Math.max(4, 16 - factor)
      if (tickCountRef.current % postEvery === 0) {
        posts += 1
        const verb = pick(ACTIVITY_VERBS)
        const handle = pick(campaign.bestVideos).handle
        newEvent = { kind: 'post', text: `${handle} ${verb}` }
        if (Math.random() < 0.3) creators += 1
      } else if (tickCountRef.current % 3 === 0) {
        newEvent = {
          kind: 'views',
          text: `+${formatFull(viewDelta)} views in the last few seconds`,
        }
      }

      const next = {
        ...prev,
        views,
        budgetSpent,
        budgetRemaining,
        posts,
        creators,
        factor,
      }
      stateRef.current = next
      setSnap(next)

      if (newEvent) {
        activityIdRef.current += 1
        const entry = { id: activityIdRef.current, ...newEvent }
        setActivity((list) => [entry, ...list].slice(0, 6))
      }

      scheduleNext()
    }

    scheduleNext()
    return () => clearTimeout(timeoutId)
  }, [campaign])

  return { ...snap, activity }
}
