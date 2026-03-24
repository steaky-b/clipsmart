import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Brands.css'

const BRANDS = [
  {
    id: 'cpkshawn', cat: 'music', name: 'ProdByCPKShawn', type: 'Music Producer',
    desc: 'Music producer promoting the track "Yo Bunny". Needed mass reach to drive streams and TikTok discovery without ad spend.',
    views: '11.3M', spend: '$1,000', cpm: '$0.09', clips: '1,062',
  },
  {
    id: 'murda', cat: 'music', name: 'NHC Murda 60x', type: 'Music Artist',
    desc: 'Indie hip-hop artist with a new single — Murdadale. Started with 7 posts on TikTok. Wanted organic growth without product to ship.',
    views: '12M+', spend: '$2,500', cpm: '$0.21', clips: '1,456',
  },
  {
    id: 'bussin', cat: 'podcast', name: 'Bussin With The Boys', type: 'Sports Podcast',
    desc: 'High-profile sports podcast aiming to grow clip virality across TikTok and YouTube Shorts.',
    views: '3.8M', spend: '$500', cpm: '$0.13', clips: '312',
  },
  {
    id: 'gains', cat: 'ecommerce', name: 'Gains Nutrition', type: 'E-Commerce',
    desc: 'Supplement brand looking to drive product awareness and DTC sales through authentic creator content.',
    views: '4.2M', spend: '$1,500', cpm: '$0.36', clips: '487',
  },
  {
    id: 'base', cat: 'health', name: 'Base Body Works', type: 'Health & Wellness',
    desc: 'Sports performance brand targeting gym-goers and athletes across TikTok and Instagram.',
    views: '2.1M', spend: '$750', cpm: '$0.36', clips: '203',
  },
  {
    id: 'client3', cat: 'sports', name: 'Sports Campaign', type: 'Sports / Events',
    desc: 'PPV event promotion with targeted creator posts driving awareness and ticket interest.',
    views: '1.9M', spend: '$500', cpm: '$0.26', clips: '178',
  },
]

const STATS = [
  { v: '21.5M+', l: 'Total views generated', s: 'Across all brand campaigns' },
  { v: '$0.12', l: 'Average effective CPM', s: 'vs $8–$15 on paid ads' },
  { v: '2,248', l: 'Creator clips approved', s: 'Manually reviewed, every one' },
  { v: '4', l: 'Verticals covered', s: 'Music · Podcast · E-com · Sports' },
]

const CATS = [
  { id: 'all', label: 'All' },
  { id: 'music', label: 'Music' },
  { id: 'podcast', label: 'Podcast' },
  { id: 'ecommerce', label: 'E-Commerce' },
  { id: 'sports', label: 'Sports' },
  { id: 'health', label: 'Health & Wellness' },
]

export default function Brands() {
  const [activeCat, setActiveCat] = useState('all')

  const filtered = activeCat === 'all' ? BRANDS : BRANDS.filter(b => b.cat === activeCat)

  return (
    <>
      <div className="brands-hero fade-up">
        <div className="section" style={{ paddingTop: 'calc(var(--nav-h) + 80px)', paddingBottom: '60px' }}>
          <div className="section-eyebrow">Our Brands</div>
          <h1>Brands that chose<br /><em>performance over promises.</em></h1>
          <p>Every brand below paid only for views that happened. No flat fees, no guesswork. Here's what they got.</p>
        </div>
      </div>

      {/* STATS */}
      <div className="stats-section">
        <div className="stats-inner stagger">
          {STATS.map(({ v, l, s }) => (
            <div key={l} className="stat-block">
              <div className="stat-v">{v}</div>
              <div className="stat-l">{l}</div>
              <div className="stat-s">{s}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURED */}
      <div className="section">
        <div className="section-eyebrow fade-up">Featured</div>
        <h2 className="section-h2 fade-up">Our most talked-about <em>result.</em></h2>
        <div className="featured-card fade-up">
          <div className="fc-left">
            <div className="fc-tag">Music · Featured Campaign</div>
            <div className="fc-logo">NHC</div>
            <div className="fc-name">NHC Murda 60x</div>
            <div className="fc-cat-label">Music Artist</div>
            <p className="fc-desc">
              Indie hip-hop artist with a new single — <em>Murdadale</em>. Started with 7 posts on TikTok.
              Wanted organic growth. No product to ship, no ads. Just performance UGC.
            </p>
          </div>
          <div className="fc-right">
            <div className="fc-metrics">
              {[['12M+','Total views'],['$2,500','Total spend'],['1,456','Creator posts'],['60%','Budget used']].map(([v,l]) => (
                <div key={l} className="fcm">
                  <div className="fcm-val">{v}</div>
                  <div className="fcm-lbl">{l}</div>
                </div>
              ))}
            </div>
            <blockquote className="fc-quote">
              "Went from 7 posts on TikTok to 1,456. From under 1,000 organic views to over 12 million — and we'd only spent 60% of the budget."
            </blockquote>
            <Link to="/case-studies" className="fc-link">Read the full case study →</Link>
          </div>
        </div>
      </div>

      {/* FILTER + GRID */}
      <div className="section" style={{ paddingTop: 0 }}>
        <div className="section-eyebrow fade-up">All Brands</div>
        <h2 className="section-h2 fade-up">Every brand. Every <em>result.</em></h2>
        <div className="brands-filter fade-up">
          {CATS.map(({ id, label }) => (
            <button key={id} className={'brands-ftab' + (activeCat === id ? ' on' : '')} onClick={() => setActiveCat(id)}>
              {label}
            </button>
          ))}
        </div>
        <div className="brands-grid">
          {filtered.map((b) => (
            <div key={b.id} className="brand-card fade-up">
              <div className="brand-card-top" />
              <div className="brand-logo-area">
                <div className="brand-logo-placeholder">{b.id.slice(0,3).toUpperCase()}</div>
                <div>
                  <div className="brand-name">{b.name}</div>
                  <div className="brand-category">{b.type}</div>
                </div>
              </div>
              <p className="brand-desc">{b.desc}</p>
              <div className="brand-metrics">
                {[['Views', b.views],['Spend', b.spend],['CPM', b.cpm],['Clips', b.clips]].map(([l,v]) => (
                  <div key={l} className="bm">
                    <div className="bm-val">{v}</div>
                    <div className="bm-lbl">{l}</div>
                  </div>
                ))}
              </div>
              <Link to="/case-studies" className="brand-link">Full breakdown →</Link>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section">
        <div className="cta-box fade-up">
          <div>
            <h2 className="cta-h">Ready to be on <em>this page?</em></h2>
            <p className="cta-p">Book a call and we'll show you what your budget gets — before you commit a penny.</p>
          </div>
          <div className="cta-actions">
            <a href="https://calendly.com/esaanwar/partner-with-clipsmart" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Book a free call →
            </a>
            <span className="cta-note">No commitment · No agency fees</span>
          </div>
        </div>
      </div>
    </>
  )
}
