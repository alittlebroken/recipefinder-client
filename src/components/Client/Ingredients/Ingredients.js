import { useState } from "react"

import './Ingredients.css'

const Ingredients = () => {

    /* Setup state for the component */
    const [terms, setFilter] = useState('')

    /* Setup up handlers for form submission */
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    
    /* Render the compnent */
    return (
        <div aria-label="ig-container flex flex-col">
            <form id="filterIngredients" onSubmit={handleSubmit} className="flex flex-row ig-filter">

            </form>
            <div aria-label="list-container" className="list-container flex flex-row">

            </div>
        </div>
    )

}

export default Ingredients