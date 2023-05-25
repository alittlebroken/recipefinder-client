import axios from 'axios'
import queryString from 'query-string'
import { HttpError } from 'react-admin'

import inMemoryJWT from '../utils/auth.utils';

const dataProvider = {

    getList:   async (resource, params) => {
        try{

            /* Set the headers for the URI */
            const headers = {
                'token': inMemoryJWT.getToken(),
                'Content-type': 'application/json'
            }

            /* generate the options for the axios request */
            const axiosOptions = {
                withCredentials: true,
                headers: headers
            }

            /* Extract params */
            const { page, perPage } = params.pagination
            const { field, order} = params.sort
            
            /* Set the filter, pagination and sort options for our API */
            /* generate the url */
            const url = `${process.env.REACT_APP_API_URL}/${resource}`

            /* Create the query params object ready to be stringified to the url */
            const queryParams = {
                page: page ? page : 1,
                limit: perPage ? perPage : 10,
                sort_by: field ? field : 'id',
                sort_direction: order ? order : 'desc',
                filter: JSON.stringify(params.filter)
            }

            /* get the response from the server */
            const response = await axios.get(
                `${url}?${queryString.stringify(queryParams)}`, 
                axiosOptions
                )

            if(response.status < 200 || response.status >= 300){
                let { status, statusText } = response
                return Promise.reject(new HttpError((response.data.results.message || statusText), status, response))
            }

            /* Extract the relevant data we need to pass back to the calling function */
            const records = response?.data?.results
            const totalRecords = response?.data?.results?.totalRecords

            return Promise.resolve({
                data: records,
                total: totalRecords
            })

        } catch(e) {
            return Promise.reject(e)
        }
        
    },
    getOne: async (resource, params) => {
        try{

            /* Set the headers for the URI */
            let headers = {
                'token': inMemoryJWT.getToken(),
                'Content-type': 'application/json'
            }

            /* generate the options for the axios request */
            const axiosOptions = {
                withCredentials: true,
                headers: headers
            }

            /* Set the filter, pagination and sort options for our API */
            /* generate the url */
            let url
            if(resource === 'uploads'){
                url = `${process.env.REACT_APP_API_URL}/${resource}`
            } else {
                url = `${process.env.REACT_APP_API_URL}/${resource}/${params.id}`
            }
            
            /* 
             * If we want to extract one for categories we need to add a filter as
             * we have no getOne route for categories
             */
            let response;
            if(resource === "categories" || resource === "uploads"){
                const queryParams = { filter: JSON.stringify({ id: params.id}) }
                response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/${resource}?${queryString.stringify(queryParams)}`, 
                    axiosOptions)
            } else {
                /* get the response from the server */
                response = await axios.get(
                    `${url}`, 
                    axiosOptions)
            }

            if(response.status < 200 || response.status >= 300){
                let { status, statusText } = response
                return Promise.reject(new HttpError((response.data.results.message || statusText), status, response))
            }

            /* Extract the relevant data we need to pass back to the calling function */
            let records;
            /* Check what resource we are returning data for as the structure 
             * for categories is different as it has no getOne route
             */
            if(resource === "categories" || resource === "users"){
                records = response?.data?.results[0]
            } else if (resource === "steps") {
                records = response?.data
            } else if (resource === "pantries" ) {
                records = {
                    id: response?.data?.results[0].pantryId,
                    userId: response?.data?.results[0].userId,
                    numIngredients: response?.data?.results[0].numIngredients,
                    ingredients: response?.data?.results[0].ingredients
                }
            } else if (resource === 'uploads' ){
                console.log(response.data.results[0].src)
                records = response.data.results[0]
            } else {
                records = response?.data[0]
            }

            /* Depending on the resource, get any and or all images */
            let pictures
            if(resource === "cookbooks"){
                pictures = await dataProvider.getImages({ resource: "Cookbook", resourceid: params.id })
            }

            if(resource === "recipes"){
                pictures = await dataProvider.getImages({ resource: "recipe", resourceid: params.id })
            }

            if(resource === "ingredients"){
                pictures = await dataProvider.getImages({ resource: "Ingredients", resourceid: params.id })
            }

            /* Generate the payload containing the record data as well as the images for the resource */
            let payload
            payload = {
                ...records,
            }

            if((pictures?.length >= 1 && resource === "cookbooks") || (pictures?.length >= 1 && resource === "ingredients")){
                payload.pictures = {
                    id: pictures[0].id,
                    src: pictures[0].src,
                    title: pictures[0].title
                }
            }

            if(pictures?.length >= 1 && resource === "recipes" ){
                payload.pictures = pictures
            }

            console.log('getOne->payload: ', payload)

            return Promise.resolve({
                data: payload
            })

        } catch(e) {
            return Promise.reject(e)
        }

    },
    getMany: async (resource, params) => {
        try {

            /* Set the headers for the URI */
            let headers = {
                'token': inMemoryJWT.getToken(),
                'Content-type': 'application/json'
            }

            /* generate the options for the axios request */
            const axiosOptions = {
                withCredentials: true,
                headers: headers
            }

            /* set the URL to use */
            const BASE_URL = `${process.env.REACT_APP_API_URL}/${resource}`

            /* Get a list of the ids to loopthrough */
            let uri = `${BASE_URL}?${queryString.stringify({ filter: JSON.stringify({ id: params.ids})})}`
            
            /* Get the values from the API */
            let res = await axios.get(
                `${uri}`, 
                axiosOptions)

            /* Check we have no problems whilst getting them */
            if(res.status < 200 || res.status >= 300){
                let { status, statusText } = res
                return Promise.reject(new HttpError((res.data.results.message || statusText), status, res))
            }

            /* All is OK, so return the records */
            if(res?.data?.results){
                return Promise.resolve({
                    data: res?.data?.results
                })
            } else {
                return Promise.reject()
            }

        } catch(e) {
            return Promise.reject(e)
        }

    },
    getManyReference: async (resource, params) => {
        
        try {

            /* Set the headers for the URI */
            const headers = {
                'token': inMemoryJWT.getToken(),
                'Content-type': 'application/json'
            }

            /* generate the options for the axios request */
            const axiosOptions = {
                withCredentials: true,
                headers: headers
            }

            /* Build up the query paremeters for the request */
            /* Create the query params object ready to be stringified to the url */
            const queryParams = {
                filter_by: params.target,
                filter_values: params.id
            }

            /* set the URL to use */
            const URL = `${process.env.REACT_APP_API_URL}/${resource}?${queryString.stringify(queryParams)}`

            /* Get the record from the API */
            const res = await axios.get(
                `${URL}`, 
                axiosOptions)
            
            if(res?.data?.results){
                return Promise.resolve({ data: res.data.results} )
            } else {
                return Promise.reject()
            }

        } catch(e) {
            return Promise.reject(e)
        }
    },
    create:   async (resource, params) => {
        try {

            console.log('Create: ', resource, params)

            /* Set the headers for the URI */
            let headers = {
                'token': inMemoryJWT.getToken(),
            }
            if(params?.data?.images?.rawFile || params?.data?.tests?.rawFile){
                headers['Content-type'] = 'multipart/form-data'
            } else {
                headers['Content-type'] = 'application/json'
            }

            /* generate the options for the axios request */
            const axiosOptions = {
                withCredentials: true,
                headers: headers
            }

            /* generate the url */
            let url
            url = `${process.env.REACT_APP_API_URL}/${resource}`

            /* Generate the payload */
            let payload = {
                ...params.data 
             }
             
             /* Upload any images */
             let uploads = undefined
             let uploadType = 'tests'

             if(params?.data?.images?.rawFile){
                 uploads = params.data.images.rawFile
                 uploadType = 'images'
             } else if (params?.data?.tests?.rawFile){
                 uploads = params.data.tests.rawFile
             } 

             if(params?.data?.tests?.rawFile){
                payload.tests = uploads
             } 
             
             if(params?.data?.images?.rawFile) {
                payload.images = uploads
             }

             payload.title = params?.data?.title

            /* send the data to the server */
            const res = await axios.post(
                url,
                payload, 
                axiosOptions)
    
            /* Check we have no problems */
            if(res.status < 200 || res.status >= 300){
                let { status, statusText } = res
                return Promise.reject(new HttpError((res.data.results.message || statusText), status, res))
            }

            console.log(res)

            let successFullUpload = true
            if(uploads){

                /* Generate the url */
                url = `${process.env.REACT_APP_API_URL}/uploads`
                
                /* Generate the payload we need */
                let uploadPayload = {
                    userId: params?.data?.userId,
                    title: params?.data?.title,
                }

                if(res?.data?.results){
                    uploadPayload.resourceid = res?.data?.results[0]?.id
                } else {
                    uploadPayload.resourceid = res?.data[0]?.id
                }

                if(resource === "cookbooks"){
                    uploadPayload.resource = 'Cookbook'
                } else if (resource === 'ingredients'){
                    uploadPayload.resource = 'Ingredients'
                }

                if(uploadType === "tests"){
                    uploadPayload.tests = uploads
                } else {
                    uploadPayload.images = uploads
                }

                /* Send the data to the server */
                const response = await axios.post(url, uploadPayload, axiosOptions)

                if(response.status < 200 || response.status >= 300){
                    successFullUpload = false
                }
                

            }

            return Promise.resolve({data: {id: params.id}})

        } catch(e) {
            return Promise.reject(e)
        }
    },
    update:   async  (resource, params) => {
        try {

            console.log(`Update ${resource}: `, params)

            /* Set the headers for the URI */
            let headers = {
                'token': inMemoryJWT.getToken(),
            }
            if(params?.data?.images?.rawFile || params?.data?.images?.length >= 1 || params?.data?.tests?.rawFile || params?.data?.tests?.length >= 1){
                headers['Content-type'] = 'multipart/form-data'
            } else {
                headers['Content-type'] = 'application/json'
            }

            /* generate the options for the axios request */
            const axiosOptions = {
                withCredentials: true,
                headers: headers
            }

            let url
            let imageUploadResult = true

            /* Add/Update the cookbooks image if we have any to add*/
            if (params?.data?.images?.rawFile || params?.data?.tests?.rawFile){

                /* If no existing image then we can just add the new one */
                    console.log(params.data)
                    console.log('Adding new images')
                    /* Generate the url we need */
                    url = `${process.env.REACT_APP_API_URL}/uploads`

                    /* Create the payload to send */
                    let imagePayload = {
                        resourceid: parseInt(params?.data?.id),
                        title: params?.data?.title || params?.data?.name,
                        userid: parseInt(params?.data?.userId),
                    }

                    if(resource === "cookbooks"){
                        imagePayload.resource = 'Cookbook'
                    } else if( resource === "ingredients"){
                        imagePayload.resource = 'Ingredients'
                    } else if( resource === "recipes"){
                        imagePayload.resource = 'recipe'
                    }

                    if(params?.data?.tests?.rawFile){
                        imagePayload.tests = params.data.tests.rawFile
                    } else if (params?.data?.tests?.length >= 1){
                        //imagePayload.tests = params.data.tests
                        imagePayload.images = []
                        params.data.tests.map(file => {
                            imagePayload.images.push(file.rawFile)
                        })
                    }
                     
                    if(params?.data?.images?.rawFile) {
                        imagePayload.images = params.data.images.rawFile
                    } else if (params?.data?.images?.length >= 1) {
                        //imagePayload.images = params.data.images
                        imagePayload.images = []
                        params.data.images.map(file => {
                            imagePayload.images.push(file.rawFile)
                        })
                    }

                    /* Send the data to the server */
                    const res = await axios.post(url, imagePayload, axiosOptions)

                    console.log('Existing Cookbook new image upload result: ', res)

                    /* Check we have no problems */
                    if(res.status < 200 || res.status >= 300){
                        imageUploadResult = false
                    }
                
            }

            /* generate the url */
            url = `${process.env.REACT_APP_API_URL}/${resource}/${params.id}`

            /* Generate the payload */
            let payload = {
               ...params.data 
            }
            
            if(params?.data?.tests?.rawFile){
               payload.tests = params.data.tests.rawFile
            } else if (params?.data?.tests?.length >= 1) {
                payload.tests = params.data.tests
            }
            
            if(params?.data?.images?.rawFile) {
               payload.images = params.data.images.rawFile
            } else if (params?.data?.images?.length >= 1){
                payload.images = params.data.images
            }

            console.log('Update: ', params.data, payload)

            /* send the data to the server */
            let res;
            res = await axios.put(
                url,
                payload, 
                axiosOptions
            )

            /* Check we have no problems */
            if(res.status < 200 || res.status >= 300){
                let { status, statusText } = res
                return Promise.reject(new HttpError((res.data.results.message || statusText), status, res))
            }

            return Promise.resolve({data: {id: params.id}})

        } catch(e) {
            return Promise.reject(e)
        }
    },
    updateMany: async (resource, params) => {
        Promise.resolve()
    },
    delete:    async (resource, params) => {
       
        try {

            /* Set the headers for the URI */
            const headers = {
                'token': inMemoryJWT.getToken(),
                'Content-type': 'application/json'
            }

            /* generate the options for the axios request */
            const axiosOptions = {
                withCredentials: true,
                headers: headers
            }

            /* Extract params */
            const page = params?.pagination ? params?.pagination : 1
            const perPage = params?.pagination ? params?.pagination : 10
            const field = params?.sort ? params?.sort : 'id'
            const order = params?.sort ? params?.sort : 'desc'

            /* Create the query params object ready to be stringified to the url */
            const queryParams = {
                page: page, 
                limit: perPage,
                sort_by: field,
                sort_direction: order,
                filter: JSON.stringify({ids: params.id})
            }

            /* generate the url */
            let url
            if(resource === "uploads"){
                url = `${process.env.REACT_APP_API_URL}/${resource}?${queryString.stringify(queryParams)}`
            } else {
                url = `${process.env.REACT_APP_API_URL}/${resource}/${params.id}`
            }

            /* send the data to the server */
            const res = await axios.delete(
                url, 
                axiosOptions)
            
            /* Check we have no problems */
            if(res.status < 200 || res.status >= 300){
                let { status, statusText } = res
                return Promise.reject(new HttpError((res.data.results.message || statusText), status, res))
            }

            return Promise.resolve({data: {id: params.id}})


        } catch(e) {
            return Promise.reject(e)
        }
    },
    deleteMany: async (resource, params) => {
        
        try {

            /* Set the headers for the URI */
            const headers = {
                'token': inMemoryJWT.getToken(),
                'Content-type': 'application/json'
            }

            /* generate the options for the axios request */
            const axiosOptions = {
                withCredentials: true,
                headers: headers
            }

            params.ids.map(async id => {

                /* Build the url to delete the current id */
                let url

                if( resource === 'uploads'){

                    /* Create the query params object ready to be stringified to the url */
                    const queryParams = {
                        page: 1, 
                        limit: 10,
                        sort_by: 'id',
                        sort_direction: 'desc',
                        filter: JSON.stringify({ids: id})
                    }

                    url = `${process.env.REACT_APP_API_URL}/${resource}/?${queryString.stringify(queryParams)}`
                    
                } else {

                    url = `${process.env.REACT_APP_API_URL}/${resource}/${id}`

                }


                /* Try and delete the selected id */
                let res = await axios.delete(
                    url, 
                    axiosOptions)
                
                /* Check we have no problems */
                if(res.status < 200 || res.status >= 300){
                    let { status, statusText } = res
                    return Promise.reject(new HttpError((res.data.results.message || statusText), status, res))
                }

            })

            return Promise.resolve({data: params.ids})

            } catch(e) {
                return Promise.reject(e)
        }
    },
    resetPassword: async (resource, params) => {

        try{

            /* Set the headers for the URI */
            const headers = {
                'token': inMemoryJWT.getToken(),
                'Content-type': 'application/json'
            }

            /* generate the options for the axios request */
            const axiosOptions = {
                withCredentials: true,
                headers: headers
            }

        /* generate the url */
        const url = `${process.env.REACT_APP_API_URL}/auth/reset-password`

        /* send the data to the server */
        const res = await axios.post(
            url,
            {
                userId: params.id,
                password: params.password
            },
            axiosOptions)

        /* Check we have no problems */
        if(res.status < 200 || res.status >= 300){
            let { status, statusText } = res
            return Promise.reject(new HttpError((res.data.results.message || statusText), status, res))
        }

            return Promise.resolve(true)

        } catch(e) {
            return Promise.reject(e)
        }

    },
    getUserProfile: async (params) => {

        /* We store user profile data in localStorage */
        const profile = localStorage.getItem("profile")
        if(!profile){
            return Promise.resolve({ data: {}})
        } 

        /* Extract the data from the profile */
        const data = JSON.parse(profile)

        return Promise.resolve({ data })

    },
    updateUserProfile: async ( data ) => {

        try{

            /* Set the headers for the URI */
            const headers = {
                'token': inMemoryJWT.getToken(),
                'Content-type': 'application/json'
            }

            /* generate the options for the axios request */
            const axiosOptions = {
                withCredentials: true,
                headers: headers
            }

            /* generate the url */
            const url = `${process.env.REACT_APP_API_URL}/auth/profile`

            const profile = {
                ...data
            }

            /* Send the data to the appropriate API route */
            const result = await axios.post(
                url,
                profile,
                axiosOptions
            )

             if(result.status < 200 || result.status > 300){
                return Promise.resolve(false)
             }

            return Promise.resolve(true)

        } catch(e) {
            return Promise.resolve(false)
        }


    },
    loadDashboard: async () => {

        try{

            /* Setup the axios request */
            const url = `${process.env.REACT_APP_API_URL}/dashboard`
            
            const axiosOptions = {
                withCredentials: true,
                headers: {
                    'token': inMemoryJWT.getToken(),
                    'Content-type': 'application/json'
                }
            }

            /* Send the request to get the dashboard data */
            const result = await axios.get(
                url,
                axiosOptions
            )

            if(!result){
                return Promise.reject(false)
            }

            return Promise.resolve(result.data.data)
        } catch(e) {
            return Promise.reject()
        }

    },
    getImages: async (params) => {

        try {

            console.log(params)

            /* Generate the headers for the request */
            const axiosOptions = {
                withCredentials: true,
                headers: {
                    'token': inMemoryJWT.getToken(),
                    'Content-type': 'application/json'
                }
            }

            /* Generate the query params */
            let resourceName
            
            const queryParams = { 
                filter: JSON.stringify({ 
                    resource: params.resource,
                    resourceid: params.resourceid
                }) 
            }

            /* Generate the url for the API resource we are interested in */
            const uri = `${process.env.REACT_APP_API_URL}/uploads?${queryString.stringify(queryParams)}`

            /* Get the data ( if any ) from the API */
            const response = await axios.get(
                uri,
                axiosOptions
            )

            console.log('Response: ', response)

            if(response?.data?.results){
                return Promise.resolve(response.data.results)
            } else {
                return Promise.resolve([])
            }

        } catch(e) {
            console.log(e)
            if(e.response.data.message === 'There were no records found'){
                return Promise.resolve([])
            } else {
                return Promise.reject(e)
            }
             
        }

    }
    
}



export default dataProvider