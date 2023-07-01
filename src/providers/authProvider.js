import axios from 'axios'
import jwt_decode from 'jwt-decode'

import inMemoryJWT from '../utils/auth.utils';

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
        const response = await axios.post(`${BASEURL}/auth/login`,{ username, password }, unauthedAxiosOptions)

        if(response.status >= 400 ){
            return {
                status: response.data.status,
                success: response.data.success,
                message: response.data.message,
                token: response.data.accessToken
            }
        }

        return {
            status: 200,
            success: true,
            message: 'Login successful',
            token:  response.data.accessToken
        }

    }

}

export default authProvider;