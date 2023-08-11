import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import apiProvider from '../../providers/apiProvider';

// Thunks
// Performs a search against the API
export const performSearch = createAsyncThunk('search/performSearch',
    async (payload, thunkAPI) => {

        try{

            const state = thunkAPI.getState()

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
                    typeOfSearch: state.searchOptions ? state.searchOptions : 'recipes'
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
    searchOptions: '',
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
        setSearchOptions: (state, action) => {
            state.searchOptions = action.payload
        },
        clearSearchResults: (state, action) => {
            state.searchResults = []
        }
    },
    extraReducers: {
        [performSearch.pending]: (state, action) => {
            state.isLoading = true
            state.hasError = false
        },
        [performSearch.rejected]: (state, action) => {
            state.isLoading = false
            state.hasError = true
            state.results = []
        },
        [performSearch.fulfilled]: (state, action) => {
            state.isLoading = false
            state.hasError = false

            // Extract the data from the API results
            if(Array.isArray(action.payload.results)){
                state.results = action.payload.results
            } else {
                state.results = action.payload.results.results
            }
            
            state.page = action.payload.results.currentPage
            state.totalPages = action.payload.results.totalPages
            state.totalRecords = action.payload.results.totalRecords

        }
    }
})

// Export the selects for the data
export const selectSearchResults = state => state.search.results
export const selectSearchTerms = state => state.search.terms
export const selectSearchOptions = state => state.search.searchOptions
export const selectSearchPage = state => state.search.page
export const selectSearchNumPages = state => state.search.totalPages
export const selectSearchNumRecords = state => state.search.totalRecords
export const selectSearchLoading = state => state.search.isLoading
export const selectSearchErrored = state => state.search.hasError

// Export the actions/reducers
export const { setSearchTerms, setSearchOptions, clearSearchResults } = searchSlice.actions

// Export the reducer for this slice
export default searchSlice.reducer;