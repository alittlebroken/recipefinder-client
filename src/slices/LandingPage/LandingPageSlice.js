import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import apiProvider from '../../providers/apiProvider';

// Thunks for gathering the API data

/* Latest Recipes */
export const getLatestRecipes = createAsyncThunk('landingpage/getLatestRecipes',
    async (payload, thunkAPI) => {

        try{

            // Extract the parameters from the payload
            const params = {
                sort: {
                    field: 'created_at',
                    order: 'desc'
                },
                pagination: {
                    page: 1,
                    perPage: 3
                }
            }

            return await apiProvider.getList('recipes', params);

        } catch(error) {
            throw error;
        }

    }
)

/* Popular Recipes */
const getPopularRecipes = createAsyncThunk('landingPage/getPopularRecipes', 
    async (payload, thunkAPI) => {

        try {

            // Extract parameters from the payload
            const params = {
                sort: {
                    field: 'rating',
                    order: 'desc'
                },
                pagination: {
                    page: 1,
                    perPage: 6
                }
            }

            return await apiProvider.getList('recipes', params)

        } catch(error) {
            throw error
        }

    }
)

/* Categories */
const getCategories = createAsyncThunk('landingPage/getCategories', 
    async (payload, thunkAPI) => {

        try{

            // Extract parameters from the payload
            const params = {
                sort: {
                    field: 'rating',
                    order: 'desc'
                },
                pagination: {
                    page: 1,
                    perPage: 6
                }
            }

            return await apiProvider.getList('categories', params)

        } catch(error) {
            throw error
        }

    }
)

// Initial State of this slice
const initialState = {
    latest: [],
    popular: [],
    categories: [],
    isLoading: false,
    hasError: false
}

// Create the slice
export const landingpageSlice = createSlice({
    name: 'landingpage',
    initialState: initialState,
    reducers: {

    },
    extraReducers: {
        [getLatestRecipes.pending]: (state, action) => {
            state.isLoading = true
            state.hasError = false
        },
        [getLatestRecipes.rejected]: (state, action) => {
            state.isLoading = false
            state.hasError = true
        },
        [getLatestRecipes.fulfilled]: (state, action) => {
            state.isLoading = false
            state.hasError = false

            // Parse the payload
            const results = action.payload?.data?.results

            // Store the results returned
            state.latest = results
        },
        [getPopularRecipes.pending]: (state, action) => {
            state.isLoading = true
            state.hasError = false
        },
        [getPopularRecipes.rejected]: (state, action) => {
            state.isLoading = false
            state.hasError = true
        },
        [getPopularRecipes.fulfilled]: (state, action) => {
            state.isLoading = false
            state.hasError = false

            // Parse the data returned from the thunk
            const results = JSON.parse(action.payload)

            // Store the results returned
            state.popular = results?.data
        },
        [getCategories.pending]: (state, action) => {
            state.isLoading = true
            state.hasError = false
        },
        [getCategories.rejected]: (state, action) => {
            state.isLoading = false
            state.hasError = true
        },
        [getCategories.fulfilled]: (state, action) => {
            state.isLoading = false
            state.hasError = false

            // Parse the returned data
            const results = JSON.parse(action.payload)

            // Store the returned results
            state.categories = results?.data
        }
    },
})

// Export selectors
export const selectLatestRecipes = state => state.landingPage?.latest
export const selectLatestCount = state => state.landingPage?.latest.length
export const selectPopularRecipes = state => state.landingPage?.popular
export const selectCategories = state => state.landingPage?.categories
export const selectisLoading = state => state.landingPage?.isLoading
export const selectHasError = state => state.landingPage?.hasError

// Export actions

// Export the reducer for the slice
export default landingpageSlice.reducer;