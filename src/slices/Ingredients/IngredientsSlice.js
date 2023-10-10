import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import apiProvider from "../../providers/apiProvider"

/* Connect to the API and get a list of all ingredients */
export const getIngredients = createAsyncThunk(
    'ingredients/getIngredients',
    async (payload, thunkAPI) => {

        try{

            /* Extract the filter from the store and gather the required ingredients
             * from the API */
            const { ingredients } = thunkAPI.getState()

            /* Extract the payload vars */
            const {
                terms,
                options,
                pagination,
                sort
            } = payload

            /* The params now need to be constructed and then sent to the API */
            const params = {
                sort: {
                    field: sort?.field || 'created_at',
                    order: sort?.order || 'desc'
                },
                pagination: {
                    page: ingredients?.page || 1,
                    perPage: ingredients?.recsPerPage || 10
                },
                filter: {
                    name: ingredients?.filter || terms
                }
            }

            /* Perform the request */
            return await apiProvider.getList('ingredients', params)

        } catch(error) {
            throw error
        }

    }
)

/* Set the initial state for the imgredients store */
const initialState = {
    filter: '',
    results: [],
    isLoading: false,
    hasError: false,
    page: 1,
    pages: 1,
    records: 0,
    recsPerPage: 10
}

/* Create the store and reducers */
const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: initialState,
    reducers: {
        applyFilter: (state, action) => {
            state.filter = action.payload
        },
        clearFilter: (state, action) => {
            state.filter = ''
        },
        pageUp: (state, action) => {
            if(state.page + 1 > state.pages){
                state.page = state.pages
            } else {
                state.page += 1
            }
        },
        pageDown: (state, action) => {
            if(state.page - 1 < 1){
                state.page = 1
            } else {
                state.page -= 1
            }
        },
        setRecsPerPage: (state, action) => {
            state.recsPerPage = parseInt(action.payload)
        },
        goToPage: (state, action) => {
            state.page = parseInt(action.payload)
        }
    },
    extraReducers: {
        [getIngredients.pending]: (state, action) => {
            state.isLoading = true
            state.hasError = false

        },
        [getIngredients.rejected]: (state, action) => {
            state.isLoading = false
            state.hasError = true
        },
        [getIngredients.fulfilled]: (state, action) => {
            state.isLoading = false
            state.hasError = false

            /* store the data returned from the API call */
            if(action?.payload?.data?.results?.length > 0){
                state.results = action?.payload?.data?.results
            } else {
                state.results = []
            }

            /* Configure the pagination state based on results returned */
            if(state.results?.length > 1){
                /* set the pagination options */
                state.page = action.payload?.data?.currentPage
                state.pages = action.payload?.data?.totalPages
                state.records = action.payload?.data?.totalRecords
            }

        }
    }
})

/* Export the store selectors */
export const selectIngredients = state => state.ingredients.results
export const selectPage = state => state.ingredients.page
export const selectPages = state => state.ingredients.pages
export const selectRecsPerPage = state => state.ingredients.recsPerPage
export const selectRecords = state => state.ingredients.records
export const selectFilter = state => state.ingredients.filter
export const isLoading = state => state.ingredients.isLoading
export const hasError = state => state.ingredients.hasError

/* Export actions for this slices store */
export const {
    applyFilter,
    clearFilter,
    pageUp,
    pageDown,
    setRecsPerPage,
    goToPage
} = ingredientsSlice.actions

/* Export the reducer */
export default ingredientsSlice.reducer