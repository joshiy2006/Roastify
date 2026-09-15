import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BlobBackground from './components/BlobBackground'
import SparkleTrail from './components/SparkleTrail'
import Connect from './pages/Connect'
import Landing from './pages/Landing'
import Loading from './pages/Loading'
import Results from './pages/Results'

export default function App() {
  return (
    <BrowserRouter>
      <BlobBackground />
      <SparkleTrail />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/connect/:platform" element={<Connect />} />
        <Route path="/loading/:platform" element={<Loading />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  )
}
