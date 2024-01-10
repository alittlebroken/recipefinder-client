import './RecipeDetails.css'

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import apiProvider from '../../../providers/apiProvider'

import Carousel from '../../UI/Carousel/Carousel'
import RecipeSteps from './RecipeSteps'
import RecipeIngredients from './RecipeIngredients'
import RecipeInformation from './RecipeInformation'
import RecipeCategories from './RecipeCategories'

import { useRecipe } from '../../../hooks/useRecipe'

const RecipeDetails = () => {

    /* Extract the details for the recipe */
    const urlParams = useParams()
    const id = urlParams.id
    
    const [isLoading, setIsLoading] = useState(true)
    const [errors, setErrors] = useState(null)
    const [recipe, setRecipe] = useState(null)

    /* Load the recipe details */
    useEffect(() => {

        try {

            const fetchData = async () => {

                const params = {
                    id: id
                }

                const response = await apiProvider.getOne('recipes', params)
                setRecipe(response.data[0])
                setIsLoading(false)

            }

            fetchData()

        } catch(error) {
            setErrors(errors)
            setIsLoading(false)
        }

    },[])

    console.log(recipe)

    /* Generate the slides for the carousel */
    let carouselSlides = []
    recipe?.images && recipe?.images?.forEach(image => {
        carouselSlides.push(image)
    })


    if(isLoading) {
        return (<div className="loadingContent">Loading content. Please wait ...</div>)
    }

    if(errors){
        return (
            <div className="errorDetails">{errors}</div>
        )
    }

    /* Styles for header */
    const headerStyles = {
        backgroundImage: `url(${recipe?.images[0]?.source})`
    }

    return(
        <div aria-label="recipe detail container" className="rd-recipeContainer flex">

            <div 
                aria-label="recipe header container" 
                className="rd-recipeHeaderContainer"
                style={headerStyles}
            >
                <h2 className="rd-recipeTitle">{recipe?.name || null}</h2>
            </div>

            <RecipeCategories categories={recipe?.categories} />

            <div aria-label="recipe description" className="rd-recipeDescription">
                {recipe?.description || null}
            </div>

            <div aria-label="outer carousel container" style={{
                width: '95%',
                height: '350px',
                margin: '0 auto',
            }}>

                <Carousel slides={carouselSlides} />

            </div>

            <div aria-label="recipe details container" className="rd-recipeDetailsContainer flex">

                <div aria-label="recipe details left container" className="rd-recipeDetailsLeft flex">

                    <RecipeIngredients ingredients={recipe.ingredients} />

                    <RecipeInformation info={{
                        servings: recipe.servings,
                        calories: recipe.calories_per_serving,
                        prep_time: recipe.prep_time,
                        cook_time: recipe.cook_time
                    }} />

                </div>

                <div aria-label="recipe details right container" className="rd-recipeDetailsRight">

                    <RecipeSteps steps={recipe.steps} />

                    

                </div>

            </div>

        </div>
    )

}

export default RecipeDetails