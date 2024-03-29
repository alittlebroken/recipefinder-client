import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import authProvider from "../../providers/authProvider"

/* Set up thunks for gathering data from the API */

export const getUserProfile = createAsyncThunk(
    'profile/getUserProfile',
    async (payload, thunkAPI) => {

        try{

            return await authProvider.getProfile(payload.id)

        } catch(error) {
            throw error
        }

    }
)

/* Set the initial state for the profile */
const initialState = {
    data: {
        userId: null,
        username: null,
        email: null,
        forename: null,
        surname: null,
        roles: null,
        avatar_src: null,
        avatar_alt: null,
        avatar_title: null,
        pantryId: null
    },
    isLoading: false,
    hasError: false
}

/* Profile slice creation */
export const profileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {},
    extraReducers:{
        [getUserProfile.pending]: (state, action) => {
            state.isLoading = true
            state.hasError = false

        },
        [getUserProfile.rejected]: (state, action) => {
            state.isLoading = false
            state.hasError = true

            
        },
        [getUserProfile.fulfilled]: (state, action) => {
            state.isLoading = false
            state.hasError = false

            /* Parse and assign the data returned from the API */
            let profile = action.payload.data
            
            state.data.userId = profile?.id
            state.data.forename = profile?.forename
            state.data.surname = profile?.surname
            state.data.email = profile?.email
            state.data.roles = profile?.roles
            state.data.username = profile?.username
            state.data.avatar_src = profile?.avatar_src ? profile.avatar_src : '/default_profile_pic.jpg'
            state.data.avatar_alt = profile?.avatar_alt ? profile.avatar_alt : 'Default profile picture'
            state.data.avatar_title = profile?.avatar_title ? profile.avatar_title : 'Default profile picture'
            state.data.pantryId = profile?.pantryId
        }
    }
})

/* Export selectors for retrieving the data */
export const selectProfileData = state => state.profile.data
export const selectLoading = state => state.profile.isLoading
export const selectHasError = state => state.profile.hasError

/* export the default reducer for this slice to be used in the store */
export default profileSlice.reducer