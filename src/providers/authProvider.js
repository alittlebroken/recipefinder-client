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

/* Set the refresh rate for refresh tokens */
const refreshRate = process.env.REACT_APP_TOKEN_REFRESH_RATE || 300

/* set the endpoint for getting refresh tokens */
inMemoryJWT.setRefreshTokenEndpoint(`${BASEURL}/auth/refresh-token`)

/* Wrapper for the methods */
const authProvider = {

}

export default authProvider;