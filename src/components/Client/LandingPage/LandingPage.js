import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual  } from 'react-redux';

import "./LandingPage.css"

import LandingHero from  '../LandingHero/LandingHero'
import LatestRecipes from '../LatestRecipes/LatestRecipes'
import PopularRecipes from '../PopularRecipes/PopularRecipes'
import LandingCategories from '../LandingCategories/LandingCategories'

import {
    getLatestRecipes,
    selectLatestCount,
    selectLatestRecipes,
    getPopularRecipes,
    selectPopularRecipes,
    getCategories,
    selectCategories,
    selectisLoading,
    selectHasError
} from '../../../slices/LandingPage/LandingPageSlice'

const LandingPage = (props) => {

    // Alias the dispatch hook
    const dispatch = useDispatch()

    // Get the data for the various components
    let latestRecipeData = useSelector(selectLatestRecipes)
    let latestCount = useSelector(selectLatestCount)
    let popularRecipeData = useSelector(selectPopularRecipes)
    let categories = useSelector(selectCategories)
    let loading = useSelector(selectisLoading)

    // Get the data we need for the component
    useEffect(() => {

        dispatch(getLatestRecipes())
        dispatch(getPopularRecipes())
        dispatch(getCategories())

    }, [dispatch]) // Only perform when the component mounts 

    return (
        <>
            <LandingHero />
            <div aria-label="Landing page for website" className="landing-container">
                { loading ? 'Loading latest recipe data' : (<LatestRecipes recipes={latestRecipeData}/>) }
                { loading ? 'Loading popular recipe data' : (<PopularRecipes records={popularRecipeData}/>)}
                { loading ? 'Loading category data' : (<LandingCategories categories={categories}/>)}
            </div>
        </>
    )
}

export default LandingPage