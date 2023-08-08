import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import apiProvider from '../../providers/apiProvider';

// Thunks
// Performs a search against the API
export const performSearch = createAsyncThunk('search/performSearch',
    async (payload, thunkAPI) => {

        try{

            // Get the search terms
            const {
                terms,
                options,
                pagination,
                sort
            } = payload

            // Create the params to send to the API
            const params = {
                sort: {
                    field: sort.field || 'created_at',
                    order: sort.order || 'desc'
                },
                pagination: {
                    page: pagination.page || 1,
                    perPage: pagination.perPage || 10
                },
                payload: {
                    terms,
                    typeOfSearch: options ? options : 'recipes'
                }
            }

            // Perform the request
            return await apiProvider.search(params)

        } catch(e) {
            throw e
        }

    }
)

// Create the initial state for the store
const initialState = {
    terms: '',
    results: [],
    page: 1,
    totalPages: 1,
    totalRecords: 10,
    isLoading: false,
    hasError: false
}

// Create the actual slice
export const searchSlice = createSlice({
    name: "search",
    initialState: initialState,
    reducers: {
        setSearchTerms: (state, action) => {
            state.terms = action.payload
        },
    },
    extraReducers: {
        [performSearch.pending]: (state, action) => {
            state.isLoading = true
            state.hasError = false
        },
        [performSearch.rejected]: (state, action) => {
            state.isLoading = false
            state.hasError = true
        },
        [performSearch.fulfilled]: (state, action) => {
            state.isLoading = false
            state.hasError = false

            // Extract the data from the API results
            console.log(action)

            state.results = action.payload

        }
    }
})

// Export the selects for the data
export const selectSearchResults = state => state.search.results
export const selectSearchTerms = state => state.search.terms
export const selectSearchPage = state => state.search.page
export const selectSearchNumPages = state => state.search.totalPages
export const selectSearchNumRecords = state => state.search.totalRecords
export const selectSearchLoading = state => state.search.isLoading
export const selectSearchErrored = state => state.search.hasError

// Export the reducer for this slice
export default searchSlice.reducer;