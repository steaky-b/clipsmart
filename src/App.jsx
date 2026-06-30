import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import HowItWorks from './pages/HowItWorks'
import CreatorCampaign from './pages/CreatorCampaign'
import SocialMediaManagement from './pages/SocialMediaManagement'
import UGC from './pages/UGC'
import Clipping from './pages/Clipping'
import ROICalculator from './pages/ROICalculator'
import Creators from './pages/Creators'
import CaseStudies from './pages/CaseStudies'
import Dashboard from './pages/Dashboard'
import ActiveCampaignDetail from './pages/ActiveCampaignDetail'
import WorkWithUs from './pages/WorkWithUs'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Active Campaigns dashboard — its own full-page layout */}
          <Route path="/active-campaigns" element={<Dashboard />} />
          {/* Backward-compat: old /dashboard links redirect to the renamed page */}
          <Route path="/dashboard" element={<Navigate to="/active-campaigns" replace />} />

          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="how-it-works" element={<HowItWorks />} />
            <Route path="how-it-works/creator-campaign" element={<CreatorCampaign />} />
            <Route path="how-it-works/social-media" element={<SocialMediaManagement />} />
            <Route path="how-it-works/ugc" element={<UGC />} />
            <Route path="how-it-works/clipping" element={<Clipping />} />
            <Route path="calculator" element={<ROICalculator />} />
            <Route path="creators" element={<Creators />} />
            <Route path="case-studies" element={<CaseStudies />} />
            <Route path="work-with-us" element={<WorkWithUs />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<TermsOfService />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
