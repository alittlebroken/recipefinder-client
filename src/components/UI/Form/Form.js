import { createContext, useState } from "react"

import './Form.css'

export const FormContext = createContext({
    form: {},
})

const Form = (props) => {

    /* Destructure any passed in props */
    const {
        children,
        initialValues,
        onSubmit = () => {},
        bordered = true,
        buttonName = "Submit",
        formClasses = null,
        buttonClasses = null
    } = props

    /* Sets classes on the form based on passed in props */
    let classes = "Form "

    if (bordered) classes += "form-border "
    if (formClasses) classes += formClasses
    const btnClass = "FormButton " + buttonClasses

    /* The forms current state */
    const [form, setForm] = useState(initialValues)
    const [dirty, setDirty] = useState(false)

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
            [name]: formValue,
            isDirty: dirty
        })
        
        setDirty(true)
    }

    return (
        <form className={classes} onSubmit={ event => props?.submit(event, form, dirty)}>
            <FormContext.Provider value={{
                form,
                handleFormChange,
                setDirty,
                setForm
            }}>
                {children}
                <button type="submit" className={btnClass}>{buttonName}</button>
            </FormContext.Provider>
        </form>
    )
} 

export default Form