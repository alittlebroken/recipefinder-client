import { Routes, Route } from 'react-router-dom'
import Layout from './Layout/Layout'

import LandingPage from './LandingPage/LandingPage'
import Search from './Search/Search'
import LoginForm from './LoginForm/LoginForm'

import { ProviderContext, AccessTokenProvider, useAccessToken } from '../../contexts/providers'

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
      <AccessTokenProvider>
        <Layout>
          <Routes>
          {/*<Route path="/" element={<TestComponent />} />
          <Route path="/home" element={<HomeComponent />} />*/}
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<LoginForm />} />
          </Routes>
        </Layout>
      </AccessTokenProvider>
    </ProviderContext.Provider>
  )
}

export default Client;