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

            console.table(payload)

            // Create the params to send to the API
            const params = {
                sort: {
                    field: sort.field || 'created_at',
                    order: sort.order || 'desc'
                },
                pagination: {
                    page: state.search.page || 1,
                    //perPage: pagination.perPage || 10
                    perPage: state.search.recsPerPage || 5
                },
                payload: {
                    terms: state.search.terms || terms,
                    typeOfSearch: state.search.searchOptions ? state.search.searchOptions : 'recipes'
                }
            }

            console.table(params)

            // Perform the request
            return await apiProvider.search(params)

        } catch(e) {
            throw e
        }

    }
)

// Performs a search against the API wioth pantry ingredients
export const performPantrySearch = createAsyncThunk('search/performPantrySearch',
    async (payload, thunkAPI) => {

        try{

            const state = thunkAPI.getState()
            
            // Get the search terms
            const {
                terms,
                options,
                pagination,
                sort,
                ingredients
            } = payload

            // Create the params to send to the API
            const params = {
                auth: {
                    authenticate: true
                },
                sort: {
                    field: sort?.field || 'created_at',
                    order: sort?.order || 'desc'
                },
                pagination: {
                    page: state?.search?.page || 1,
                    //perPage: pagination.perPage || 10
                    perPage: state?.search?.recsPerPage || 5
                },
                payload: {
                    ingredients
                }
            }

            // Perform the request
            return await apiProvider.pantrySearch(params)

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
    recsPerPage: 5,
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
        },
        increasePage: (state, action) => {
            state.page += 1
            /* Check we have not gone past the upper page limit */
            if(state.page > state.totalPages) state.page = state.totalPages
        },
        decreasePage: (state, action) => {
            state.page -= 1
            /* Check we have not gone past the lower page limit */
            if(state.page < 1) state.page = 1
        },
        setRecsPerPage: (state, action) => {
            state.recsPerPage = parseInt(action.payload) || 5
        },
        goToPage: (state, action) => {
            state.page = parseInt(action.payload)
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
            state.results = []
        },
        [performSearch.fulfilled]: (state, action) => {
            state.isLoading = false
            state.hasError = false
            
            // Extract the data from the API results
            if(Array.isArray(action.payload.results)){
                state.results = action.payload.results
            } else {
                state.results = action?.payload?.results?.results
            }

            /* Check if we have some results */
            if(state.results?.length < 1){
                state.page = 1
                state.totalPages = 1
                state.totalRecords = 0
            } else {
                state.page = action.payload.results?.currentPage
                state.totalPages = action.payload.results?.totalPages
                state.totalRecords = action.payload.results?.totalRecords
            }

        },
        [performPantrySearch.pending]: (state, action) => {
            state.isLoading = true
            state.hasError = false
        },
        [performPantrySearch.rejected]: (state, action) => {
            state.isLoading = false
            state.hasError = true
            
        },
        [performPantrySearch.fulfilled]: (state, action) => {
            state.isLoading = false
            state.hasError = false

            /* Store the results */
            // Extract the data from the API results
            if(Array.isArray(action.payload.results)){
                state.results = action.payload.results
            } else {
                state.results = action?.payload?.results?.results
            }

            /* Check if we have some results */
            if(state.results?.length < 1){
                state.page = 1
                state.totalPages = 1
                state.totalRecords = 0
            } else {
                state.page = action.payload.results?.currentPage
                state.totalPages = action.payload.results?.totalPages
                state.totalRecords = action.payload.results?.totalRecords
            }
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
export const selectRecsPerPage = state => state.search.recsPerPage

// Export the actions/reducers
export const { setSearchTerms, 
    setSearchOptions, 
    increasePage,
    decreasePage,
    setRecsPerPage,
    clearSearchResults,
    goToPage
} = searchSlice.actions

// Export the reducer for this slice
export default searchSlice.reducer;