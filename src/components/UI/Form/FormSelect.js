import { useContext } from "react"
import { FormContext } from "./Form"
import { useState } from "react"
import { FormListContext } from './FormList'

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
        inList = false
    } = props

    /* Get the form context to access the values needed */
    const formContext = useContext(FormContext)
    const { form, handleFormChange, setDirty } = formContext

    /* Get a list context in vase we need to use it */
    const formListContext = useContext(FormListContext)
    const { list, handleListItemChange, setListDirty } = formListContext

    return (
        <div aria-label="select container" className="FormSelectContainer">

            {label && (<label htmlFor={name} className="FormLabel">{label}:</label>) }
            <select 
                id={name}
                name={name}
                onChange={inList ? handleListItemChange : handleFormChange}
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