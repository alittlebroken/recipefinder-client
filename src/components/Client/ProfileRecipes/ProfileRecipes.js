import './ProfileRecipes.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
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

import apiProvider from '../../../providers/apiProvider'

import { useNavigate } from 'react-router-dom'

import Pagination from '../../UI/Pagination/Pagination'

const ProfileRecipes = () => {

    /* Alias the dispatcher */
    const dispatch = useDispatch()

    /* Alias the navigation hook */
    const navigate = useNavigate()

    /* Gather the data from the store */
    const recipes = useSelector(selectRecipes)

    /* Get the users profile information */
    const profile = useSelector(selectProfileData)

    /* Set state for notifications */
    const [notifications, setNotifications] = useState()

    /* pagination options */
    const pagination = {
        page: useSelector(selectPage),
        pages: useSelector(selectPages),
        recsPerPage: useSelector(selectRecsPerPage),
        records: useSelector(selectRecords)
    }

    /* State for controlling pagination */
    const [page, setPage] = useState(pagination.page)
    const [recsPage, setRecsPage] = useState(pagination.recsPerPage)



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

    }, [page, recsPage, dispatch])

    /* Handle the buttons onClick functionality */
    const handleClick = async (e) => {

        e.preventDefault()

        /* Check the button being clicked */
        if(e.target.name === "more"){

            /* Navigate to the recipe detail page */
            navigate(`/recipes/${e.target.value}`)

        } else if(e.target.name === "remove"){

            /* Create the params to send to the API call */
            const params = {
                auth: {
                    authenticate: true
                },
                id: e.target.value
            }

            const result = await apiProvider.removeOne('recipes', params)
            
            if(result.status >= 200 && result.status < 300){
                setNotifications({
                    className: 'notif-ok',
                    message: 'Recipe successfully removed.'
                })
            } else {
                setNotifications({
                    className: "notif-error",
                    message: 'Unable to remove Recipe.'
                })
            }

        }

    }

     /* Handler for changing how many records to display per
     * page 
    */
     const recsChangeHandler = async (e) => {
        setRecsPerPage(e.target.value)
        dispatch(setRecsPerPage(e.target.value))
    }

    /* Handler for going forward or backward the pages */
    const pageChangeHandler = async (e) => {
        if(e.target.value === '-'){
            setPage(page - 1)
            dispatch(downPage())
        } else if(e.target.value === '+'){
            setPage(page + 1)
            dispatch(upPage())
        }
    }



    return (
        <div aria-label="recipes container" className="pr-container flex">

            <div aria-label="recipes header container" className="pr-header-container">
                <h2 className="pr-head-2">Recipes</h2>
                <button className="btn pr-btn-new">New</button>
            </div>

            <div aria-label="recipe filter container" className="pr-filter-container">


            </div>

            <Pagination 
                        totalRecords={pagination.records}
                        recsPerPage={pagination.recsPerPage}
                        totalPages={pagination.pages}
                        currentPage={pagination.page}
                        handlePageChange={pageChangeHandler}
                        handleRecsChange={recsChangeHandler}
                        minified
            />

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
                                    name="more"
                                    value={recipe.id}
                                    onClick={handleClick}
                                >
                                        More Info
                                </button>
                                <button 
                                    className="btn pr-recipe-btn-remove"
                                    name="remove"
                                    value={recipe.id}
                                    onClick={handleClick}
                                > 
                                        Remove
                                </button>
                            </div>

                        </div>
                    )
                })}

            </div>

            <Pagination 
                        totalRecords={pagination.records}
                        recsPerPage={pagination.recsPerPage}
                        totalPages={pagination.pages}
                        currentPage={pagination.page}
                        handlePageChange={pageChangeHandler}
                        handleRecsChange={recsChangeHandler}
                        minified
            />

            {notifications && (
                <div aria-label="notifications container" className={notifications.className}>
                    {notifications.message}
                </div>
            )}

        </div>
    )
}

export default ProfileRecipes