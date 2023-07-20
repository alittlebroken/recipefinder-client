import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { dataProvider } from '../../providers/dataProvider';

// Thunks for gathering the API data

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

    },
})

// Export selectors

// Export actions

// Export the reducer for the slice
export default landingpageSlice.reducer;