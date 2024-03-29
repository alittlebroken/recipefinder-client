import { useState, useEffect } from "react";
import apiProvider from "../providers/apiProvider";

export const useList = (resource, multi = false, id = undefined) => {

    /* State to hold the list items we need */
    const [list, setList] = useState()

    /* Here we get the data from the API and store it locally in out state */
    useEffect(() => {

        let resources = {}

        /* As we cant use async with useEffect then we first need to create a
         method to gather the data from the API and then we run that method */
        const fetchData = async () => {


            /* Set the params to send to the API */
            const params = {
                pagination: {
                    perPage: null,
                    overrideLimit: true
                }
            }

            /* If we have an ID to add lets do it here */
            if(id){
                params.id = parseInt(id)
                params.auth = {
                    authenticate: true
                }
            }

            /* Check if we have more than one resource to load */
            if(!multi){
                /* get the only desired resource */
                /* Make the call to the API */
                let results = await apiProvider.getList(resource, params)
                setList(results.data.results)
            } else if (multi){
                /* Loop through each resource passed in and extract the
                 require data from the API.
                 Pass it back as an array of objects */
                await resource.forEach( async data => {
                    let results = await apiProvider.getList(data.resource, params)
                    resources = {
                        ...resources,
                        [data.name]: results.data.results
                    }
                    setList(resources)
                })
                
            }

        }

        /* Get the data */
        fetchData()

    }, [])

    /* Return the items from the specified resource to the calling function */
    return list

}