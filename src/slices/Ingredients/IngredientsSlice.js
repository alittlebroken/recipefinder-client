import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import apiProvider from "../../providers/apiProvider"

/* Connect to the API and get a list of all ingredients */
const getIngredients = createAsyncThunk(
    'ingredients/getIngredients',
    async (payload, thunkAPI) => {

        try{

            thunkAPI.getState()

        } catch(error) {
            throw error
        }

    }
)

/* Set the initial state for the imgredients store */
const initialState = {
    filter: '',
    ingredients: [],
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
            state.ingredients = action?.payload?.results

            /* Configure the pagination state based on results returned */
            if(state.ingredients?.length > 1){
                /* set the pagination options */
                state.page = action.payload.results.currentPage
                state.pages = action.payload.results.totalPages
                state.records = action.payload.results.totalRecords
            }

        }
    }
})

/* Export the store selectors */
export const selectIngredients = state => state.ingredients.ingredients
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