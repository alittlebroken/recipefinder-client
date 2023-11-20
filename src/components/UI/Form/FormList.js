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

    /* Extract a list of all ingredients */
    const ingredients = useList('ingredients')

    /* Add a new item to the list */
    const addToList = (e) => {
        e.preventDefault()

        setList([...list, { ingredient: "", amount: "", amountType: ""}])
        return false
    }

    /* Remove an element from the list */
    const removeFromList = (index, e) => {
        
        let listData = list
        listData.splice(index, 1)
        setList([...listData])
        
    }

    /* Handlers for the component */
    const handleChange = (index, e) => {

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
                                <div key={nanoid()} aria-label="container for ingredient in a list" className="FormList-ingredient-container">
                                    <select
                                        key={nanoid}
                                        id="ingredient"
                                        name="ingredient"
                                        className="FormList-Select"
                                        onChange={(index, e) => { handleChange(index, e) }}
                                    >
                                        {ingredients && ingredients.map(item => {
                                            return (
                                                <option key={nanoid()} value={item.id}>{item.name}</option>
                                            )
                                        })}
                                    </select>
                                    <input 
                                        key={nanoid()} 
                                        type="number" 
                                        id="amount" 
                                        name="amount" 
                                        value={item.amount || ""} 
                                        placeholder="Amount"
                                        className="FormList-Input"
                                        onChange={(index, e) => { handleChange(index, e) }}
                                    />
                                    <input 
                                        key={nanoid()} 
                                        type="number" 
                                        id="amountType" 
                                        name="amountType" 
                                        value={item.amountType || ""} 
                                        placeholder="Amount Type"
                                        className="FormList-Input"
                                        onChange={(index, e) => { handleChange(index, e) }}
                                    />
                                    <button
                                        key={nanoid()}
                                        id="removeIngredient"
                                        name="removeIngredient"
                                        type="button"
                                        className="btn add-button"
                                        onClick={(index, e) => { 
                                            removeFromList(index, e) 
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
                        Add
                    </button>
                
                </div>

        </>
    )

}

export default FormList