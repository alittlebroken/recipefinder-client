import axios from 'axios'
import jwt_decode from 'jwt-decode'

import inMemoryJWT from '../../../utils/auth.utils';

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

const refreshRate = process.env.REACT_APP_TOKEN_REFRESH_RATE || 300

inMemoryJWT.setRefreshTokenEndpoint(`${BASEURL}/auth/refresh-token`)

const authProvider = {
    // authentication
    login: async ({ username, password }) => {
        /*
            Connect to the API authentication route
        */
        const response = await axios.post(
            `${BASEURL}/auth/login`,
            {
                username,
                password
            },
            {
                withCredentials: true,
                headers: {
                    'Content-type': 'application/json'
                }
            }
        )

        /* If we get an access token in response then for the moment
           add it to the localstorage */
        if(response.data.accessToken){
            inMemoryJWT.setToken(response.data.accessToken, refreshRate)
        } else {
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkError: async (error) => {
        let status = error?.response?.status ? error.response.status : null
        let message = error?.response?.data?.message
        let info = error?.response?.data?.info

        if(status === 401 || status === 403) {
            
            if(info === 'No auth token' || info === 'jwt expired'){
                return inMemoryJWT.waitForTokenRefresh().then(() => {
                    return inMemoryJWT.getToken() ? Promise.resolve() : Promise.reject();
                });
            } else {
                return Promise.reject();
            }
            
        }
        return Promise.resolve();
    },
    checkAuth: () => {
        return inMemoryJWT.waitForTokenRefresh().then(() => {
            return inMemoryJWT.getToken() ? Promise.resolve() : Promise.reject();
        });
    },
    logout: async () => {
        
        /* Contact the API to log yourself out */

        try {
            if(!inMemoryJWT.getToken()){
                return Promise.resolve();
            }

            const response = await axios.post(
                `http://localhost:5000/auth/logout`, 
                { "action": "logout" }, 
                axiosOptions)

                if(response.data.success === true){
                    inMemoryJWT.ereaseToken()
                } else {
        
                    return Promise.reject()
                }
                return Promise.resolve()
        } catch(e) {
            return Promise.reject()
        }
    },
    getIdentity: () => Promise.resolve(/* ... */),
    handleCallback: () => Promise.resolve(/* ... */), // for third-party authentication only
    // authorization
    getPermissions: async () => {
        
        /* Get the user details from the token */
        const decodedToken = jwt_decode(inMemoryJWT.getToken())

        /* Check to ensure that the only role to access the 
         * admin interface is the admin role */
        if(decodedToken.roles !== 'admin'){
            /* log out as soon as possible */
            return Promise.reject('Only administrators can access this site')
        }

        return inMemoryJWT.waitForTokenRefresh().then(() => {
            return inMemoryJWT.getToken() ? Promise.resolve() : Promise.reject();
        });

    },
};

export default authProvider;