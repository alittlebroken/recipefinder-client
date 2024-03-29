import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import apiProvider from '../../providers/apiProvider'


/* Thunk to load cookbook data from the API */
export const getCookbooks = createAsyncThunk(
    'cookbooks/getCookbooks',
    async (payload, thunkAPI) => {
         
        try{

            /* Extract out the payload params */
            const {
                sort,
                user
            } = payload

            /* Extract out the correct state we need to access */
            const { cookbooks } = thunkAPI.getState()

            /* Setup the params to send to the API */
            const params = {
                auth: {
                    authenticate: true
                },
                sort: {
                    field: sort?.field || 'created_at',
                    order: sort?.order || 'desc'
                },
                pagination: {
                    page: cookbooks?.page || 1,
                    perPage: cookbooks?.recsPerPage || 10
                },
                filter: {
                    //resource: 'Cookbook',
                    userId: user.id
                }
            }

            /* Send the query and return the results */
            return await apiProvider.getList('cookbooks', params)

        } catch(error) {
            throw error
        }

    }
)

/* Thunk to load a cookbooks recipe list */
export const getCookBookRecipeList = createAsyncThunk(
    'cookbooks/getCookbookRecipeList',
    async (payload, thunkAPI) => {

        try{

            /* Destructure payload */
            const { cookbookId, sort } = payload

            /* Extract out the correct state we need to access */
            const { cookbooks } = thunkAPI.getState()

            /* Setup the params form the API */
            const params = {
                auth: { authenticate: true},
                id: cookbookId,
                sort: {
                    field: sort?.field || 'created_at',
                    order: sort?.order || 'desc'
                },
                pagination: {
                    page: cookbooks?.page || 1,
                    perPage: cookbooks?.recsPerPage || 10
                },
            }

            /* Send the query and return the results */
            return await apiProvider.getList('cookbookRecipes', params)

        } catch(e) {
            throw e
        }

    }
)

/* Create the inital structure for the slice and any default values
it needs */
const initialState = {
    cookbooks: [],
    recipes: [],
    hasError: false,
    isLoading: false,
    page: 1,
    pages: 1,
    records: 0,
    recsPerPage: 10
}

/* Create the slice */
const cookbooksSlice = createSlice({
    name: 'cookbooks',
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
        [getCookbooks.pending]: (state, action) => {
            state.isLoading = true
            state.hasError = false
        },
        [getCookbooks.rejected]: (state, action) => {
            state.isLoading = false
            state.hasError = true
        },
        [getCookbooks.fulfilled]: (state, action) => {
            state.isLoading = false
            state.hasError = false

            /* Extract the data returned from the api */
            const results = action.payload?.data?.results
            state.cookbooks = results

            /* Setup the pagination if we have some results */
            if(state.cookbooks?.length >= 1){
                state.pages = results?.totalPages || 1
                state.page = results?.currentPage || 1
                state.records = results?.totalRecords
            }

        },
        [getCookBookRecipeList.pending]: (state, action) => {
            state.isLoading = true
            state.hasError = false
        },
        [getCookBookRecipeList.rejected]: (state, action) => {
            state.isLoading = false
            state.hasError = true

            
        },
        [getCookBookRecipeList.fulfilled]: (state, action) => {
            state.isLoading = false
            state.hasError = false

            /* Assign the results to the correct var in the store */
            const results = action.payload?.data?.results
            state.recipes = results

            /* Set the pagination for the recipes */
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
} = cookbooksSlice.actions

/* export selectors for accessing the data in the slice */
export const selectCookBooks = state => state.cookbooks.cookbooks
export const selectCookbook = state => state.cookbooks.cookbooks
export const selectCookbookRecipes = state => state.cookbooks.recipes
export const selectIsLoading = state => state.cookbooks.isLoading
export const selectHasError = state => state.cookbooks.hasError
export const selectPages = state => state.cookbooks.pages
export const selectPage = state => state.cookbooks.page
export const selectRecsPerPage = state => state.cookbooks.recsPerPage
export const selectRecords = state => state.cookbooks.records
export const selectRecipes = state => state.cookbooks.recipes

/* Export the reducer itself */
export default cookbooksSlice.reducer