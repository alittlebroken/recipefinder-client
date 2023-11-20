import { useContext } from "react"
import { FormContext } from "./Form"
import { useState } from "react"

import './FormSelect.css'

const FormSelect = props => {

    /* Extract the props */
    const {
        name,
        label,
        items,
        optionDisplay,
        optionValue,
        defaultSelected,
        listHandler = null
    } = props

    /* Get the form context to access the values needed */
    const formContext = useContext(FormContext)
    const { form, handleFormChange, setDirty } = formContext

    return (
        <div aria-label="select container" className="FormSelectContainer">

            <label htmlFor={name} className="FormLabel">{label}:</label>
            <select 
                id={name}
                name={name}
                onChange={handleFormChange}
            >
                {items && items.map(item => {
                    return (
                        <option value={item[optionValue]}>{item[optionDisplay]}</option>
                    )
                })}
            </select>
        </div>
    )

}

export default FormSelect