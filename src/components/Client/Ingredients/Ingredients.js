import { useState } from "react"

import './Ingredients.css'

const Ingredients = () => {

    /* Setup state for the component */
    const [terms, setFilter] = useState('')

    /* Store the results of ingredients from the API */
    let results

    /* Setup up handlers for form submission */
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    
    /* Header for the list of results found/not found */
    const listHeader = terms ? `Filtering by the term: ${terms}` : null

    /* Render the compnent */
    return (
        <div aria-label="ig-container flex flex-col">
            <form id="filterIngredients" onSubmit={handleSubmit} className="flex flex-row ig-filter">
                <input 
                    type="search" 
                    name="filter" 
                    value={terms} 
                    onChange={(e) => {
                        setFilter(e.target.value)
                    }} 
                    className="ig-input" 
                />
                
                <button type="submit" className="ig-button">Filter</button>
            </form>
            <div aria-label="list container" className="list-container flex flex-row">
                    {listHeader && <h3 className="ig-head-3">listHeader</h3>}
                    {results && (
                        results.forEach((result) => {
                            <div aria-label="ingredient-container" className="ig-container">
                                {result}
                            </div>
                        })
                    )}
            </div>
        </div>
    )

}

export default Ingredients