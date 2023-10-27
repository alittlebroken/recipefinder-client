import { createContext, useState } from "react"

import './Form.css'

export const FormContext = createContext({
    form: {}
})

const Form = (props) => {

    /* Destructure any passed in props */
    const {
        children,
        initialValues,
        submit = () => {},
    } = props

    /* The forms current state */
    const [form, setForm] = useState(initialValues)

    /* Handle updating the various form elements */
    const handleFormChange = (e) => {

        /* Get the name and value of the form event that has changed */
        const { name, value, type, files } = e.target;

        /* Check the type of input currently that has changed on the form */
        let formValue
        if(type === "file"){
            formValue = files
        } else {
            formValue = value
        }

        /* Update the forms data by copying the exiting data and then just
           adding back in the value and form element that has changed */
        setForm({
            ...form,
            [name]: formValue
        })
    }

    return (
        <form className="Form" onSubmit={ event => props?.onSubmit(event, form)}>
            <FormContext.Provider value={{
                form,
                handleFormChange,
            }}>
                {children}
                <button type="submit" className="FormButton">Submit</button>
            </FormContext.Provider>
        </form>
    )
} 

export default Form