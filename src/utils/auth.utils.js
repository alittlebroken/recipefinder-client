/*
    Function to handle a JWT token in memory rather than 
    storing in localStorage or a cookie.

    Uses javascript closure so the token is never exposed
    directly and must be handled by the anonymous function
    we export
*/
const JWTMemoryManager = () => {

    /* token is stored here, only the functions within have 
       have access to it
    */
    let token = null;

    /* Set the token */
    const set = newToken => {
        token = newToken;
        return true;
    }

    /* Get the token */
    const get = () => {
        return token
    }

    const remove = () => {
        token = null;
        return true;
    }

    return {
        set,
        get,
        remove
    }

}

export default JWTMemoryManager