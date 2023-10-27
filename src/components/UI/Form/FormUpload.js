import { useContext } from "react"
import { FormContext } from "./Form"

import './FormUpload.css'

const FormUpload = (props) => {

    /* Destructure the required pass in props */
    const {
        name,
        label,
        fileType
    } = props

    /* Get the form context to access the values needed */
    const formContext = useContext(FormContext)
    const { form, handleFormChange } = formContext

    return(
        <>
            <div aria-label="upload container" className="FormUploadContainer">
                <label htmlFor={name} className="FormLabel">{label}:</label>
                <input 
                    name={name}
                    type="upload"
                    value={form[name]}
                    onChange={handleFormChange}
                    className="FormUpload"
                />
            </div>
        </>
    )

}

export default FormUpload