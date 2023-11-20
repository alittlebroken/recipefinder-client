import { useContext } from "react"
import { FormContext } from "./Form"
import { useState } from "react"

import { 
    min, 
    max, 
    minLength, 
    maxLength,
    isNumber
} from '../../../providers/validationProvider'

import './FormInput.css'

const FormInput = (props) => {

    /* Destructure the required pass in props */
    const {
        name,
        label,
        type = 'text',
        validators = [],
    } = props

    /* Get the form context to access the values needed */
    const formContext = useContext(FormContext)
    const { form, handleFormChange, setDirty } = formContext

    /* Store the result of validation, by default set the form to be validated and allow the validation
       steps to set if validation failed or not
    */
    const [validated, setValidated] = useState(true)

    /* State to hold any validation messages */
    const [validationMessage, setValidationMessage] = useState([])

    /* const handle validation */
    const handleValidation = (e) => {

        /* By Default set the form to clean and only set it dirty if validation fails */
        setDirty(false)

       /* Only perform validation if we have validators to apply */
       if(validators?.length >= 1){

            /* Loop through each Validator and apply them */
            validators.forEach( validator => {

                /* Contains the result of the validation */
                let result

                switch(validator.type){
                    case "minLength":
                        result = minLength(validator.value, e)
                        
                        /* Check the validation methods return type. If it's a boolean 
                        then it has passed the check, otherwise it is a string and this
                        means the validation failed for some reason */

                        if(typeof result !== 'boolean'){
                            setValidationMessage(result)
                            setValidated(false)
                            setDirty(true)
                        } else {
                            setValidationMessage(null)
                        }                   
                        break;
                    case "maxLength":
                        result = maxLength(validator.value, e)
                        
                        /* Check the validation methods return type. If it's a boolean 
                        then it has passed the check, otherwise it is a string and this
                        means the validation failed for some reason */

                        if(typeof result !== 'boolean'){
                            setValidationMessage(result)
                            setValidated(false)
                            setDirty(true)
                        } else {
                            setValidationMessage(null)
                        }                        
                        break;
                    case "minValue":
                        result = min(validator.value, e)
                        
                        /* Check the validation methods return type. If it's a boolean 
                        then it has passed the check, otherwise it is a string and this
                        means the validation failed for some reason */

                        if(typeof result !== 'boolean'){
                            setValidationMessage(result)
                            setValidated(false)
                            setDirty(true)
                        } else {
                            setValidationMessage(null)
                        }                      
                        break;
                    case "maxValue":
                        result = max(validator.value, e)
                        
                        /* Check the validation methods return type. If it's a boolean 
                        then it has passed the check, otherwise it is a string and this
                        means the validation failed for some reason */

                        if(typeof result !== 'boolean'){
                            setValidationMessage(result)
                            setValidated(false)
                            setDirty(true)
                        } else {
                            setValidationMessage(null)
                        }                        
                        break;
                    case "isNumber":
                        const result = isNumber(e)

                        /* Check the validation methods return type. If it's a boolean 
                        then it has passed the check, otherwise it is a string and this
                        means the validation failed for some reason */

                        if(typeof result !== 'boolean'){
                            setValidationMessage(result)
                            setValidated(false)
                            setDirty(true)
                        } else {
                            setValidationMessage(null)
                        }                        
                        break;

                    default:

                }

            })


       }

    }

    return(
        <>
            <div aria-label="input container" className="FormInputContainer">
                {label && (<label htmlFor={name} className="FormLabel">{label}:</label>) }
                <input 
                    id={name}
                    name={name}
                    type={type}
                    value={form[name]}
                    onChange={handleFormChange}
                    onBlur={(e) => handleValidation(e)}
                    className="FormInput"
                />
                {validated === false ? (
                    <div aria-label="Form input noticiation container" className="FormNotificationContainer">{validationMessage}</div>
                ) : null}
            </div>
        </>
    )

}

export default FormInput