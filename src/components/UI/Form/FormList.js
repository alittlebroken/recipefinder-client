import { useContext } from "react"
import { FormContext } from "./Form"
import { useState } from "react"
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
        children,
        initialValues,
        title,
        name
    } = props

    /* Get the form context to access the values needed */
    const formContext = useContext(FormContext)
    const { form, handleFormChange, setDirty } = formContext

    /* Set state for a list of ingredients */
    const [list, setList] = useState([])
    const [inputs, setInputs] = useState(initialValues)
    const [listDirty, setListDirty] = useState(false)

    /* Handlers for the component */
    const handleChange = (e) => {

        setListDirty(true)

        /* Destructure the event we will be processing */
        const { name, value, type, files } = e.target;

        /* Check the type of input currently that has changed on the form */
        let inputValue
        if(type === "file"){
            inputValue = files
        } else {
            inputValue = value
        }

        /* Update the appropriate list Input */
        setInputs({
            ...inputs,
            [name]: inputValue,
            setDirty: listDirty
        })

    }

    const handleAddToList = (e) => {
        e.preventDefault()
        setList([
            ...list,
            inputs
        ])

        console.log(list)
    }

    return(
        <>
            <h3 className="add-recipe-head-3">{title}</h3>
            
            <div aria-label="selected ingredients" className="FormList-">
                {list && (
                    list.map(listItem => {
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

                   {children}

                   <button 
                    type="submit" 
                    name="addIngredient" 
                    className="btn add-button"
                    onClick={handleAddToList}
                    >
                        Add
                    </button>
                
                </div>



        </>
    )

}

export default FormList