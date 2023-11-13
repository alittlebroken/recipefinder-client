import './ProfileRecipes.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { 
    fetchRecipes,
    selectHasError,
    selectIsLoading,
    selectRecipes,
    selectPage,
    selectPages,
    selectRecords,
    selectRecsPerPage,
} from '../../../slices/Recipes/Recipes.slice'

import { 
    selectProfileData,
} from '../../../slices/Profile/Profile.slice'

const ProfileRecipes = () => {

    /* Alias the dispatcher */
    const dispatch = useDispatch()

    /* Gather the data from the store */
    const recipes = useSelector(selectRecipes)

    /* Get the users profile information */
    const profile = useSelector(selectProfileData)

    /* Load the data when the component is first mounted */
    useEffect(() => {

        /* Function to allow us to await the fetch of data from the 
           API */
        const fetchData = async () => {

            /* Call the API to get us some records to look at */
            await dispatch(fetchRecipes({ userId: profile.userId}))

        }

        /* Fetch the data */
        fetchData()

    }, [])


    return (
        <div aria-label="recipes container" className="pr-container flex">

            <div aria-label="recipes header container" className="pr-header-container">
                <h2 className="pr-head-2">Recipes</h2>
                <button className="btn pr-btn-new">New</button>
            </div>

            <div aria-label="recipe filter container" className="pr-filter-container">


            </div>

            <div aria-label="recipes container" className="pr-recipes-container flex">

                {recipes.map((recipe) => {
                    return (
                        <div aria-label="recipe container" className="pr-recipe-container flex">

                            <img src={recipe.src} alt={recipe.alt} title={recipe.title} className="pr-recipe-image" />

                            <div aria-label="recipe details container" className="pr-recipe-details flex">
                                <h3 className="pr-recipe-head-3">{recipe.name}</h3>
                                <div aria-label="recipe description" className="pr-recipe-description">
                                    {recipe.description}
                                </div>
                            </div>

                            <div aria-label="recipe actions" className="pr-recipe-actions flex">
                                <button 
                                    className="btn pr-recipe-btn-more"
                                    value="more"
                                    onClick={handleClick}
                                >
                                        More Info
                                </button>
                                <button 
                                    className="btn pr-recipe-btn-remove"
                                    value="remove"
                                    onClick={handleClick}
                                > 
                                        Remove
                                </button>
                            </div>

                        </div>
                    )
                })}

            </div>


        </div>
    )
}

export default ProfileRecipes