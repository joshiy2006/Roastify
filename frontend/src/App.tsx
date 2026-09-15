import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BlobBackground from './components/BlobBackground'
import SparkleTrail from './components/SparkleTrail'
import ComingSoon from './pages/ComingSoon'
import Landing from './pages/Landing'

export default function App() {
  return (
    <BrowserRouter>
      <BlobBackground />
      <SparkleTrail />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/connect/:platform" element={<ComingSoon />} />
        <Route path="/results" element={<ComingSoon />} />
      </Routes>
    </BrowserRouter>
  )
}
