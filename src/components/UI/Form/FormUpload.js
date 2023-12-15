import { useContext, useState } from "react"
import { FormContext } from "./Form"

import { 
    min, 
    max, 
    minLength, 
    maxLength,
    required,
    allowedFileTypes,
    maxFileSize
} from '../../../providers/validationProvider'

import './FormUpload.css'

const FormUpload = (props) => {

    /* Destructure the required pass in props */
    const {
        name,
        label,
        type="file",
        acceptType,
        multiple=false,
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

        /* Contains the result of the validation */
        let result

        /* Loop through each Validator and apply them */
        validators.forEach( validator => {

            switch(validator.type){
                case "required":
                    result = required(e)

                    /* Check the validation methids return type. If it's a boolean 
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
                case "fileType":
                    result = allowedFileTypes(e, validator.value)

                    /* Check the validation methids return type. If it's a boolean 
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
                    case "maxFileSize":
                        result = maxFileSize(e, validator.value)

                        /* Check the validation methids return type. If it's a boolean 
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

    return(
        <>
            <div aria-label="upload container" className="FormUploadContainer">
                <label htmlFor={name} className="FormLabel">{label}:</label>
                <input 
                    id={name}
                    name={name}
                    type={type}
                    accept={acceptType}
                    multiple={multiple}
                    onChange={handleFormChange}
                    onBlur={(e) => handleValidation(e)}
                    className="FormUpload"
                />
                {validated === false ? (
                    <div aria-label="Form input noticiation container" className="FormNotificationContainer">{validationMessage}</div>
                ) : null}
            </div>
        </>
    )

}

export default FormUpload