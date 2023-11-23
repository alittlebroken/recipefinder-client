import { useContext } from "react"
import { FormContext } from "./Form"
import { useState } from "react"
import { nanoid } from "@reduxjs/toolkit"
import { useList } from '../../../hooks/useList'

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
        name,
        inputData,
        inputOptions
    } = props

    //console.log('Options Sent via Props: ', options)

    /* Get the form context to access the values needed */
    const formContext = useContext(FormContext)
    const { form, handleFormChange, setDirty } = formContext
    
    let initialData = JSON.parse(JSON.stringify(inputData))
    let newData = JSON.parse(JSON.stringify(inputData))
    const [list, setList] = useState([initialData])


    /* Add a new item to the list */
    const addToList = (e) => {
        e.preventDefault()
        
        const newList = [...list]
        setList([...newList, newData])
 
    }

    /* Set state for loading different options for select elements */
    let multiOptions = Array.isArray(inputOptions) ? true : false
    const options = useList(inputOptions, multiOptions)

    /* Render a new element */
    const renderNewElement = (element, index, id) => {

        /* First we determine that we have a valid element, then we
           determine the type of element we need to render and then 
           we just return it */
           
        if(element){
            if(element.type !== "select"){
                
                return <input 
                    key={id}
                    id={element.name}
                    type={element.type}
                    name={element.name}
                    value={element.value}
                    className="FormListItem FormListInput"
                    placeholder={element.placeholder}
                    onChange={(e) => { handleChange(e, index) }}
                />
            } else if (element.type === "select"){

                return <select
                    key={id}
                    id={element.name}
                    name={element.name}
                    className="FormListItem FormListSelect"
                    value={element.value}
                    onChange={(e) => { handleChange(e, index) }}
                >
                   {options && options[element.name].map(option => {
                    return <option value={option.id}>{option.name}</option>
                   })} 
                </select>
            }
        }

    }

    /* Renders a block of elements */
    const renderElementBlock = (item, itemIndex, elements, elementsLength) => {
        return (
            <div 
                aria-label="container for ingredient in a list" 
                className="FormListIngredient flex">
                
                {elements.map( (element, index) => {
                    return ( 
                                            
                        renderNewElement(item[element], itemIndex, (itemIndex * elementsLength) + (index + 1))
                                            
                    )        
                })}
                <button
                    key={itemIndex + 4}
                    id="removeIngredient"
                    name="removeIngredient"
                    type="button"
                    className="btn FormListButton"
                    onClick={(e) => { 
                        removeFromList(e, itemIndex) 
                    }}
                >
                    Remove
                </button>
            </div>
        )
    }

    /* Remove an element from the list */
    const removeFromList = async (e, index) => {
        e.preventDefault()
        
        let listData = list
        listData.splice(index, 1)
        await setList([...listData])
        
    }

    /* Handlers for the component */
    const handleChange = (e, index) => {
        e.preventDefault()
        let listData = list
        listData[index][e.target.name].value = e.target.value
        setList([...listData])
    }


    return(
        <>
                <h3 className="add-recipe-head-3">{title}</h3>
                
                <div aria-label="List of form elements" className="FormList flex">
                    
                        {list && 
                            list.map((item, idx) => {
                                /* Now we need to loop through the item from the list and 
                                   extract out the object keys. Each  key then has an object associated
                                   with it which contains the details we need and so we need to create 
                                   a new element for each one.
                                */
                                   let elementKeys = Object.keys(item)
                                   return renderElementBlock(item, idx, elementKeys, elementKeys?.length)
                            })
                        }
                    
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

FormList.Input = props => {

    /* Destructure the props */
    const {
        name,
        type,
        placheolder = "",
        index,
        handleChange,
        value
    } = props

    return (
        <input 
            key={index}
            id={name}
            name={name}
            type={type || "text"}
            value={value || ""}
            className="FormListInput"
            onChange={(e) => handleChange(e, index) }
        />
    )

}

export default FormList