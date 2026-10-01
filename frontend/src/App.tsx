import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BlobBackground from './components/BlobBackground'
import ErrorBoundary from './components/ErrorBoundary'
import SparkleTrail from './components/SparkleTrail'
import Connect from './pages/Connect'
import Landing from './pages/Landing'
import Loading from './pages/Loading'
import NotFound from './pages/NotFound'
import Results from './pages/Results'

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <BlobBackground />
        <SparkleTrail />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/connect/:platform" element={<Connect />} />
          <Route path="/loading/:platform" element={<Loading />} />
          <Route path="/results" element={<Results />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
