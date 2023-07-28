import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual  } from 'react-redux';

import "./LandingPage.css"

import LatestRecipes from '../LatestRecipes/LatestRecipes'

import {
    getLatestRecipes,
    selectLatestCount,
    selectLatestRecipes,
    selectisLoading,
    selectHasError
} from '../../../slices/LandingPage/LandingPageSlice'

const LandingPage = (props) => {

    // Alias the dispatch hook
    const dispatch = useDispatch()

    // Get the data for the various components
    let latestRecipeData = useSelector(selectLatestRecipes)
    let latestCount = useSelector(selectLatestCount)
    let loading = useSelector(selectisLoading)

    // Get the data we need for the component
    useEffect(() => {

        dispatch(getLatestRecipes())

    }, [dispatch]) // Only perform when the component mounts 

    return (
        <div aria-label="Landing page for website" className="landing-container">
           { loading ? 'Loading latest recipe data' : (<LatestRecipes recipes={latestRecipeData}/>) }
        </div>
    )
}

export default LandingPage