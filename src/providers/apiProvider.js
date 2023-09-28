import axios from 'axios'
import queryString from 'query-string'
import inMemoryJWT from '../utils/auth.utils';

// Wrapper for API methods
const apiProvider = {

    getOne: async (resource, params) => {

        // Extract the params out

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

    getList: async (resource, params) => {

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
        let url = `${process.env.REACT_APP_API_URL}/${resource}?${queryString.stringify(queryParams)}`

        // Access the appropriate API and process the results
        const response = await axios.get(url, axiosOptions)

        // Process the response
        if(response.status >= 400){
            return {
                status: response.status,
                success: response.data.success,
                message: response.data.message
            }
        }

        return {
            status: response.status,
            data: response.data
        }

    },

    removeOne: async (resource, params) => {

        // Validation
        if(!params || params === undefined){
            return {
                status: 400,
                success: false,
                message: 'Undefined request parameters'
            }
        }

        if(!params.id || params.id === undefined){
            return {
                status: 400,
                success: false,
                message: 'Undefined id'
            }
        }

        // Authentication
        const { authenticate } = params.auth || false
        const { roles } = params.auth || 'user'

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
        let url = `${process.env.REACT_APP_API_URL}/${resource}/${params.id}`

        // Access the appropriate API and process the results
        const response = await axios.delete(url, axiosOptions)

        if(response.status >= 400){
            return {
                status: response.status,
                success: response.data.success,
                message: response.data.message
            }
        }

        return {
            status: response.status,
            success: response.data.success,
            message: response.data.message
        }

    },

    removeAll: async (resource, params) => {

        // Authentication
        const { authenticate } = params.auth || false
        const { roles } = params.auth || 'user'

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
        let url = `${process.env.REACT_APP_API_URL}/${resource}`

        // Access the appropriate API and process the results
        const response = await axios.delete(url, axiosOptions)

        if(response.status >= 400){

            // Check if the return data is just a count of zero
            if(response.data.count === 0){
                return {
                    status: 404,
                    success: false,
                    message: 'There are no records to delete'
                }
            }

            return {
                status: response.status,
                success: response.data.success,
                message: response.data.message
            }
        }

        return {
            status: response.status,
            success: response.data.success,
            message: response.data.message
        }

    },

    create: async(resource, params) => {

        // Extract the params out

            // Veify the passed in params
            if(!params || params === undefined){
                return {
                    status: 400,
                    success: false,
                    message: 'Undefined request parameter'
                }
            }

            if(!params.payload || params.payload === undefined){
                return {
                    status: 400,
                    success: false,
                    message: 'Undefined payload'
                } 
            }

            // Payload
            const { payload } = params 

            // Authentication
            const { authenticate } = params.auth || false
            const { roles } = params.auth || 'user'

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
        let url = `${process.env.REACT_APP_API_URL}/${resource}`

        // Access the appropriate API and process the results
        const response = await axios.post(url, payload, axiosOptions)

        // Check the status codes returned
        if(response.status >= 400){
            return response.data
        }

        return response.data

    },

    update: async (resource, params) => {

        /* return result for the method */
        let returnResult

            // Veify the passed in params
            if(!params || params === undefined){
                return {
                    status: 400,
                    success: false,
                    message: 'Undefined request parameter'
                }
            }

            if(!params.payload || params.payload === undefined){
                return {
                    status: 400,
                    success: false,
                    message: 'Undefined payload'
                } 
            }

            // Payload
            const { payload } = params 

            // Authentication
            const { authenticate } = params.auth || false
            const { roles } = params.auth || 'user'

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

            /* Url to send the request to */
            let url

            /* Request Body */
            let reqBody

            /* Generate the url and payload based on the resource */
            if(resource === 'users'){

                url = `${process.env.REACT_APP_API_URL}/${resource}/${params.id}`
                
                reqBody = {
                    username: payload.username,
                    forename: payload.forename,
                    surname: payload.surname,
                    email: payload.email,
                    roles: payload.roles
                }

                /* Send the request */
                const res = await axios.put(
                    url,
                    reqBody,
                    axiosOptions
                )
                console.log(res)
                /* If the response is OK then update the picture, if any */
                if(res.status === 204 && payload.upload !== ''){

                    /* Generate the payload to send */
                    const formData = new FormData()
                    formData.append(
                        'images',
                        payload.upload,
                        payload.upload.name
                    )
                    formData.append('userid',payload.id)
                    formData.append('resourceid', payload.id)
                    formData.append('resource', 'users')
                    formData.append('title', payload.title)

                    /* url to upload to */
                    url = `${process.env.REACT_APP_API_URL}/uploads/${payload.imageId}`

                    /* Update the Image */
                    const imageRes = await axios.put(
                        url,
                        formData,
                        axiosOptions
                    )

                    /* ensure all is ok */
                    if(imageRes.status === 204){
                        returnResult = {
                            status: 204,
                            success: true,
                            message: 'Profile updated successfully'
                        }
                    } else {
                        returnResult =  {
                            status: 204,
                            success: true,
                            message: 'Unable to update profile, please try again later'
                        }
                    }

                } else if(res.status === 204) {
                  
                    returnResult = {
                        status: 204,
                        success: true,
                        message: 'Profile updated successfully'
                    }

                }
                return returnResult

            } else {
                /* generic catch all url, should be good for most resources */
                url = `${process.env.REACT_APP_API_URL}/${resource}/${params.id}`

            }

            

        // Access the appropriate API and process the results
        const response = await axios.put(url, payload, axiosOptions)

        // Check the status codes returned
        if(response.status >= 400){
            
            return response.data
        }

        return response.data

    },

    search: async (params) => {

        try{

            // Verify the passed in params we need
            if(!params || params === undefined){
                return {
                    status: 400,
                    success: false,
                    message: 'Undefined request parameter'
                }
            }

            if(!params.payload || params.payload === undefined){
                return {
                    status: 400,
                    success: false,
                    message: 'Undefined payload'
                } 
            }

            const { payload } = params

            // Authentication
            const { authenticate } = params.auth || false
            const { roles } = params.auth || 'user'

            // Pagination
            const { page } = params.pagination || 1
            const { perPage } = params.pagination || 10

            // Sorting
            const { field } = params.sort || 'id'
            const { order } = params.sort || 'desc' 

            // Set up the query params
            let queryParams = {
                page: page ? page : 1,
                limit: perPage ? perPage : 10,
                sort_by: field ? field : 'id',
                sort_direction: order ? order : 'desc',
                filter: JSON.stringify(params.filter)
            }

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
            let url = `${process.env.REACT_APP_API_URL}/search?${queryString.stringify(queryParams)}`

            // Access the appropriate API and process the results
            const response = await axios.post(url, payload, axiosOptions)

            // Check the status codes returned
            if(response.status >= 400){
                return response.data
            }

            return response.data

        } catch(e) {
            throw e
        }

    }

}

export default apiProvider;