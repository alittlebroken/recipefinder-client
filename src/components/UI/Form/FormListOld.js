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


const FormListOld = (props) => {

    /* Destructure the required pass in props */
    const {
        title
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

    /* Extract a list of all ingredients */
    const ingredients = useList('ingredients')

    /* Add a new item to the list */
    const addToList = (e) => {
        e.preventDefault()

        setList([...list, { ingredient: "", amount: "", amountType: ""}])
    }

    /* Remove an element from the list */
    const removeFromList = (e, index) => {
        e.preventDefault()
        let listData = list
        listData.splice(index, 1)
        setList([...listData])
    }

    /* Handlers for the component */
    const handleChange = (e, index) => {
        e.preventDefault()
        let listData = list
        listData[index][e.target.name] = e.target.value
        setList([...listData])
    }

    return(
        <>
                <h3 className="add-recipe-head-3">{title}</h3>
                
                <div aria-label="List of form elements" className="FormList flex">
                    {list && (
                        list.map((item, idx) => {
                            return (
                                <div 
                                    aria-label="container for ingredient in a list" 
                                    className="FormListIngredient flex">
                                    <select
                                        key={idx + 1}
                                        id="ingredient"
                                        name="ingredient"
                                        className="FormListItem FormListSelect"
                                        onChange={(e) => { handleChange(e, idx) }}
                                        value={list[idx]["ingredient"]}
                                    >
                                        {ingredients && ingredients.map(item => {
                                            return (
                                                <option key={nanoid()} value={item.name}>{item.name}</option>
                                            )
                                        })}
                                    </select>
                                    <input 
                                        key={idx + 2} 
                                        type="number" 
                                        id="amount" 
                                        name="amount" 
                                        value={item.amount || ""} 
                                        placeholder="Amount"
                                        className="FormListItem FormListAmount"
                                        onChange={(e) => { handleChange(e, idx) }}
                                    />
                                    <input 
                                        key={idx + 3} 
                                        type="text" 
                                        id="amountType" 
                                        name="amountType" 
                                        value={item.amountType || ""} 
                                        placeholder="Amount Type"
                                        className="FormListItem FormListAmountType"
                                        onChange={(e) => { handleChange(e, idx) }}
                                    />
                                    <button
                                        key={idx + 4}
                                        id="removeIngredient"
                                        name="removeIngredient"
                                        type="button"
                                        className="btn FormListButton"
                                        onClick={(e) => { 
                                            removeFromList(e, idx) 
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
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
                    onClick={addToList}
                    >
                        Add row
                    </button>
                
                </div>

        </>
    )

}

export default FormListOld