/* eslint-disable no-throw-literal */
// Required packages
import { axios } from 'axios'
import { useReferenceManyFieldController } from 'react-admin'
import JWTMemoryManager from '../../utils/auth.utils'

/*
    Authenticates the user against the API

    The API should return a JWT token on success
    otherwise it will return an error

    The token is stored in memory
*/

export const API = process.env.REACT_API_URL

export const authenticate = async payload => {
    
    try{

        /* Validate any passed in parameters */
        const { username, password } = payload

        if(!username || username === undefined){
            throw {
                success: false,
                message: 'The username is missing from the request payload'
            }
        }

        if(typeof username !== 'string'){
            throw {
                success: false,
                message: 'The username for the request payload is in the wrong format'
            }
        }

        if(!password || password === undefined){
            throw {
                success: false,
                message: 'The password is missing from the request payload'
            }
        }

        if(typeof password !== 'string'){
            throw {
                success: false,
                message: 'The password for the request payload is in the wrong format'
            }
        }

        /* Now send the request to the API */
        const URI = `${API}/auth/login`
        const data = {
            username,
            password
        }

        const headers = {
            'Content-type': 'application/json'
        }

        const response = await axios.post(URI, data, { headers })

        /* Check for any returned errors from the API */
        if(response.status === false){
            throw {
                status: response.status,
                success: response.success,
                message: response.message
            }
        }

        /* Lets store the tokens, refreshToken in localStorasge and access Token in memory */
        

    } catch(e) {
        return {
            status: e.status || '',
            success: e.success || false,
            message: e.message || 'There was a problme with the resource, please try again later'
        }
    }

}