import './ProfileCookbook.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import {
    getCookBookRecipeList,
    pageUp,
    pageDown,
    setRecsPerPage,
    goToPage,
    selectIsLoading,
    selectHasError,
    selectRecipes,
    selectPage,
    selectPages,
    selectRecsPerPage,
    selectRecords
} from '../../../slices/Cookbooks/Cookbooks.slice'
import Pagination from '../../UI/Pagination/Pagination'
import { nanoid } from '@reduxjs/toolkit'
import Modal from '../../UI/Modal/Modal'
import { useNavigate } from 'react-router-dom'


const ProfileCookbook = (props) => {

    /* Alias the dispatch hook */
    const dispatch = useDispatch()

    /* Alias the navigation hook */
    const navigate = useNavigate()

    /* Destructure the props passed in */
    const {
        cookbook
    } = props

    /* Get a list of the recipes for this cookbook */
    const recipes = useSelector(selectRecipes)

    /* Are we still loading data or have we encountered an error */
    const loading = useSelector(selectIsLoading)
    const errored = useSelector(selectHasError)

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

    /* State for controlling if the data is outdated ( dirty ) */
    const [isDirty, setIsDirty] = useState(false)

    /* State for Modal forms */
    /* remove ingredient State */
    const [showRemoveModal, setShowRemoveModal] = useState(false)
    /* edit ingredient state */
    const [showEditModal, setShowEditModal] = useState(false)

    /* State for setting id of ingredient to remove or update */
    const [id, setId] = useState()

    /* Load the recipe list */
    useEffect(() => {

        /* function to fetch the data from the API asynchronously */
        const fetchData = async () => {

            /* generate the payload for the API call */
            const payload = {
                cookbookId: cookbook.id
            }

            await getCookBookRecipeList(payload)
        }

        /* Get the data */
        fetchData()
    }, [page, recsPage, dispatch, isDirty])

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
            dispatch(pageDown())
        } else if(e.target.value === '+'){
            setPage(page + 1)
            dispatch(pageUp())
        }
    }

    /* Handler for closing the remove modal */
    const handleCloseRemovalModal = () => {
        setId(null)
        setShowRemoveModal(false)
    }

    /* Handle the closing of the edit model */
    const handleCloseEditModal = () => {
        setId(null)
        setShowEditModal(false)
    }


    return (
        
        <div aria-label="cookbook container" className="cb-container flex">

            <Modal key={nanoid()} show={showEditModal} handleClose={handleCloseEditModal}>
                
            </Modal>

            <Modal key={nanoid()} show={showRemoveModal} handleClose={handleCloseRemovalModal}>
                
            </Modal>

            <img 
                src={cookbook.src}
                title={cookbook.title}
                alt={cookbook.alt}
            />

            <h2 className="cb-head-2">
                {cookbook.name}
            </h2>

            <div aria-label="cookbook description" className="cb-description">
                {cookbook.description}
            </div>

            <div aria-label="recipes container" className="cb-recipe-list flex">

            <Pagination 
                        totalRecords={pagination.records}
                        recsPerPage={pagination.recsPerPage}
                        totalPages={pagination.pages}
                        currentPage={pagination.page}
                        handlePageChange={pageChangeHandler}
                        handleRecsChange={recsChangeHandler}
                        minified
            />

                {recipes.map( recipe => {

                    <div key={nanoid()} aria-label="recipe-container" className="cb-recipe-container flex">

                        <img 
                            src={recipe.images[0].imageSrc} 
                            title={recipe.images[0].imageTitle}
                            alt={recipe.images[0].imageAlt}
                        />

                        <div aria-label="recipe content" className="cb-recipe-content flex">

                            <div aria-label='recipe details' className="cb-recipe-details flex">

                                <h3 className="cb-head-3">{recipe.name}</h3>

                                <p aria-label="recipe description" className="cb-recipe-desc">
                                    {recipe.description}
                                </p>

                            </div> 

                            <div aria-label="recipe actions" className="cb-recipe-actions flex">

                                <button 
                                    name="remove" 
                                    className="btn cb-action-btn flex"
                                    value={recipe.id}
                                    onClick={(event => {
                                        setId(event.target.value)
                                        setShowRemoveModal(true)
                                    })}
                                >
                                    Remove
                                </button>
                                <button 
                                    name="moreInfo" 
                                    classname="btn cb-action-btn flex"
                                    onClick={(e) => {
                                        navigate(`/recipes/${recipe.id}`)
                                    }}
                                >
                                    More Info
                                </button>
                            </div> 

                        </div>

                    </div>

                })}

                <Pagination 
                        totalRecords={pagination.records}
                        recsPerPage={pagination.recsPerPage}
                        totalPages={pagination.pages}
                        currentPage={pagination.page}
                        handlePageChange={pageChangeHandler}
                        handleRecsChange={recsChangeHandler}
                        minified
            />

            </div>

        </div>

    )

}

export default ProfileCookbook