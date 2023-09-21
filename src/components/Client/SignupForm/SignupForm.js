import { useState } from "react"
import authProvider from "../../../providers/authProvider"
import { Link, useNavigate } from "react-router-dom"

import './SignupForm.css'

const SignupForm = () => {

    /* Alias the navigation link */
    const navigate = useNavigate()

    /* State for the fields and error message */
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')

    const [forename, setForename] = useState('')
    const [forenameError, setForenameError] = useState('')

    const [surname, setSurname] = useState('')
    const [surnameError, setSurnameError] = useState('')

    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmError, setConfirmError] = useState('')

    /* This determines if there are any issues with the form */
    const [formOk, setFormOk] = useState('true')

    const handleSubmit = (event) => {
        event.preventDefault()

        /* Validate the form fields */
        if(email === '' || email === undefined) {
            setEmailError('You must supply an email address to register')
            setFormOk(false)
            return false
        }

        if(email.length < 16) {
            setEmailError('You must supply an email of at least 16 characters')
            setFormOk(false)
            return false
        } 

        if(forename === undefined || forename === '') { 
            setForenameError('You must supply a forename to register')
            setFormOk(false)
            return false
        } 

        if(forename.length < 2) {
            setForenameError('You must suppyly a forename that is greater then 2 characters long')
            setFormOk(false)
            return false
        } 

        if(surname === undefined || surname === '') {
            setSurnameError('You must supply a surname to register')
            setFormOk(false)
            return false
        } 

        if(surname.length < 2) { 
            setSurnameError('You must suppyly a surname that is greater then 2 characters long')
            setFormOk(false)
            return false
        }

        if(password === undefined || password === '') {
            setPasswordError('You must supply a password to register')
            setFormOk(false)
            return false
        } 

        if(password.length < 8) {
            setPasswordError('The supplied password must be at least 8 characters long')
            setFormOk(false)
            return false
        } 

        if(confirmPassword === undefined || confirmPassword === '') {
            setConfirmError('You must confirm your password to register')
            setFormOk(false)
            return false
        } 

        if(confirmPassword.length < 8) {
            setConfirmError('The supplied confirmed password must be at least 8 characters long')
            setFormOk(false)
            return false
        } 

        if(confirmPassword !== password) {
            setConfirmError('The password and confirmed password must match before registration can continue')
            setFormOk(false)
            return false
        } 

        /* Validation is OK so lest register the user */
        
        /* Build up the payload to send to the authProvider */
        const payload = {
            username: email,
            email,
            forename,
            surname,
            password
        }

        authProvider.register(payload)
        .then((response) => {
          if(response.status === 201 && response.success === true){
            navigate('/login')
          } else {
            return false
          }
            
        })
        .catch((error) => {
            return false
        })

        return true
       
    } 

    return (
        <form aria-label="form" onSubmit={handleSubmit} className="formContainer flex flex-col">
            <h3 className="form-title">Register</h3>
            <label htmlFor="emailaddress">Email address:</label>
            <input type="email" id="emailaddress" className="form-input" onChange={(e) => { setEmail(e.target.value) }} />
            {emailError && (<p className="form-error">{emailError}</p>)}

            <label htmlFor="forename">Forename:</label>
            <input type="text" id="forename" className="form-input" onChange={(e) => { setForename(e.target.value) }} />
            {forenameError && (<p className="form-error">{forenameError}</p>)}

            <label htmlFor="surname">Surname:</label>
            <input type="text" id="surname" className="form-input" onChange={(e) => { setSurname(e.target.value) }} />
            {surnameError && (<p className="form-error">{surnameError}</p>)}

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" className="form-input" onChange={(e) => { setPassword(e.target.value) }} />
            {passwordError && (<p className="form-error">{passwordError}</p>)}

            <label htmlFor="confirmpassword">Confirm password:</label>
            <input type="password" id="confirmpassword" className="form-input" onChange={(e) => { setConfirmPassword(e.target.value) }} />
            {confirmError && (<p className="form-error">{confirmError}</p>)}

            <p className="form-terms">By creating an account you agree to our terms and condtions</p>
            <button type="submit" name="submit" className="btn form-btn">Register</button>
            <hr />
            <p className="form-account">Already have an account? <Link to="/login">Login</Link></p>
        </form>
    )
}

export default SignupForm