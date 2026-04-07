import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import HowItWorks from './pages/HowItWorks'
import CreatorCampaign from './pages/CreatorCampaign'
import SocialMediaManagement from './pages/SocialMediaManagement'
import ROICalculator from './pages/ROICalculator'
import Creators from './pages/Creators'
import CaseStudies from './pages/CaseStudies'
import WorkWithUs from './pages/WorkWithUs'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="how-it-works/creator-campaign" element={<CreatorCampaign />} />
          <Route path="how-it-works/social-media" element={<SocialMediaManagement />} />
          <Route path="calculator" element={<ROICalculator />} />
          <Route path="creators" element={<Creators />} />
          <Route path="case-studies" element={<CaseStudies />} />
          <Route path="work-with-us" element={<WorkWithUs />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<TermsOfService />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
