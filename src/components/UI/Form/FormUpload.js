import { useContext } from "react"
import { FormContext } from "./Form"

import './FormInput.css'

const FormInput = (props) => {

    /* Destructure the required pass in props */
    const {
        name,
        label,
        type = 'text'
    } = props

    /* Get the form context to access the values needed */
    const formContext = useContext(FormContext)
    const { form, handleFormChange } = formContext

    return(
        <>
            <div aria-label="input container" className="FormInputContainer">
                <label htmlFor={name} className="FormLabel">{label}:</label>
                <input 
                    name={name}
                    type={type}
                    value={form[name]}
                    onChange={handleFormChange}
                    className="FormInput"
                />
            </div>
        </>
    )

}

export default FormInput