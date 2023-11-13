import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import apiProvider from '../../providers/apiProvider'

/* Initial state of the slice when added to the store */
const initialState = {
    recipes: [],
    hasError: false,
    isLoading: false,
    page: 1,
    pages: 1,
    records: 0,
    recsPerPage: 10
}

/* The actual slice holding the recucers and state for the store */
const recipesSlice = createSlice({
    name: 'recipes',
    initialState: initialState,
    reducers: {
        upPage: (state, action) => {
            if(state.page + 1 > state.pages){
                state.page = state.pages
            } else {
                state.page += 1
            }
        },
        downPage: (state, action) => {
            if(state.page - 1 < 1){
                state.page = 1
            } else {
                state.page -= 1
            }
        },
        setRecsPerPage: (state, action) => {
            state.recsPerPage = action.payload
        },
        goToPage: (state, action) => {
            state.page = parseInt(action.payload)
        }
    },
    extraReducers: {}
})

/* Export any and all actions from the slice */
export const {
    upPage,
    downPage,
    setRecsPerPage,
    goToPage
} = recipesSlice.actions

/* Export selectors */
export const selectIsLoading = state => state.cookbooks.isLoading
export const selectHasError = state => state.cookbooks.hasError
export const selectPages = state => state.cookbooks.pages
export const selectPage = state => state.cookbooks.page
export const selectRecsPerPage = state => state.cookbooks.recsPerPage
export const selectRecords = state => state.cookbooks.records
export const selectRecipes = state => state.cookbooks.recipes

/* Export the reducer */
export default recipesSlice.reducer