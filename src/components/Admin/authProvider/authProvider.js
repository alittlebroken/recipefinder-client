import axios from 'axios'

/* Set the base URL for the axios requests */
const BASE_URL = process.env.REACT_APP_API_URL

/* Set the options to use for the axios request */
const axiosOptions = {
    withCredentials: true,
    headers: {
        "token": localStorage.getItem("token")
    }
}

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
                withCredentials: true
            }
        )
        
        /* If we get an access token in response then for the moment
           add it to the localstorage */
        if(response.data.accessToken){
            localStorage.setItem("token", response.data.accessToken);
        } else {
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkError: async (error) => {
        let status = error?.response?.status ? error.response.status : null
        let message = error?.response?.data?.message

        if(status === 401 || status === 403) {
            if(message === 'Your access token has expired, please login'){
                                
                /* Generate the url to call */
                const url = `${BASE_URL}/auth/refresh-token`
                
                /* Get a new token */
                const res = await axios.post(url, { "action": "refresh"}, axiosOptions)

                /* check the response and of OK assign the new token */
                if(res.data.status === 200){
                    localStorage.setItem("token", res.data.token)
                    Promise.resolve()
                } else {
                    return Promise.reject();
                }

            } else {
                console.log('authProvider->logout > ', message)
            }
        }
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem("token")
            ? Promise.resolve()
            : Promise.reject();
    },
    logout: async () => {
        console.log('authProvider->logout > called')
        /* Contact the API to log yourself out */

        try {
            if(!localStorage.getItem("token")){
                console.log('authProvider->logout > no token found, returning')
                return Promise.resolve();
            }

            console.log('authProvider->logout > calling lougout endpoint on API')
            const response = await axios.post(
                `http://localhost:5000/auth/logout`, 
                { "action": "logout" }, 
                { 
                    headers: { 
                        'token': `${localStorage.getItem("token")}`,
                        'Content-type': 'application/json'
                    },
                    withCredentials: true
                })

                if(response.data.success === true){
                    console.log('authProvider->logout > logout successfull')
                    localStorage.removeItem("token")
                } else {
                    return Promise.reject()
                }

                return Promise.resolve()
        } catch(e) {
            console.log(e)
            return Promise.reject()
        }
    },
    getIdentity: () => Promise.resolve(/* ... */),
    handleCallback: () => Promise.resolve(/* ... */), // for third-party authentication only
    // authorization
    getPermissions: () => Promise.resolve(/* ... */),
    refreshToken: async () => {
        console.log('authProvider->refreshToken > called')
        /* Contact the API to log yourself out */

        try {
            
            console.log('authProvider->logout > calling refreshToken endpoint on API')
            const response = await axios.post(
                `http://localhost:5000/auth/refresh-token`, 
                { "action": "refresh-token" }, 
                { 
                    headers: { 
                        'token': `${localStorage.getItem("token")}`,
                        'Content-type': 'application/json'
                    },
                    withCredentials: true
                })

                console.log('authProvider->refreshToken: ', response)

                return Promise.resolve()
        } catch(e) {
            console.log(e)
            return Promise.reject()
        }
    },
};

export default authProvider;