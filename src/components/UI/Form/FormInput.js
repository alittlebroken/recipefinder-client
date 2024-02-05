import { useContext } from "react"
import { FormContext } from "./Form"
import { useState } from "react"

import { 
    min, 
    max, 
    minLength, 
    maxLength,
    isNumber,
    isString
} from '../../../providers/validationProvider'

import './FormInput.css'
import apiProvider from "../../../providers/apiProvider"

const FormInput = (props) => {

    /* Destructure the required pass in props */
    const {
        name,
        label,
        type = 'text',
        validators = [],
        containerClasses = null,
        labelClasses = null,
        inputClasses = null
    } = props

    /* Setup the styles to apply to the Input, apply the defaults first */
    const containerClass = "FormInputContainer " + containerClasses
    const labelClass = "FormLabel " + labelClasses
    const inputClass = "FormInput " + inputClasses

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
    const handleValidation = async (e) => {

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
                        result = isNumber(e)

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
                    case "isString":
                        result = isString(e)

                        /* Check the validation methods return type. If it's a boolean 
                        then it has passed the check, otherwise it is not a string and this
                        means the validation failed for some reason */

                        if(typeof result !== 'boolean'){
                            setValidationMessage(result)
                            setValidated(false)
                            setDirty(true)
                        } else {
                            setValidationMessage(null)
                        }                        
                        break;
                    case "isDuplicate":
                        
                        /* create a wrapper to allow us to use async/await on the API call */
                        const getDuplicates = async () => {
                            let res = await apiProvider.doIExist({
                                
                                    payload: {
                                        resource: validator.resource,
                                    },
                                    filter: {
                                        name: e.target.value
                                    }
                                
                            })
                            
                            return res
                        }

                        // Assign the result from checking for duplicates and check the return value
                        getDuplicates()
                        .then(res => {
                        
                            if(res){
                                setValidationMessage(`You must supply a unique value for this input.`)
                                setValidated(false)
                                setDirty(true)
                            } else {
                                setValidationMessage(null)
                            }                  

                        })
                              
                        break;

                    default:

                }

            })


       }

    }

    return(
        <>
            <div aria-label="input container" className={containerClass}>
                {label && (<label htmlFor={name} className={labelClass}>{label}:</label>) }
                <input 
                    id={name}
                    name={name}
                    type={type}
                    value={form[name]}
                    onChange={handleFormChange}
                    onBlur={(e) => handleValidation(e)}
                    className={inputClass}
                />
                {validated === false ? (
                    <div aria-label="Form input noticiation container" className="FormNotificationContainer">{validationMessage}</div>
                ) : null}
            </div>
        </>
    )

}

export default FormInput