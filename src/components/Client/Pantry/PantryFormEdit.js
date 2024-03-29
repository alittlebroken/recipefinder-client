import { useState } from "react"
import './PantryEditIngredient.css'
import apiProvider from "../../../providers/apiProvider"

const PantryFormEdit = (props) => {

    /* Destructure the props */
    const ingredient = JSON.parse(props.ingredient)
    const closeModal = props.modalShow
    const setIsDirty = props.handleIsDirty

    /* Hold state for the component */
    const [amount, setAmount] = useState(ingredient?.amount || '')
    const [amountType, setAmountType] = useState(ingredient.amountType || '')
    const [amountError, setAmountError] = useState()
    const [amountTypeError, setAmountTypeError] = useState()
    const [formOK, setFormOK] = useState(true)


    /* Handle the submission of the form */
    const handleSubmit = async (e) => {
        e.preventDefault()

        /* extarct out from the form the values we need */
        const id = e.target[0].value
        const ingredientId = e.target[1].value
        const pantryId = e.target[2].value

        /* Validate the form fields */
        if(!amount || amount === undefined || parseInt(amount) < 1){
            setAmountError('You must specify a valid amount of 1 or greater')
            setFormOK(false)
        }

        if(!amountType || amountType === undefined || amountType === '' || amountType.length < 2){
            setAmountTypeError('You must supply a valid amount type of at least 2 characters')
            setFormOK(false)
        }

        if(formOK){
            /* Build the params to send to the API */
            const params = {
                auth: {
                    authenticate: true
                },
                id: pantryId,
                payload: {
                    ingredients: [
                        {
                            id,
                            ingredientId,
                            pantryId,
                            amount,
                            amount_type: amountType
                        }
                    ]
                }, 
            }

            /* Send the request to the API and check it succeded */
            const result = await apiProvider.update('pantries', params)
            
            if(result.status === 200){
                setAmountError(null)
                setAmountTypeError(null)
                setIsDirty(true)
                closeModal(false)
            } 
        }

    }

    return (
        <form onSubmit={handleSubmit} className="flex editForm">
            <input type="hidden" name="id" value={ingredient.id} />
            <input type="hidden" name="ingredientId" value={ingredient.ingredientId} />
            <input type="hidden" name="pantry" value={ingredient.pantry} />
            <h3>Editing {ingredient.name}</h3>
            <label htmlFor="amount" className="editFormLabel" >Amount:</label>
            <input 
                type="number" 
                name="amount" 
                className="editFormInput" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <label htmlFor="amountType" className="editFormLabel" >Amount Type:</label>
            <input 
                type="text" 
                name="amountType" 
                className="editFormInput" 
                value={amountType}
                onChange={(e) => setAmountType(e.target.value)}
            />
            <div aria-label="action button container" className="editFormActions">
                <button type="submit" name="submit" className="btn editFormButton">Submit</button>
            </div>
        </form>
    )
} 

export default PantryFormEdit