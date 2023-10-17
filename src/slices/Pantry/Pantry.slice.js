import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import apiProvider from '../../providers/apiProvider'

/* async thunks for conencting to and working with APIs */

/* Gathers a list of ingredient's that the user currently 
 * has in their pantry
*/
export const getPantryIngredients = createAsyncThunk(
    'pantry/getPantryIngredients',
    async (payload, thunkAPI) => {

        try{

            /* Extract the state for the pantry */
            const { pantry } = thunkAPI.getState()

            /* Extract the payload vars */
            const {
                pantryId,
                sort
            } = payload

            /* The params now need to be constructed and then sent to the API */
            const params = {
                auth: {
                    authenticate: true
                },
                sort: {
                    field: sort?.field || 'created_at',
                    order: sort?.order || 'desc'
                },
                id: pantryId
            }


            const results = await apiProvider.getList('pantries', params)
            return results

        } catch(error) {
            throw error
        }

    }
)

/* Set the initial state the slice should have */
const initialState = {
    ingredients: [],
    isLoading: false,
    hasError: false,
    page: 1,
    pages: 1,
    records: 0,
    recsPerPage: 10
}

/* Create the slice */
const pantrySlice = createSlice({
    name: 'pantry',
    initialState: initialState,
    filter: '',
    reducers: {
        pageUp: (state, action) => {
            if(state.page + 1 > state.pages){
                state.page = state.pages
            } else {
                state.page += 1
            }
        },
        pageDown: (state, action) => {
            if(state.page - 1 < 0){
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
        },
        setFilter: (state, action) => {
            state.filter = action.payload
        }
    },
    extraReducers: {
        [getPantryIngredients.pending]: (state, action) => {
            state.hasError = false
            state.isLoading = true
        },
        [getPantryIngredients.rejected]: (state, action) => {
            state.hasError = true
            state.isLoading = false
            console.log(action)
        },
        [getPantryIngredients.fulfilled]: (state, action) => {
            state.hasError = false
            state.isLoading = false

            const results = action.payload?.data?.results[0]?.ingredients
            state.ingredients = results
        }
    }
})

/* Export out the selectors for the slice */
export const selectPantryIngredients = state => state.pantry.ingredients
export const selectError = state => state.pantry.hasError
export const selectLoading = state => state.pantry.isLoading

export const selectPage = state => state.pantry.page
export const selectPages = state => state.pantry.pages
export const selectRecsPerPage = state => state.pantry.recsPerPage
export const selectRecords = state => state.pantry.records

export const selectFiltered = state => {
    if(!state.filter || state.filter === undefined || state.filter === ''){
        return state.ingredients
    } else {
        return state.ingredients.map(item => item.name.includes(state.filter) )
    }
    
}

/* Export out our actions for the slice */
export const {
    pageUp, 
    pageDown,
    setRecsPerPage,
    goToPage,
    setFilter
} = pantrySlice.actions

/* Export out the reducer */
export default pantrySlice.reducer