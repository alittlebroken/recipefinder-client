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
    upPage,
    downPage
} from '../../../slices/Recipes/Recipes.slice'

import { 
    selectProfileData,
} from '../../../slices/Profile/Profile.slice'

import apiProvider from '../../../providers/apiProvider'

import { useNavigate } from 'react-router-dom'

import Pagination from '../../UI/Pagination/Pagination'

import Modal from '../../UI/Modal/Modal'

import ProfileRecipeNew from './ProfileRecipeNew'

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
    const [recsPage, setRecsPerPage] = useState(pagination.recsPerPage)

    /* State for working on the current record the user has selected, for removal etc */
    const [currentRecipe, setCurrentRecipe] = useState(null)

    /* State for controlling the modals */
    const [showRemoveModal, setShowRemoveModal] = useState(false)
    const [showModalNewRecipe, setShowModalNewRecipe] = useState(false)

    /* Sets if the data for this is dirty and needs to be refreshed */
    const [isDataDirty, setIsDataDirty] = useState(false)

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

            setShowRemoveModal(true)

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

    /* Handlers for closing the modals */
    const handleModalCloseRemove = (e) => {
        e.preventDefault()
        setCurrentRecipe(null)
        setShowRemoveModal(false)
    }

    /* Removes the record from the system */
    const handleRemoveRecipe = async (e) => {
        e.preventDefault()

        /* Create the params to send to the API call */
            const params = {
                auth: {
                    authenticate: true
                },
                id: currentRecipe.id
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

            setShowRemoveModal(false)

    }

    /* Opens and closes the Add new Recipe Modal */
    const handleModalCloseAdd = () => {
        setShowModalNewRecipe(false)
    }

    return (
        <div aria-label="recipes container" className="prc-container flex">

            <Modal show={showRemoveModal} handleClose={handleModalCloseRemove}>
                <div aria-label="remove modal container" className="modal-remove-container flex">
                    <h4>{currentRecipe?.name}</h4>
                    Are you sure you wish to remove this recipe? <br /><br />
                    As soon as you do click Remove, it will be gone forever.
                    <div aria-label="remove modal actions container" className="modal-remove-actions-container flex">
                        <button 
                            name="remove" 
                            className="btn btn-action"
                            onClick={(e) => { handleRemoveRecipe(e)}}
                        >
                            Remove
                        </button>
                        <button 
                            name="cancel" 
                            className="btn btn-action"
                            onClick={(e) => {setShowRemoveModal(false)}}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal show={showModalNewRecipe} handleClose={handleModalCloseAdd}>
                <ProfileRecipeNew 
                    handleNotifications={setNotifications} 
                    isDataDirty={setIsDataDirty} 
                    handleCloseModal={handleModalCloseAdd}/>
            </Modal>

            <div aria-label="recipes header container" className="prc-header-container">
                <h2 className="prc-head-2">Recipes</h2>
                <button className="btn prc-btn-new" onClick={e => { setShowModalNewRecipe(true)}}>New</button>
            </div>

            <div aria-label="recipe filter container" className="prc-filter-container">


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

            <div aria-label="recipes container" className="prc-recipes-container flex">

                {recipes ? (<h3>You currently have no recipes.</h3>) : 
                    recipes.map((recipe) => {
                    return (
                        <div aria-label="recipe container" className="prc-recipe-container flex">

                            <img src={recipe.images[0].source} alt={recipe.images[0].alt} title={recipe.images[0].title} className="prc-recipe-image" />

                            <div aria-label="recipe details container" className="prc-recipe-details flex">
                                <h3 className="prc-recipe-head-3">{recipe.name}</h3>
                                <div aria-label="recipe description" className="prc-recipe-description">
                                    {recipe.description}
                                </div>
                            </div>

                            <div aria-label="recipe actions" className="prc-recipe-actions flex">
                                <button 
                                    className="btn prc-recipe-btn"
                                    name="more"
                                    value={recipe.id}
                                    onClick={(e => {
                                        handleClick(e)
                                    })}
                                >
                                        More Info
                                </button>
                                <button 
                                    className="btn prc-recipe-btn"
                                    name="remove"
                                    onClick={(e) => {
                                        setCurrentRecipe({
                                            id: recipe.id,
                                            name: recipe.name
                                        })
                                        handleClick(e)
                                    }}
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