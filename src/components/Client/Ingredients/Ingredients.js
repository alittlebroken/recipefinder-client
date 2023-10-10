import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { nanoid } from "@reduxjs/toolkit"

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
        resPerPage: useSelector(selectRecsPerPage),
        records: useSelector(selectRecords)
    }

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

    /* Load data when the component mounts */
    useEffect(() => {
        dispatch(getIngredients({
            payload: {
                terms: terms
            }
        }))
    }, [])
    
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
            </div>
        </div>
    )

}

export default Ingredients