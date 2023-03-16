import axios from 'axios'

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

inMemoryJWT.setRefreshTokenEndpoint(`${BASEURL}/auth/refresh-token`)

const authProvider = {
    // authentication
    login: async ({ username, password }) => {
        /*
            Connect to the API authentication route
        */
        const response = await axios.post(
            `http://localhost:5000/auth/login`,
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
            inMemoryJWT.setToken(response.data.accessToken, 15)
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
            
            if(info === 'No auth token'){
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
        return inMemoryJWT.waitForTokenRefresh().then(() => {
            return inMemoryJWT.getToken() ? Promise.resolve() : Promise.reject();
        });

    },
};

export default authProvider;