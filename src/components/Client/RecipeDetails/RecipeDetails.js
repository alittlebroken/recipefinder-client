import './RecipeDetails.css'

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import apiProvider from '../../../providers/apiProvider'

import Carousel from '../../UI/Carousel/Carousel'
import RecipeSteps from './RecipeSteps'
import RecipeIngredients from './RecipeIngredients'
import RecipeInformation from './RecipeInformation'
import RecipeCategories from './RecipeCategories'

import { useRecipe } from '../../../hooks/useRecipe'

import { 
    selectProfileData,
} from '../../../slices/Profile/Profile.slice'
import Modal from '../../UI/Modal/Modal'
import { useCookbooks } from '../../../hooks/useCookbooks'

import { nanoid } from '@reduxjs/toolkit'

const RecipeDetails = () => {

    /* Extract the details for the recipe */
    const urlParams = useParams()
    const id = urlParams.id
    
    const [isLoading, setIsLoading] = useState(true)
    const [errors, setErrors] = useState(null)
    const [recipe, setRecipe] = useState(null)

    /* Get the user profile data */
    let profile = useSelector(selectProfileData)

    /* Gather a list of the users cookbooks
       but only if we are logged in
    */
    const cookbooks = useCookbooks('cookbooks', profile.userId)

    /* State for working on the current record the user has selected, for removal etc */
    const [currentRecipe, setCurrentRecipe] = useState(null)

    /* State for controlling the modals */
    const [showModalAdd, setShowModalAdd] = useState(false)

    /* State for which cookbook we need to add the recipe to */
    const [selectedCookbook, setSelectedCookbook] = useState()

    /* Set state for notifications */
    const [notifications, setNotifications] = useState()

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

            <Modal
                show={showModalAdd}
                handleClose={(e) => {
                    e.preventDefault()
                    setSelectedCookbook()
                    setShowModalAdd(false)
                }}
            >
                <h3 className="selectModalHeading">Add recipe to cookbook?</h3>
                <div aria-label="" className="selectContainer flex">
                    <select 
                        name="cookbook" 
                        id="cookbook" 
                        className="cookbookSelect"
                        onChange={(e) => {
                            e.preventDefault()
                            setSelectedCookbook(e.target.value)
                        }}
                        defaultValue="Please select a cookbook"
                    >
                        <option disabled value={null}>Please select a cookbook</option>
                        {Array.isArray(cookbooks) > 0 && cookbooks.map(cookbook => {
                            return (
                                <option key={nanoid()} value={cookbook.id}>{cookbook.name}</option>
                            )
                        })}
                    </select>
                    <button 
                        className="btn selectBtn"
                        value={{
                            cookbookId: selectedCookbook,
                            recipeId: currentRecipe
                        }}
                        onClick={async (e) => {
                            e.preventDefault()
                            
                            /* Create the params to send to the API */
                            const params = {
                                id: parseInt(selectedCookbook),
                                auth: {
                                    authenticate: true
                                },
                                payload: {
                                    recipeId: currentRecipe
                                }
                            }

                            /* Send the request off */
                            const res = await apiProvider.create("cookbookRecipes",params)
                            
                            if(res.status >= 200 && res.status < 300){
                               console.log("recipe added to cookbook")
                               setNotifications({
                                className: 'notif-ok',
                                message: 'Recipe successfully added to cookbook.'
                                })
                               setCurrentRecipe(null)
                               setSelectedCookbook(null)
                               setShowModalAdd(false) 
                            } else {
                               setNotifications({
                                className: "notif-error",
                                message: 'Unable to add recipe to cookbook.'
                                })
                               setCurrentRecipe(null)
                               setSelectedCookbook(null)
                               setShowModalAdd(false) 
                            }

                        }}
                    >
                        Add
                    </button>
                </div>
            </Modal>

            <div 
                aria-label="recipe header container" 
                className="rd-recipeHeaderContainer"
                style={headerStyles}
            >
                <h2 className="rd-recipeTitle">{recipe?.name || null}</h2>
            </div>

            {profile.userId && (
                <div aria-label="container for add recipe to cookbook button" className="rd-cookbook-add-container flex">
                    <button
                     className="btn rd-add-to-cookbook"
                     onClick={(e) => {
                        setCurrentRecipe(recipe.id)
                        setShowModalAdd(true)
                    }}>Add to cookbook</button>
                </div>
            )}

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
            
            {notifications && (
                <div aria-label="notifications container" className={notifications.className}>
                    {notifications.message}
                </div>
            )}

        </div>
    )

}

export default RecipeDetails