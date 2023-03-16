import axios from 'axios'

const inMemoryJWTManager = () => {
    let inMemoryJWT = null;
    let isRefreshing = null;
    let logoutEventName = 'ra-logout';
    let refreshEndpoint = '/refresh-token';
    let refreshTimeOutId;

    let tokenRefreshDelay = process.env.REACT_APP_TOKEN_REFRESH_DELAY || 15

    const setLogoutEventName = name => logoutEventName = name;
    const setRefreshTokenEndpoint = endpoint => refreshEndpoint = endpoint;

    // This countdown feature is used to renew the JWT before it's no longer valid
    // in a way that is transparent to the user.
    const refreshToken = (delay) => {
        refreshTimeOutId = window.setTimeout(
            getRefreshedToken,
            delay * 1000 - 5000
        ); // Validity period of the token in seconds, minus 5 seconds
    };

    const abordRefreshToken = () => {
        if (refreshTimeOutId) {
            window.clearTimeout(refreshTimeOutId);
        }
    };

    const waitForTokenRefresh = () => {
        if (!isRefreshing) {
            return Promise.resolve(false);
        }
        return isRefreshing.then(() => {
            isRefreshing = null;
            return true;
        });
    }

    // The method make a call to the refresh-token endpoint
    // If there is a valid cookie, the endpoint will set a fresh jwt in memory.
    const getRefreshedToken = async () => {
       
        isRefreshing = await axios.post(
            `http://localhost:5000/auth/refresh-token`,
            { 'action': 'refresh'},
            {
                withCredentials: true
            }
        )

        /* If there was an issue then esentially logout */
        if(isRefreshing.status !== 200){
            ereaseToken()
            return null
        }

        /* All is ok so assign the token */
        setToken(isRefreshing.data.token, tokenRefreshDelay)
        isRefreshing = null
        return isRefreshing

    };

    const getToken = () => inMemoryJWT;

    const setToken = (token, delay) => {
        inMemoryJWT = token;
        refreshToken(delay);
        return true;
    };

    const ereaseToken = () => {
        inMemoryJWT = null;
        abordRefreshToken();
        window.localStorage.setItem(logoutEventName, Date.now());
        return true;
    }

    // This listener will allow to disconnect a session of ra started in another tab
    window.addEventListener('storage', (event) => {
        if (event.key === logoutEventName) {
            inMemoryJWT = null;
        }
    });

    return {
        ereaseToken,
        getRefreshedToken,
        getToken,
        setLogoutEventName,
        setRefreshTokenEndpoint,
        setToken,
        waitForTokenRefresh,
    }
};

export default inMemoryJWTManager();