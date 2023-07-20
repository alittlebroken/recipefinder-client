// Import any needed packages
import { configureStore } from '@reduxjs/toolkit'

import landingReducer from '../slices/LandingPage/LandingPageSlice'

// create the store so we can add slixes to its reducer
const store = configureStore({
    reducer: {
        landingPage: landingReducer,
    }
})

// Export the store
export default store;