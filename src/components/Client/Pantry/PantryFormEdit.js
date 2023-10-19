import { useState } from "react"
import './PantryEditIngredient.css'
import apiProvider from "../../../providers/apiProvider"

const PantryFormEdit = (props) => {

    /* Destructure the props */
    const {
        ingredientId,
        pantryId,
        closeModal
    } = props

    /* Hold state for the forms inputs */
    const [amount, setAmount] = useState()
    const [amountError, setAmountError] = useState()
    const [amountType, setAmountType] = useState()
    const [amountTypeError, setAmountTypeError] = useState()
    const [formOK, setFormOK] = useState(true)

    /* handle the change for amount */
    const handleAmount = (e) => {
        setAmount(e.target.value)
    }

    /* handle the chnage for amountType */
    const handleAmountType = (e) => {
        setAmountType(e.target.value)
    }

    /* Handle the submission of the form */
    const handleSubmit = async (e) => {
        e.preventDefault()

        /* Validate the form fields */
        if(!amount || amount === undefined || parseInt(amount) < 1){
            setAmountError('You must specify a valid amount of 1 or greater')
            setFormOK(false)
        }

        if(!amountType || amountType === undefined || amountType === '' || amountType.length > 2){
            setAmountTypeError('You must supply a valid amount type of at least 2 characters')
            setFormOK(false)
        }

        if(formOK){
            /* Build the params to send to the API */
            const params = {
                pantryId,
                ingredientId,
                amount,
                amountType
            }

            /* Send the request to the API and check it succeded */
            const result = await apiProvider.update('pantries', params)

            if(result.status === 200){
                setAmountError(null)
                setAmountTypeError(null)
                closeModal(false)
            } 
        }

    }

    return (
        <form onSubmit={handleSubmit} className="flex editForm">
            <label htmlFor="amount" className="editFormLabel" >Amount:</label>
            <input 
                type="number" 
                name="amount" 
                className="editFormInput" 
                onChange={handleAmount}
            />
            <label htmlFor="amountType" className="editFormLabel" >Amount Type:</label>
            <input 
                type="text" 
                name="amountType" 
                className="editFormInput" 
                onChange={handleAmountType}
            />
            <div aria-label="action button container" className="editFormActions">
                <button type="submit" name="submit" className="btn editFormButton">Submit</button>
            </div>
        </form>
    )
} 

export default PantryFormEdit