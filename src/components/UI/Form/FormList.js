import { useContext } from "react"
import { FormContext } from "./Form"
import { useState } from "react"
import { useList } from '../../../hooks/useList'
import { nanoid } from "@reduxjs/toolkit"

import { 
    min, 
    max, 
    minLength, 
    maxLength,
    isNumber
} from '../../../providers/validationProvider'

import './FormList.css'


const FormList = (props) => {

    /* Destructure the required pass in props */
    const {
        title,
        name
    } = props

    /* Get the form context to access the values needed */
    const formContext = useContext(FormContext)
    const { form, handleFormChange, setDirty } = formContext

    /* Set state for a list of ingredients */
    const [list, setList] = useState([{
        ingredient: "",
        amount: 0,
        amountType: ""
    }])

    /* Add a new item to the list */
    const AddToList = (e) => {
        e.preventDefault()

        setList([...list, { ingredient: "", amount: "", amountType: ""}])

    }

    /* Remove an element from the list */
    const removeFromList = (index, e) => {
        e.preventDefault()
        
        let listData = list
        listData.splice(index, 1)
        setList([...listData])

    }

    /* Handlers for the component */
    const handleChange = (index, e) => {
        e.preventDefault()

        let listData = list
        listData[index][e.target.name] = e.target.value
        setList([...listData])
    }

    return(
        <>
                <h3 className="add-recipe-head-3">{title}</h3>
                
                <div aria-label="selected ingredients" className="FormList-">
                    {list && (
                        list.map((item, index) => {
                            return (
                                <></>
                            )
                        })
                    )}
                </div>

                <div 
                    aria-label="add new recipe ingredient container" 
                    className="add-recipe-ingredient-container flex"
                >


                 <button 
                    type="submit" 
                    name="addIngredient" 
                    className="btn add-button"
                    onClick={null}
                    >
                        Add
                    </button>
                
                </div>

        </>
    )

}

export default FormList