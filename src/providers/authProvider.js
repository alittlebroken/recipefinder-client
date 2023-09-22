import axios from 'axios'
import jwt_decode from 'jwt-decode'

import inMemoryJWT from '../utils/auth.utils';

import { isType, isSet } from '../utils/validation'

/* Set the base URL for the axios requests */
const BASEURL = process.env.REACT_APP_API_URL

/* Set the options to use for the axios request */
const axiosOptions = {
    withCredentials: true,
    headers: {
        'token': inMemoryJWT.getToken(),
        'Content-type': 'application/json'
    }
}

const unauthedAxiosOptions = {
    headers: {
        'Content-type': 'application/json'
    }
}

/* Set the refresh rate for refresh tokens */
const refreshRate = process.env.REACT_APP_TOKEN_REFRESH_RATE || 300

/* set the endpoint for getting refresh tokens */
inMemoryJWT.setRefreshTokenEndpoint(`${BASEURL}/auth/refresh-token`)

/* Wrapper for the methods */
const authProvider = {

    login: async (username, password) => {

        /* Verify the passed in arguments */
        if(!username || username === undefined){
            return {
                status: 400,
                success: false,
                message: 'Undefined username'
            }
        }

        if(typeof username !== 'string'){
            return {
                status: 400,
                success: false,
                message: 'Wrong format for username'
            }
        }

        if(!password || password === undefined){
            return {
                status: 400,
                success: false,
                message: 'Undefined password'
            }
        }

        if(typeof password !== 'string'){
            return {
                status: 400, 
                success: false,
                message: 'Wrong format for password'
            }
        }

        /* Make the request */
        const response = await axios.post(
            `${BASEURL}/auth/login`,
            { username, password }, 
            axiosOptions)

        if(response.status >= 400 ){
            return {
                status: response.data.status,
                success: response.data.success,
                message: response.data.message,
                token: response.data.accessToken
            }
        }

        if(response.status >= 200 && response.status < 300){
            /* Successful login */
            if(response.data.accessToken){
               inMemoryJWT.setToken(response.data.accessToken, refreshRate)
               return response.data.accessToken
            } else {
                return false
            }
        }

    },

    logout: async () => {

        try {

            // If we do not have any tokens currently ( meaining we are not logged in ), just return
            if(!inMemoryJWT.getToken()){
                return {
                    status: 200,
                    success: true,
                    message: 'Successfully logged out'
                }
            }

            // Set the options for axios
            const axiosOptions = {
                withCredentials: true,
                headers: {
                    'token': inMemoryJWT.getToken(),
                    'Content-type': 'application/json'
                }
            }

            // Perform the logout
            const response = await axios.post(
                `${BASEURL}/auth/logout`,
                { action: 'logout'},
                axiosOptions
            )

     

            // Check the response back
            if(response.data.success === true){

                // Erase the inMemory token
                inMemoryJWT.ereaseToken()

                return {
                    status: 200,
                    success: true,
                    message: 'Successfully logged out'
                }
            } else {

         

                return {
                    status: response.data.status,
                    success: response.data.success,
                    message: response.data.message
                }

            }




        } catch(e) {

            return {
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later'
            }

        }

    },

    register: async (payload) => {

        // Perform validation of the passed in parameters
        if(!isSet(payload.username)) { return { status: 400, success: false, message: 'Undefined username' } }
        if(!isType(payload.username, 'string')) { return { status: 400, success: false, message: 'Wrong format for username'} }

        if(!isSet(payload.email)) { return { status: 400, success: false, message: 'Undefined email' }}
        if(!isType(payload.email, 'string')) { return { status: 400, success: false, message: 'Wrong format for email' }}

        if(!isSet(payload.password)) { return { status: 400, success: false, message: 'Undefined password' } }
        if(!isType(payload.password, 'string')) { return { status: 400, success: false, message: 'Wrong format for password' } }

        if(!isSet(payload.forename)) { return { status: 400, success: false, message: 'Undefined forename' } }
        if(!isType(payload.forename, 'string')) { return { status: 400, success: false, message: 'Wrong format for forename' } }

        if(!isSet(payload.surname)) { return { status: 400, success: false, message: 'Undefined surname' } }
        if(!isType(payload.surname, 'string')) { return { status: 400, success: false, message: 'Wrong format for surname' } }

        try {

            // Register the user
            const response = await axios.post(`${BASEURL}/auth/register`, payload, unauthedAxiosOptions)

            // Check for any errors
            if(response.status >= 400){
                return {
                    status: response.data.status,
                    success: response.data.success,
                    message: response.data.message,
                    user: response.data.user,
                    roles: response.data.roles
                }
            }

            // All is OK, return the registration details
            return {
                status: response.data.status,
                success: response.data.success,
                message: response.data.message,
                user: response.data.user,
                roles: response.data.roles
            }

        } catch(e) {

            return {
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later',
                user: null
            }

        }

    },

    loggedIn: () => {

        /* We can say if we have an access token then we have
           logged in OK */
        const token  = jwt_decode(inMemoryJWT.getToken())
        console.log(token)
        if(!token){
            return false
        } else {
            return true
        }

    },

    hasPermission: (payload) => {

        /* Only allow access if the user has the same 
           level of permissions as the payload */
        const token  = jwt_decode(inMemoryJWT.getToken())
        console.log(token)
        if(token.roles !== payload){
            return false
        } else {
            return true
        }

    },

    getProfile: async (id) => {
      
        try {

            /* Determine if the passed in user is logged in first */
            if(!inMemoryJWT.getToken()){
                return {
                    status: 400,
                    success: false,
                    message: 'You must be logged in to access this resource'
                }
            }

            /* Get the profile data */
            const response = await axios.get(
                `${BASEURL}/auth/profile`,
                axiosOptions
            )

            /* Check all went OK */
            if(response.status >=200 && response.status < 300){
                return {
                    success: response.data.success,
                    status: response.status,
                    data: response.data
                }
            } else {
                return {
                    status: 400,
                    success: false,
                    data: {},
                    message: 'There was a problem retrieving your profile, please try again later'
                }
            }
    
        
        } catch(e) {

            return {
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later'
            }

        }

    }

}

export default authProvider;