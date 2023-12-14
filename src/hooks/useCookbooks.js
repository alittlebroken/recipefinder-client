import { useState, useEffect } from "react";
import apiProvider from "../providers/apiProvider";

export const useCookbooks = (resource, id) => {

    /* State to hold the list items we need */
    const [list, setList] = useState()

    /* Here we get the data from the API and store it locally in out state */
    useEffect(() => {

        /* As we cant use async with useEffect then we first need to create a
         method to gather the data from the API and then we run that method */
        const fetchData = async () => {


            /* Set the params to send to the API */
            const params = {
                pagination: {
                    perPage: null,
                    overrideLimit: true
                },
                filter: {
                    userId: id
                },
                auth: {
                    authenticate: true
                }
            }

            
            /* Loop through each resource passed in and extract the
            required data from the API.
            Pass it back as an array of objects */
            let results = await apiProvider.getList(resource, params)
            
            if(results.status >= 200 && results.status < 300) {
                setList(results.data.results)
            } else {
                setList(results.message)
            }
          
        }

        /* Get the data */
        return fetchData()

    }, [resource, id])

    
    /* Return the items from the specified resource to the calling function */
    return list

}