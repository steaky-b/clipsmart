import './LegalPages.css'

export default function PrivacyPolicy() {
  return (
    <>
      <div className="page-hero">
        <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Legal</div>
        <h1>Privacy <em>Policy</em></h1>
        <p>Last updated: March 2025</p>
      </div>

      <div className="section legal-section">
        <div className="legal-body">

          <div className="legal-block">
            <h2>1. Who We Are</h2>
            <p>ClipSmart ("we", "us", "our") is a performance UGC agency. Our website is <strong>clipsmart.co</strong>. If you have any questions about this policy, contact us at <a href="mailto:hello@clipsmart.co">hello@clipsmart.co</a>.</p>
          </div>

          <div className="legal-block">
            <h2>2. What Data We Collect</h2>
            <p>We collect information you provide directly through our contact form ("Work With Us"):</p>
            <ul>
              <li>First and last name</li>
              <li>Email address</li>
              <li>Brand or company name</li>
              <li>Campaign type and budget range</li>
              <li>Any additional details you choose to include</li>
            </ul>
            <p>We do not collect any data automatically beyond standard browser behaviour (e.g. no tracking pixels, no analytics cookies).</p>
          </div>

          <div className="legal-block">
            <h2>3. How We Use Your Data</h2>
            <p>The information you submit is used solely to:</p>
            <ul>
              <li>Respond to your enquiry</li>
              <li>Discuss and scope a potential campaign</li>
              <li>Send follow-up information you have requested</li>
            </ul>
            <p>We will never sell, rent, or share your personal data with third parties for marketing purposes.</p>
          </div>

          <div className="legal-block">
            <h2>4. Third-Party Services</h2>
            <p>We use the following third-party services that may process data on our behalf:</p>
            <ul>
              <li><strong>Netlify</strong> — hosts this website and processes form submissions. Submissions are stored securely in your Netlify account. See <a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer">Netlify's Privacy Policy</a>.</li>
              <li><strong>Calendly</strong> — used for scheduling discovery calls. If you book a call, Calendly collects your name and email. See <a href="https://calendly.com/privacy" target="_blank" rel="noopener noreferrer">Calendly's Privacy Policy</a>.</li>
            </ul>
          </div>

          <div className="legal-block">
            <h2>5. Cookies</h2>
            <p>This website does not set any first-party cookies. Third-party services (Netlify, Calendly) may set cookies in accordance with their own policies when you interact with their functionality.</p>
          </div>

          <div className="legal-block">
            <h2>6. Data Retention</h2>
            <p>Form submission data is retained in Netlify for as long as needed to handle your enquiry and maintain records of our correspondence. You may request deletion at any time by emailing <a href="mailto:hello@clipsmart.co">hello@clipsmart.co</a>.</p>
          </div>

          <div className="legal-block">
            <h2>7. Your Rights</h2>
            <p>Depending on your location, you may have the right to access, correct, or delete the personal data we hold about you. To exercise any of these rights, email us at <a href="mailto:hello@clipsmart.co">hello@clipsmart.co</a> and we will respond within 30 days.</p>
          </div>

          <div className="legal-block">
            <h2>8. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date. Continued use of the site after changes constitutes acceptance of the updated policy.</p>
          </div>

        </div>
      </div>
    </>
  )
}
