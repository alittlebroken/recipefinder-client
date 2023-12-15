import { useState, useEffect } from "react";
import apiProvider from "../providers/apiProvider";

export const useRecipe = id => {

    /* State to hold the data returned from the API 
       Set some defaults in case the hook does not get the data
       by the time the screen has rendered.
    */
    const [recipe, setRecipe] = useState({
        name: '',
        desc: '',
        ingredients: [],
        categories: [],
        steps: [],
        cookbooks: [],
        prep_time: 0,
        cook_time: 0,
        servings: 0,
        calories_per_serving: 0,
        images: []
    })

    /* Using useEffect gather the data from the API */
    useEffect(() => {

        /* To allow us to use async for the API request, we first need to 
           create a function to perform the work which we then call */
           const fetchData = async (recipeId) => {

                /* Generate the params to send along with the request */
                const params = {
                    id
                }

                /* Send the request and capture the response */
                const res = await apiProvider.getOne('recipes', params)

                if(res.status >= 200 && res.status < 300){

                    /* Get the result sent back from the API */
                    const data = res?.data?.results
                    setRecipe(data)

                } 

           }

        /* Gather the data from the API */
        fetchData()

    }, [])

    /* Return the data we found */
    return recipe

}