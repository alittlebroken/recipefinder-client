import axios from 'axios'
import queryString from 'query-string'
import { HttpError } from 'react-admin'

import inMemoryJWT from '../utils/auth.utils';

// Wrapper for API methods
const apiProvider = {

    getOne: async (resource, params) => {

        // Extract the params out

            console.log(params)

            // Veify the passed in params
            if(!params || params === undefined){
                return {
                    status: 400,
                    success: false,
                    message: 'Undefined request parameter'
                }
            }

            if(!params.id || params.id === undefined){
                return {
                    status: 400,
                    success: false,
                    message: 'Undefined id'
                } 
            }

            // resource id
            const id = params.id || null

            // Pagination
            const { page } = params.pagination || 1
            const { perPage } = params.pagination || 10

            // Sorting
            const { field } = params.sort || 'id'
            const { order } = params.sort || 'desc' 

            // Authentication
            const { authenticate } = params.auth || false
            const { roles } = params.auth || 'user'

        // Set up the query params

            let queryParams = {
                page: page ? page : 1,
                limit: perPage ? perPage : 10,
                sort_by: field ? field : 'id',
                sort_direction: order ? order : 'desc',
                filter: JSON.stringify(params.filter)
            }

        // Generate the header and any options to send along with the request

            // Generate the initial header for the request
            let headers = { 'Content-type': 'application/json' }

            // Add any further headers as needed
            if(authenticate === true && authenticate !== undefined){
                headers.token = inMemoryJWT.getToken()
            }

            // Generate the initial options
            let axiosOptions = { headers: headers }

            // Add on any further options
            if(authenticate === true && authenticate !== undefined){
                axiosOptions.withCredentials = true
            }

        // Set the URL to use
        let url = `${process.env.REACT_APP_API_URL}/${resource}/${id}`

        // Access the appropriate API and process the results
        const response = await axios.get(url, axiosOptions)

        // Check the status codes returned
        if(response.status >= 400){
            return { 
                status: response.status,
                data: 
                {
                    status: response.status,
                    success: response.data.success,
                    message:  response.data.message
                }
            }
        }

        return {
            status: response.status,
            data: response.data
        }

    },

}

export default apiProvider;