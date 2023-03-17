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
            const headers = {
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
            const url = `${process.env.REACT_APP_API_URL}/${resource}/${params.id}`
        

            /* 
             * If we want to extract one for categories we need to add a filter as
             * we have no getOne route for categories
             */
            let response;
            if(resource === "categories"){
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
            if(resource === "categories"){
                records = response?.data?.results[0]
            } else if (resource === "steps") {
                records = response?.data
            } else {
                records = response?.data[0]
            }

            return Promise.resolve({
                data: records
            })

        } catch(e) {
            return Promise.reject(e)
        }

    },
    getMany: async (resource, params) => {
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
    create:     async (resource, params) => {
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

            /* generate the url */
            const url = `${process.env.REACT_APP_API_URL}/${resource}`

            /* send the data to the server */
            const res = await axios.post(
                url,
                params.data, 
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
    update:   async  (resource, params) => {
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

            /* generate the url */
            const url = `${process.env.REACT_APP_API_URL}/${resource}/${params.id}`

            /* send the data to the server */
            const res = await axios.put(
                url,
                params.data, 
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

        /* generate the url */
        const url = `${process.env.REACT_APP_API_URL}/${resource}/${params.id}`

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
                let url = `${process.env.REACT_APP_API_URL}/${resource}/${id}`

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
}

export default dataProvider