import { useState, useEffect } from "react";
import apiProvider from "../providers/apiProvider";

export const useList = (resource) => {

    /* State to hold the list items we need */
    const [list, setList] = useState(null)

    /* Here we get the data from the API and store it locally in out state */
    useEffect(() => {

        /* As we cant use async with useEffect then we first need to create a
         method to gather the data from the API and then we run that method */
        const fetchData = async () => {

            console.log('useList')

            /* Set the params to send to the API */
            const params = {
                pagination: {
                    perPage: null,
                    overrideLimit: true
                }
            }

            /* Make the call to the API */
            const results = await apiProvider.getList(resource, params)
            setList(results.data.results)

        }

        /* Get the data */
        fetchData()

    }, [])

    /* Return the items from the specified resource to the calling function */
    return list

}