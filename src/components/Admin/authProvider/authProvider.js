import axios from 'axios'

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
    checkError: ({status}) => {
        if(status === 401 || status === 403) {
            console.log('authProvider error: ', status)
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkAuth: () => {
        console.log("Checking authentication")
        return localStorage.getItem("token")
            ? Promise.resolve()
            : Promise.reject();
    },
    logout: async () => {
        /* Contact the API to log yourself out */
        console.log('performing logout')
        console.log(localStorage.getItem("token"))

        try {
            if(!localStorage.getItem("token")){
                return Promise.resolve();
            }

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
};

export default authProvider;