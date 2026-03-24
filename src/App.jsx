import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import HowItWorks from './pages/HowItWorks'
import ROICalculator from './pages/ROICalculator'
import Brands from './pages/Brands'
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
          <Route path="calculator" element={<ROICalculator />} />
          <Route path="brands" element={<Brands />} />
          <Route path="creators" element={<Creators />} />
          <Route path="case-studies" element={<CaseStudies />} />
          <Route path="work-with-us" element={<WorkWithUs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
