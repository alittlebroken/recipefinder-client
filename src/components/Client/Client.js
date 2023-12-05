import { Routes, Route } from 'react-router-dom'
import Layout from './Layout/Layout'

import LandingPage from './LandingPage/LandingPage'
import Search from './Search/Search'
import LoginForm from './LoginForm/LoginForm'
import SignupForm from './SignupForm/SignupForm'
import Profile from './Profile/Profile'
import Ingredients from './Ingredients/Ingredients'
import Pantry from './Pantry/Pantry'
import ProfileCookbooks from './ProfileCookbooks/ProfileCookbooks'
import ProfileCookbook from './ProfileCookbook/ProfileCookbook'
import ProfileRecipes from './ProfileRecipes/ProfileRecipes'
import RecipeDetails from './RecipeDetails/RecipeDetails'

import { ProviderContext, useAccessToken } from '../../contexts/providers'

import ProtectedRoute from './ProtectedRoute/ProtectedRoute'

const Client = (props) => {

  /* destructure the props */
  const {
    authProvider,
    dataProvider
  } = props

  /* accessToken state */
  const [accessToken, setAccessToken] = useAccessToken()

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
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            {/* Protected Routes will go here */}
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/pantry" element={<ProtectedRoute><Pantry /></ProtectedRoute>} />
            <Route path="/profile/recipes" element={<ProfileRecipes />} />
            <Route path="/profile/cookbooks" element={<ProtectedRoute><ProfileCookbooks /></ProtectedRoute>} />
            <Route path="/profile/cookbook/:id" element={<ProtectedRoute><ProfileCookbook /></ProtectedRoute>} />
          </Routes>
        </Layout>

    </ProviderContext.Provider>
  )
}

export default Client;