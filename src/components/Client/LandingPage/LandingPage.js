import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import "./LandingPage.css"

import LatestRecipes from '../LatestRecipes/LatestRecipes'

import {
    getLatestRecipes,
    selectLatestRecipes,
    selectisLoading,
    selectHasError
} from '../../../slices/LandingPage/LandingPageSlice'

const LandingPage = (props) => {

    // Alias the dispatch hook
    const dispatch = useDispatch()

    // Get the data we need for the component
    useEffect(() => {

        dispatch(getLatestRecipes())

    },[]) // Only perform when the component mounts 

    // Get the data for the various components
    const latestRecipeData = useSelector(selectLatestRecipes)
    console.log(latestRecipeData)

    return (
        <div aria-label="Landing page for website" className="landing-container">
            <LatestRecipes recipes={latestRecipeData}/> 
        </div>
    )
}

export default LandingPage