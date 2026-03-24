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
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
