import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { nanoid } from "@reduxjs/toolkit"
import Pagination from "../../UI/Pagination/Pagination"
import authProvider from "../../../providers/authProvider"
import apiProvider from "../../../providers/apiProvider"
import Modal from "../../UI/Modal/Modal"

import './Ingredients.css'

import {
    getIngredients,
    selectIngredients,
    selectPage,
    selectPages,
    selectRecsPerPage,
    selectRecords,
    selectFilter,
    isLoading,
    hasError,
    applyFilter,
    clearFilter,
    pageUp,
    pageDown,
    setRecsPerPage,
    goToPage
} from '../../../slices/Ingredients/IngredientsSlice'
import AbstractModalHeader from "react-bootstrap/esm/AbstractModalHeader"

const Ingredients = () => {

    /* Alias the dispatch function  */
    const dispatch = useDispatch()

    /* Gather the data from the store for this component */
    
    /* Unfiltered ingredients to start with */
    const ingredients = useSelector(selectIngredients)

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

    /* State for controlling any Modal elements */
    const [showModal, setShowModal] = useState(false)
    const [showAddIngredient, setShowAddIngredient] = useState(false)

    /* State for the add Ingredient form */
    const [ingredientName, setIngredientName] = useState()
    const [ingredientId, setIngredientId] = useState()
    const [amount, setAmount] = useState()
    const [amountType, setAmountType] = useState()
    const [amountError, setAmountError] = useState()
    const [amountTypeError, setAmountTypeError] = useState()
    const [addFormOk, setAddFormOk] = useState(true)
    const [formUpdate, setFormUpdate] = useState()
    const [formUpdateError, setFormUpdateError] = useState()

    /* What filter has been used */
    const filter = useSelector(selectFilter)

    /* Are we still loading data or have we encountered an error */
    const loading = useSelector(isLoading)
    const errored = useSelector(hasError)

    /* Setup state for the component */
    const [terms, setFilter] = useState('')

    /* Setup up handlers for form submission */
    const handleSubmit = (e) => {
        e.preventDefault()

        /* Set the store filter */
        dispatch(applyFilter(terms))

        /* Get a new set of ingredients that have been filtered */
        dispatch(getIngredients({
            pagination: {
                page: pagination.page,
                perPage: pagination.recsPerPage
            },
            payload: {
                terms: terms
            }
        }))

    }

    const handleSubmitAddIngredient = async (e) => {
        e.preventDefault()

        /* Perform validation on the inputs */
        if(!parseInt(amount) || parseInt(amount) === undefined || typeof parseInt(amount) !== 'number' || parseInt(amount) < 1){
            setAmountError('You must provide a valid number for amount that is greater than zero')
            setAddFormOk(false)
        }

        if(!amountType || amountType === undefined || typeof amountType !== 'string' || amountType.length < 1){
            setAmountTypeError('You must provide a valid amount type of at least 1 character')
            setAddFormOk(false)
        }

        /* If the form has passed validation then lets try and add the data in the form */
        if(addFormOk){

            /* Get details from the auth API for the logged in user */
            const { data } = await authProvider.getProfile()
            
            /* Generate the params to send along with the request to the API */
            const params = {
                auth: {
                    authenticate: true,   
                },
                payload: {
                    userId: data.id,
                    pantryId: data.pantryId,
                    ingredientId: e.target[0].value,
                    amount: e.target[2].value,
                    amount_type: e.target[3].value
                }
            }
            
            /* Send the request to the API  */
            apiProvider.create('pantries', params)
            .then((result) => {
                if(result.status === 201){
                    setFormUpdate('Ingredient successfully added to your pantry')
                    return
                }
            })
            .catch((error) => {
                setFormUpdateError('Unable to add the ingredient to your pantry, please try again in a little while')
                return
            })

        } 

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

    /* Handler for changing how many records to display per
     * page 
    */
    const recsChangeHandler = async (e) => {
        setRecsPage(e.target.value)
        dispatch(setRecsPerPage(e.target.value))
    }

    /* Add an ingredient to our pantry */
    const handleAddIngredient = async (e) => {
        e.preventDefault()
        
        if(!authProvider.loggedIn()){
            setShowModal(true);
            return
        }

        /* users Id */
        //const { id, pantryId } = await authProvider.getProfile().data

        /* Show the Modal form for adding an Ingredient */
        setShowAddIngredient(true)

        /* Assign the various ingredient details for the add ingredient form */
        setIngredientId(e.target.dataset.id)
        setIngredientName(e.target.dataset.name)

    }

    /* Load data when the component mounts */
    useEffect(() => {
        dispatch(getIngredients({
            payload: {
                terms: terms
            }
        }))
    }, [page, recsPage])
    
    /* Header for the list of results found/not found */
    const listHeader = terms ? `Filtering by the term: ${terms}` : null

    /* Render the compnent */
    return (
        <div aria-label="ig-contain" className="ig-contain flex flex-col">
            
            <Modal show={showModal} handleClose={() => {
                setShowModal(false)
                }}>
                'You must be logged in to add an Ingredient to your pantry'
            </Modal>

            <Modal show={showAddIngredient} handleClose={() => {
                setShowAddIngredient(false)
                setAmountError(null)
                setAmountTypeError(null)
                setFormUpdate(null)
                setFormUpdateError(null)
            }}>

                <form onSubmit={handleSubmitAddIngredient} className="ig-add-form flex flex-col">

                    <h4 className="ig-add-heading">Add to pantry</h4>

                    <label htmlFor="ingredient-name">Ingredient:</label>

                    <input type="hidden" name="ingredient-id" value={ingredientId} />
                    
                    <input 
                        type="text" 
                        name="ingredient-name" 
                        value={ingredientName} disabled />

                    <label htmlFor="amount">Amount:</label>
                    <input 
                        type="number" 
                        name="amount" 
                        id="amount" 
                        onChange={(e) => { 
                            setAmount(e.target.value)
                            setAmountError(null)
                        }}
                    />
                    {amountError && (<p className="ig-add-error">{amountError}</p>)}
                    
                    <label htmlFor="amount-type">Amount Type:</label>
                    <input 
                        type="text" 
                        name="amount-type" 
                        onChange={(e) => { 
                            setAmountType(e.target.value)
                            setAmountTypeError(null) 
                        }}
                        value={amountType}
                    />
                    {amountTypeError && (<p className="ig-add-error">{amountTypeError}</p>)}

                    <button 
                        type="submit" 
                        className="btn ig-add-btn">
                            Add to Pantry
                    </button>

                    {formUpdate && (<p className="ig-add-ok">{formUpdate}</p>)}
                    {formUpdateError && (<p className="ig-add-error">{formUpdateError}</p>)}

                </form>
            </Modal>

            <h2 className="ig-head-2">Ingredients</h2>
            <form id="filterIngredients" onSubmit={handleSubmit} className="flex flex-row ig-filter">
                <input 
                    type="search" 
                    name="filter" 
                    value={terms} 
                    onChange={(e) => {
                        setFilter(e.target.value)
                    }} 
                    placeholder="Ingredient Name"
                    className="ig-input" 
                />
                
                <button type="submit" className="ig-button btn" name="filter-button">Filter</button>
            </form>
            <div aria-label="list container" className="list-container flex flex-col">
                    <Pagination 
                        totalRecords={pagination.records}
                        recsPerPage={pagination.recsPerPage}
                        totalPages={pagination.pages}
                        currentPage={pagination.page}
                        handlePageChange={pageChangeHandler}
                        handleRecsChange={recsChangeHandler}
                        minified
                    />
                    {listHeader && <h3 className="ig-head-3">{listHeader}</h3>}
                    <div aria-label="ig-list" className="ig-list flex flex-col">
                    {ingredients.length === 0 ? (
                            <h4 className="ig-nomatch">No ingredients found matching the term {terms}</h4>
                        ) : 
                        
                        ingredients.map(ingredient => {
                            return (
                                <div 
                                    key={nanoid()} 
                                    aria-label="ingredient-container" 
                                    className="ig-container"
                                >
                                    <img 
                                        src={ingredient.src ? ingredient.src : '/no_image.png'} 
                                        alt={ingredient.alt} 
                                        title={ingredient.title} 
                                        className="ig-container-image"
                                    />
                                    <div aria-label="ingredient name" className="ig-container-text">
                                        {ingredient.name}
                                    </div>
                                    {authProvider.loggedIn() && <button 
                                     className="btn ig-container-btn"
                                     onClick={handleAddIngredient}
                                     value={ingredient.id}
                                     data-id={ingredient.id}
                                     data-name={ingredient.name}
                                     data-image={ingredient.src}
                                     >
                                        +
                                    </button>}
                                </div>
                            )
                        })
            
                    }
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
        </div>
    )

}

export default Ingredients