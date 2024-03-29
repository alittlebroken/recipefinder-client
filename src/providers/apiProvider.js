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
            const { page } = params?.pagination || 1
            const { perPage } = params?.pagination || {}
            const { overrideLimit } = params?.pagination || false

            // Sorting
            const { field } = params?.sort || 'id'
            const { order } = params?.sort || 'desc' 

            // Authentication
            const { authenticate } = params?.auth || false
            const { roles } = params?.auth || 'user'

        // Set up the query params

            let queryParams = {
                page: page ? page : 1,
                sort_by: field ? field : 'id',
                sort_direction: order ? order : 'desc',
                filter: JSON.stringify(params.filter)
            }

            if(overrideLimit){
                queryParams.limit = null
            } else {
                queryParams.limit = perPage ? perPage : null
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

            axiosOptions.validateStatus = status => { return true}

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
        const { page } = params?.pagination || 1
        const { perPage } = params?.pagination || 5
        const { overrideLimit } = params?.pagination || false

        // Sorting
        const { field } = params?.sort || 'id'
        const { order } = params?.sort || 'desc' 

        // Authentication
        const { authenticate } = params?.auth || false
        const { roles } = params?.auth || 'user'

        // Set up the query params
        let queryParams = {
            page: page ? page : 1,
            sort_by: field ? field : 'id',
            sort_direction: order ? order : 'desc',
            filter: JSON.stringify(params.filter)
        }

        if(overrideLimit){
            queryParams.limit = null
        } else {
            queryParams.limit = perPage ? perPage : null
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

        axiosOptions.validateStatus = status => { return true}

        // Set the URL to use

        /* Determine which resource to access */
        let url
        let response
        if(resource === 'pantries' || resource === 'pantry'){
            /* Get the passed in id */
            url = `${process.env.REACT_APP_API_URL}/pantries/${params.id}?${queryString.stringify(queryParams)}`
            response = await axios.get(url, axiosOptions)
        } else if (resource === 'cookbookRecipes'){

            /* URL to get the recipes for a cookbook */
            url = `${process.env.REACT_APP_API_URL}/cookbooks/${params.id}/recipes?${queryString.stringify(queryParams)}`
            response = await axios.get(url, axiosOptions)

        } else if (resource === 'recipes') {
            
            url = `${process.env.REACT_APP_API_URL}/recipes?${queryString.stringify(queryParams)}`
            response = await axios.get(url, axiosOptions)
        } else {
            url = `${process.env.REACT_APP_API_URL}/${resource}?${queryString.stringify(queryParams)}`
            response = await axios.get(url, axiosOptions)
        }
         
        // Process the response
        if(response.status >= 400){
            return {
                status: response.status,
                success: response.data.success,
                message: response.data.message,
                data: []
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

        // Pagination
        const { page } = params.pagination || 1
        const { perPage } = params.pagination || 10

        // Sorting
        const { field } = params.sort || 'id'
        const { order } = params.sort || 'desc' 

        // Authentication
        const { authenticate } = params.auth || false
        const { roles } = params.auth || 'user'

        // Filter
        const cookbookId = params?.filter?.cookbookId || undefined
        const recipeId = params?.filter?.recipeId || undefined

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

        axiosOptions.validateStatus = status => { return true}

        // Set the URL to use
        let url
        if(resource === 'pantries' || resource === 'pantry'){
            url = `${process.env.REACT_APP_API_URL}/${resource}/${params.id}/${params.ingredientId}`
            
        } else if (resource === "cookbookRecipes") {
            url = `${process.env.REACT_APP_API_URL}/cookbooks/${params.id}/recipe/${recipeId}`
        } else {
            url = `${process.env.REACT_APP_API_URL}/${resource}/${params.id}`
            
        }
        
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

        axiosOptions.validateStatus = status => { return true}

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

            axiosOptions.validateStatus = status => { return true}

        // Set the URL to use

        // Determine the type of resource we are accessing
        let url
        if(resource === 'pantry' || resource === 'pantries'){
            url = `${process.env.REACT_APP_API_URL}/${resource}/${params?.payload?.pantryId}`
        } else if (resource === 'cookbookRecipes'){

            /* URL to get the recipes for a cookbook */
            url = `${process.env.REACT_APP_API_URL}/cookbooks/${params.id}/recipe`

        } else {
            url = `${process.env.REACT_APP_API_URL}/${resource}`
        }
        
        /* Check what the resource type is and use the appropriate 
           axios post. For uploads we need to create a form Data field
           and send that as the payload */
        let response

        if(resource === "uploads"){

            /* Generate the payload to send */
            const formData = new FormData()
            
            formData.append(
                'images',
                payload?.images,
                payload?.images?.name
            )
            formData.append('userid',payload.userId)
            formData.append('resourceid', payload.resourceid)
            formData.append('resource', payload.resource)
            formData.append('title', payload.title)

            /* set the correct mimetype for the form */
            axiosOptions.headers['Content-type'] = "multipart/form-data"

            /* Update the Image */
            response = await axios.post(
                url,
                formData,
                axiosOptions
            )
            
        } else {
            // Access the appropriate API and process the results
            response = await axios.post(url, payload, axiosOptions)
            
        }

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
            let { payload } = params 

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

            axiosOptions.validateStatus = status => { return true}

            /* Url to send the request to */
            let url

            /* Request Body */
            let reqBody

            /* var for holding form data if we have to upload images */
            let formData

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

                /* If the response is OK then update the picture, if any */
                if((res.status >= 200 && res.status < 300 ) && payload.upload !== ''){

                    /* Check for any existing images Owned by the user */
                    const picCheck = await apiProvider.getList('uploads', {
                        auth: {
                            authenticate: true
                        },
                        pagination: {
                            perPage: 10
                        },
                        filter: {
                          resource: 'users',
                          resourceid: params.id
                        }
                    })
                    
                    if(picCheck.status === 204){
                        
                        /* Params for POST API request */
                        const postParams = {
                            auth: {
                                authenticate: true
                            }
                        }

                        /* From data to send the image(s) and related data */
                        const formData = new FormData()
                        formData.append(
                            'images',
                            payload.upload,
                            payload.upload.name
                        )

                        formData.append('userid',params.id)
                        formData.append('resourceid', params.id)
                        formData.append('resource', 'users')
                        formData.append('title', payload.title)

                        /* url to upload to */
                        url = `${process.env.REACT_APP_API_URL}/uploads`

                        /* set the correct mimetype for the form */
                        axiosOptions.headers['Content-type'] = "multipart/form-data"

                        /* Update the Image */
                        const postRes = await axios.post(
                            url,
                            formData,
                            axiosOptions
                        )


                        /* ensure all is ok */
                        if(postRes.status >= 200 && postRes.status < 300){
                            returnResult = {
                                status: postRes.status,
                                success: true,
                                message: 'Profile updated successfully'
                            }  
                        } else {
                            returnResult =  {
                                status: postRes.status,
                                success: false,
                                message: 'Unable to update profile, please try again later'
                            }
                        }

                    } else {

                        /* Generate the payload to send */
                        const formData = new FormData()
                        formData.append(
                            'images',
                            payload.upload,
                            payload.upload.name
                        )
                        formData.append('userid',params.id)
                        formData.append('resourceid', params.id)
                        formData.append('resource', 'users')
                        formData.append('title', payload.title)
                        
                        /* url to upload to */
                        url = `${process.env.REACT_APP_API_URL}/uploads/${picCheck?.data?.results[0]?.id}`

                        /* set the correct mimetype for the form */
                        axiosOptions.headers['Content-type'] = "multipart/form-data"
                            
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

                    }

                } else if(res.status === 204) {
                  
                    returnResult = {
                        status: 204,
                        success: true,
                        message: 'Profile updated successfully'
                    }

                }
                return returnResult

            } else if(resource === 'uploads') {

                    /* Get the existing image details if any */
                    const response = await apiProvider.getList('uploads', {
                        auth: {
                            authenticate: true,
                        },
                        filter: {
                            resource: 'Cookbook',
                            resourceid: parseInt(payload.resourceid)
                        }
                    })

                    /* Assign the existing cookbook id so we can use that when updating */
                    const existingId = response?.data?.results[0]?.id

                    /* generate the url for the request */
                    url = `${process.env.REACT_APP_API_URL}/${resource}/${existingId}`

                    /* Generate the form to send the details through on */
                    /* Generate the payload to send */
                    formData = new FormData()
            
                    formData.append(
                        'images',
                        payload?.images,
                        payload?.images?.name
                    )
                    formData.append('userid',payload.userId)
                    formData.append('resourceid', payload.resourceid)
                    formData.append('resource', payload.resource)
                    formData.append('title', payload.title)

                    /* set the correct mimetype for the form */
                    axiosOptions.headers['Content-type'] = "multipart/form-data"

            } else {
                /* generic catch all url, should be good for most resources */
                url = `${process.env.REACT_APP_API_URL}/${resource}/${params.id}`
            }

        // Access the appropriate API and process the results
        let response
        if(resource === "uploads"){
            response = await axios.put(url, formData, axiosOptions)
        } else {
            response = await axios.put(url, payload, axiosOptions)
        }

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
            const { perPage } = params.pagination || null
            const { overrideLimit } = params.pagination || false

            // Sorting
            const { field } = params.sort || 'id'
            const { order } = params.sort || 'desc' 

            // Set up the query params
            let queryParams = {
                page: page ? page : 1,
                sort_by: field ? field : 'id',
                sort_direction: order ? order : 'desc',
                filter: params.filter ? JSON.stringify(params.filter) : undefined
            }

            if(overrideLimit){
                queryParams.limit = null
            } else {
                queryParams.limit = perPage ? perPage : null
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

            axiosOptions.validateStatus = status => { return true}

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

    },

    pantrySearch: async (params) => {

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
            const { perPage } = params.pagination || null
            const { overrideLimit } = params.pagination || false

            // Sorting
            const { field } = params.sort || 'id'
            const { order } = params.sort || 'desc' 

            // Set up the query params
            let queryParams = {
                page: page ? page : 1,
                sort_by: field ? field : 'id',
                sort_direction: order ? order : 'desc',
                filter: JSON.stringify(params.filter)
            }

            if(overrideLimit){
                queryParams.limit = null
            } else {
                queryParams.limit = perPage ? perPage : null
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

            axiosOptions.validateStatus = status => { return true}

            // Set the URL to use
            let url = `${process.env.REACT_APP_API_URL}/search/pantry?${queryString.stringify(queryParams)}`

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

    },

    doIExist: async (params) => {

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
        const payload = params?.payload

        // Pagination
        const { page } = params?.pagination || 1
        const { perPage } = params?.pagination || 10
        const { overrideLimit } = params?.pagination || false

        // Sorting
        const { field } = params?.sort || 'id'
        const { order } = params?.sort || 'desc' 

        // Authentication
        const { authenticate } = params?.auth || false
        const { roles } = params?.auth || 'user'

        // Set up the query params
        let queryParams = {
            page: page ? page : 1,
            sort_by: field ? field : 'id',
            sort_direction: order ? order : 'desc',
            filter: JSON.stringify(params.filter)
        }

        if(overrideLimit){
            queryParams.limit = null
        } else {
            queryParams.limit = perPage ? perPage : null
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

        axiosOptions.validateStatus = status => { return true}

        // Generate the URL to use
        let url = `${process.env.REACT_APP_API_URL}/${payload.resource}?${queryString.stringify(queryParams)}`

        // Pass the data to the API and check if we have a duplicate
        const response = await axios.get(url, axiosOptions)
        
        if(response?.status >= 300){
            return true
        } else {
            if(response?.data?.results?.length > 0){
                return true
            } else {
                return false
            }
        }

    }

}

export default apiProvider;