import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { apiProvider } from '../../providers/apiProvider';

// Thunks for gathering the API data
export const getLatestRecipes = createAsyncThunk('landingpage/getLatestRecipes',
    async (payload, thunkAPI) => {

        try{

            // Extract the parameters from the payload
            const resource = payload.resource
            const params = {
                sort: {
                    field: 'created_at',
                    order: 'desc'
                },
                pagination: {
                    page: 1,
                    perPage: 5
                }
            }

            return await apiProvider.getList(resource, params);

        } catch(error) {
            throw error;
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
            const results = JSON.parse(action.payload)

            // Store the results returned
            state.latest = results?.data
        }
    },
})

// Export selectors
export const selectLatestRecipes = state => state.landingpage?.latest
export const selectisLoading = state => state.landingpage?.isLoading
export const selectHasError = state => state.landingPage?.hasError

// Export actions

// Export the reducer for the slice
export default landingpageSlice.reducer;