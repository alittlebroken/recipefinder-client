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

/* Thunk to load the data from the API */
export const fetchRecipes = createAsyncThunk(
    'recipes/fetchRecipes',
    async (payload, thunkAPI) => {

        try{

            /* Extract the payload vars */
            const { userId, sort } = payload

            /* Extract the state */
            const { recipes } = thunkAPI.getState()

            /* Build the params to send to the API method */
            const params = {
                sort: {
                    field: sort?.field || 'created_at',
                    order: sort?.order || 'desc'
                },
                pagination: {
                    page: recipes?.page || 1,
                    perPage: recipes?.recsPerPage || 10
                },
                filter: {
                    userId: userId
                }
            }

            await apiProvider.getList('recipes', params)

        } catch(e) {
            throw e
        }

    }
)

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
    extraReducers: {
        [fetchRecipes.pending]: (state, action) => {
            state.hasError = false
            state.isLoading = true
        },
        [fetchRecipes.rejected]: (state, action) => {
            state.hasError = true
            state.isLoading = false
        },
        [fetchRecipes.fulfilled]: (state, action) => {
            state.hasError = false
            state.isLoading = false

            /* Store the records from the API call */
            const results = action.payload?.data?.results
            state.recipes = results

            /* Setup the pagination if we have some results */
            if(state.cookbooks?.length >= 1){
                state.pages = results?.totalPages || 1
                state.page = results?.currentPage || 1
                state.records = results?.totalRecords
            }
        }
    }
})

/* Export any and all actions from the slice */
export const {
    upPage,
    downPage,
    setRecsPerPage,
    goToPage
} = recipesSlice.actions

/* Export selectors */
export const selectIsLoading = state => state.recipes.isLoading
export const selectHasError = state => state.recipes.hasError
export const selectPages = state => state.recipes.pages
export const selectPage = state => state.recipes.page
export const selectRecsPerPage = state => state.recipes.recsPerPage
export const selectRecords = state => state.recipes.records
export const selectRecipes = state => state.recipes.recipes

/* Export the reducer */
export default recipesSlice.reducer