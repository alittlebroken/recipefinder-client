import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { nanoid } from "@reduxjs/toolkit"
import Pagination from "../../UI/Pagination/Pagination"

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
                
                <button type="submit" className="ig-button btn">Filter</button>
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
                                    <div className="ig-container-text">
                                        {ingredient.name}
                                    </div>
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