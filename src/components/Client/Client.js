import { Routes, Route } from 'react-router-dom'
import Layout from './Layout/Layout'

import LandingPage from './LandingPage/LandingPage'
import Search from './Search/Search'

import { ProviderContext } from '../../contexts/providers'

const Client = (props) => {

  /* destructure the props */
  const {
    authProvider,
    dataProvider
  } = props

  return (
    <ProviderContext.Provider value={{
      authProvider,
      dataProvider
    }}>
      <Layout>
        <Routes>
        {/*<Route path="/" element={<TestComponent />} />
        <Route path="/home" element={<HomeComponent />} />*/}
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<Search />} />
        </Routes>
      </Layout>
    </ProviderContext.Provider>
  )
}

export default Client;