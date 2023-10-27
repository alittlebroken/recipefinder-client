import { useContext } from "react"
import { FormContext } from "./Form"

import './FormUpload.css'

const FormUpload = (props) => {

    /* Destructure the required pass in props */
    const {
        name,
        label,
        type="file",
        acceptType,
        multiple=false
    } = props

    /* Get the form context to access the values needed */
    const formContext = useContext(FormContext)
    const { form, handleFormChange } = formContext

    return(
        <>
            <div aria-label="upload container" className="FormUploadContainer">
                <label htmlFor={name} className="FormLabel">{label}:</label>
                <input 
                    id={name}
                    name={name}
                    type={type}
                    value={form[name]}
                    accept={acceptType}
                    multiple={multiple}
                    onChange={handleFormChange}
                    className="FormUpload"
                />
            </div>
        </>
    )

}

export default FormUpload