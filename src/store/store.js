// Import any needed packages
import { configureStore, combineReducers } from '@reduxjs/toolkit'

import landingReducer from '../slices/LandingPage/LandingPageSlice'
import searchReducer from '../slices/Search/SearchSlice'

// Create a root reducer that comines all the slices reducers together
const rootReducer = combineReducers({
    landingPage: landingReducer,
    search: searchReducer,
})

// Creates a store with all the correct reducers and actions
export const setupStore = preloadedState => {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
}

// create the store so we can add slixes to its reducer
const store = setupStore({})

// Export the store
export default store;