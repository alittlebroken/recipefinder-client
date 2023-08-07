import { Routes, Route } from 'react-router-dom'
import Layout from './Layout/Layout'

import LandingPage from './LandingPage/LandingPage'

const Client = () => {
  return (
    <Layout>
      <Routes>
       {/*<Route path="/" element={<TestComponent />} />
       <Route path="/home" element={<HomeComponent />} />*/}
       <Route path="/" element={<LandingPage />} />
      </Routes>
    </Layout>
  )
}

export default Client;