import './Pantry.css'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    getPantryIngredients,
    selectPantryIngredients,
    selectError,
    selectLoading,
    selectPage,
    selectPages,
    selectRecsPerPage,
    selectRecords,
    pageUp,
    pageDown,
    setRecsPerPage,
    setFilter
} from '../../../slices/Pantry/Pantry.slice'
import { performPantrySearch } from '../../../slices/Search/SearchSlice'
import { 
    selectProfileData,
} from '../../../slices/Profile/Profile.slice'
import Pagination from '../../UI/Pagination/Pagination'
import Form from '../../UI/Form/Form'
import FormInput from '../../UI/Form/FormInput'
import Modal from '../../UI/Modal/Modal'
import PantryFormRemoval from './PantryFormRemove'
import PantryFormEdit from './PantryFormEdit'
import { nanoid } from '@reduxjs/toolkit'
import { useList } from '../../../hooks/useList'

import { 
    setSearchTerms,
    setSearchOptions,
    selectSearchResults
 } from '../../../slices/Search/SearchSlice'

import { useNavigate } from 'react-router-dom'
import RecipeList from '../Recipes/RecipeList'

const Pantry = (props) => {

    /* Alias the dispatch hook */
    const dispatch = useDispatch()

    /* Alias the naviaget hook */
    const navigate = useNavigate()

    /* destructure the props */
    const {
        token
    } = props

    /* Gather the data from the store */
    let ingredients = useSelector(selectPantryIngredients)

    /* Get the user profile data */
    let profileData = useSelector(selectProfileData)

    /* List of recipes found based on the ingredients we have */
    let recipesFound = useSelector(selectSearchResults)

    /* pagination options */
    const pagination = {
        page: useSelector(selectPage),
        pages: useSelector(selectPages),
        recsPerPage: useSelector(selectRecsPerPage),
        records: useSelector(selectRecords)
    }

    /* Are we still loading data or have we encountered an error */
    const loading = useSelector(selectLoading)
    const errored = useSelector(selectError)

    /* State for controlling pagination */
    const [page, setPage] = useState(pagination.page)
    const [recsPage, setRecsPage] = useState(pagination.recsPerPage)

    /* State for Modal forms */
    /* remove ingredient State */
    const [showRemoveModal, setShowRemoveModal] = useState(false)
    /* edit ingredient state */
    const [showEditModal, setShowEditModal] = useState(false)
    /* found recipe modal state */
    const [showFoundRecipes, setShowFoundRecipes] = useState(false)
    /* Modal for adding a recipe to our cookbooks */
    const [showModalAdd, setShowModalAdd] = useState(false)
    /* State for working on the current record the user has selected, for removal etc */
    const [currentRecipe, setCurrentRecipe] = useState(null)

    /* State for controlling if the data is outdated ( dirty ) */
    const [isDirty, setIsDirty] = useState(false)

    /* State for setting id of ingredient to remove or update */
    const [id, setId] = useState()
    const [ingredientData, setIngredientData] = useState(JSON.stringify({}))

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

    /* Handler for changing how many records to display per
     * page 
    */
    const recsChangeHandler = async (e) => {
        setRecsPage(e.target.value)
        dispatch(setRecsPerPage(e.target.value))
    }

    /* Load the user pantry */
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getPantryIngredients({ 
                pantryId: parseInt(profileData.pantryId)
            }))

        }
        fetchData()
        setIsDirty(false)
    }, [page, recsPage, dispatch, isDirty])

    /* Get a full list of ingredients in the pantry */
    let fullPantryList = useList('pantry', false, profileData.pantryId)

    /* Handler for the forms submit function */
    const submit = async (event, form) => {
        event.preventDefault()
        await dispatch(setFilter(event.target[0].value))
        await dispatch(getPantryIngredients({ 
            pantryId: parseInt(profileData.pantryId)
        }))
        
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

    /* Handler for closing the found recipes window */
    const handleCloseFoundRecipesModal = () => {
        setShowFoundRecipes(false)
    }

    /* Handler for getting list of recipes based on the ingredients we have */
    const handleGetRecipes = (e) => {
        e.preventDefault()
        
        /* Extract out just the ingredient names we need */
        const ingredients = fullPantryList[0].ingredients
        const numIngredients = ingredients.length - 1
        
        /* Send the data to the search API */
        let terms = ''
        
        ingredients.forEach((ingredient, idx) => {
            if(idx !== numIngredients){
                terms += ingredient.name + ','
            } else {
                terms += ingredient.name
            }
            
        })
        
        dispatch(setSearchTerms(terms))
        dispatch(setSearchOptions('ingredients'))
        dispatch(performPantrySearch({
                ingredients: ingredients
        }))

        setShowFoundRecipes(true)

    }

    return (
        <div className="p-container flex flex-col">

            {/* Modals */}
            <Modal show={showRemoveModal} handleClose={handleCloseRemovalModal}>
                <PantryFormRemoval name="Remove Ingredient" modalShow={handleCloseRemovalModal} id={id} pantry={parseInt(profileData.pantryId)} handleIsDirty={setIsDirty} />
            </Modal>

            <Modal key={nanoid()} show={showEditModal} handleClose={handleCloseEditModal}>
                <PantryFormEdit key={nanoid()} ingredient={ingredientData} modalShow={handleCloseEditModal} handleIsDirty={setIsDirty} />
            </Modal>

            <Modal 
                key={nanoid()}
                show={showFoundRecipes}
                handleClose={handleCloseFoundRecipesModal} 
                iStyles={{
                    width: "75%"
                }}
            >
                <div 
                    aria-label="container for recipes we can make from pantry ingredients"
                    className="p-foundRecipes-container flex"
                >
                    <h3>I can make: </h3>
                    <RecipeList 
                    recipes={recipesFound} 
                    showModal={setShowModalAdd}
                    setRecipe={setCurrentRecipe}
                    navigateTo={navigate}
                    profile={profileData}
                    />
                </div>
            </Modal>

            <h3 className="p-head-2">{profileData.forename}'s Pantry</h3>
            <Form 
                bordered={false}
                initialValues={{
                findIngredient: ''
            }}
                
                onSubmit={submit}
                formClasses="pp-formContainer"
            >
                <FormInput 
                    name="findIngredient"
                    label="Find Ingredient"
                    containerClasses="pp-formInputContainer"
                    inputClasses="pp-formInput"
                    labelClasses="pp-formInputLabel"
                />
            </Form>

            <div aria-label="page actions container" className="pageActions flex">
                <button 
                    className="btn findBtn"
                    onClick={handleGetRecipes}
                >
                    Find Recipes
                </button>
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

            <div aria-label="ingredient list" className="pi-list">

                { ingredients?.length < 1 ? (
                    <div aria-label="nop records container" className="pp-norecords">
                        You currently have no ingredients in your Pantry
                    </div>
                ) : (

                    ingredients.map( ingredient => {

                        return (
                            <div key={nanoid()} aria-label="ingredient container" className="flex pi-ingredient">
                                
                                <img 
                                    src={ingredient?.images[0] ? ingredient.images[0].src : '/no_image.png'}
                                    alt={ingredient?.images[0] ? ingredient.images[0].alt : 'Picture dipicting no image for the ingredient'}
                                    title={ingredient?.images[0] ? ingredient.images[0].title : 'Picture dipicting no image for the ingredient'}
                                />
                                <div aria-label="ingredient details container" className="flex pi-detail-container">
                                   
                                   <div aria-label="pantry ingredient details" className="pi-details flex">
                                        
                                        <h3>{ingredient.name}</h3>
                                        <div>
                                            <div aria-label="pantry ingredient amount" className="pi-amount flex flex-row">
                                                <label>Amount:</label><p>{ingredient.amount}</p>
                                            </div>
                                            <div aria-label="pantry ingredient amount" className="pi-amount flex flex-row">
                                                <label>Amount Type:</label><p>{ingredient.amount_type}</p>
                                            </div>
                                        </div>
    
                                    </div>
    
                                    <div aria-label="pantry ingredient actions" className="pi-actions flex">
                                        <button 
                                            key={nanoid()}
                                            className="btn pi-remove" 
                                            value={ingredient.ingredientId}
                                            onClick={(event => {
                                                setId(event.target.value)
                                                setShowRemoveModal(true)
                                            })}
                                        >
                                            Remove
                                        </button>
                                        <button 
                                            key={nanoid()}
                                            className="btn pi-edit" 
                                            value={
                                                JSON.stringify({
                                                    pantry: parseInt(profileData.pantryId),
                                                    id: ingredient.id,
                                                    ingredientId: ingredient.ingredientId,
                                                    name: ingredient.name,
                                                    amount: ingredient.amount,
                                                    amountType: ingredient.amount_type
                                                })
                                            }
                                            onClick={(event => {
                                                setIngredientData(event.target.value)
                                                setShowEditModal(true)
                                            })}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })

                )}

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
        </div>
    )
}

export default Pantry