import { useState } from "react"
import './PantryRemoveIngredient.css'
import apiProvider from "../../../providers/apiProvider"

const PantryFormRemoval = (props) => {

    /* Destructure the passed in props */
    const {
        id,
        pantry,
        name,
        modalShow,
        handleIsDirty
    } = props

    /* Handles when the user submits the form */
    const handleSubmit = (event) => {
        event.preventDefault()
    } 

    /* Handles what happenes when a user clicks a button in the form */
    const handleClick = async (event) => {
        event.preventDefault()
        
        /* Determine which button was clicked on */
        if(event.target.value === "cancel"){
            /* execute the modals close window function */
            modalShow()
        } else if (event.target.value === "remove"){

            /* Remove the ingredient */
            /* Setup the params to send to the API */
            const params = {
                id: parseInt(pantry),
                ingredientId: parseInt(id),
                auth: {
                    authenticate: true
                }
            }

            /* Send the request */
            const res = await apiProvider.removeOne('pantries', params)
            
            if(res.status === 200){
                handleIsDirty(true)
            }
            
            modalShow()
        }
    }

    return (
        <form id="form-remove" onSubmit={handleSubmit} className="flex form-container">
            <h3>{name}</h3>
            <p>Are you sure you wish to remove this ingredient?</p>
            <div aria-label="action buttons container" className="flex flex-row action-container">
                <button 
                    id="remove" 
                    value="remove" 
                    className="btn btn-action"
                    onClick={handleClick}
                >
                    Remove
                </button>
                <button 
                    id="cancel" 
                    value="cancel" 
                    className="btn btn-action"
                    onClick={handleClick}
                >
                    Cancel
                </button>
            </div>
        </form>
    )

}

export default PantryFormRemoval