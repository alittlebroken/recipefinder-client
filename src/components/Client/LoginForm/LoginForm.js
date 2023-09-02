import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { nanoid } from "@reduxjs/toolkit"
import { Link } from "react-router-dom"

import './LoginForm.css'

/* Import provider context  */
import { ProviderContext, AccessTokenProvider, useAccessToken } from '../../../contexts/providers'

const LoginForm = () => {

    /* Navigation to redirect the login form */
    const navigate = useNavigate()

    /* Set the access token state */
    const [accessToken, setAccessToken] = useAccessToken()

    /* contexts to be used by the component */
    const providers = useContext(ProviderContext)

    /* Setup state for handling the form inputs */
    const [email, setEmail] = useState('')
    const [emailErrors, setEmailErrors] = useState('')
    const [passwordErrors, setPasswordErrors] = useState('')
    const [password, setPassword] = useState('')

    /* Handlers for updating the form inputs */
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        if(e.target.value.length === 0){
            setEmailErrors('You must specify an email address')
        } else if (e.target.value.length < 15){
            setEmailErrors('Email address must be 15 characters or longer')
        }
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        if(e.target.value.length === 0){
            setPasswordErrors('You must specify a password')
        } else if (e.target.value.length < 4){
            setPasswordErrors('Password must be 4 characters or longer')
        }
    }

    /* Handle submission of the form */
    const handleSubmit = (e) => {
        e.preventDefault()

         
            /* Perform the login */
            providers.authProvider.login(email, password)
            .then((result) => {
                setAccessToken(result)
                /* redirect to the main page */
                return navigate("/")
            })
            .catch((err) => {
                console.log(err)
            })

    }


    /* render the component */
    return (
        <form onSubmit={handleSubmit} className="flex flex-col login-form-container">
            <h2 className="login-header">Login</h2>
            <label htmlFor="email" className="login-label">Email address:</label>
            <input type="text" id="email" className="login-input" placeholder="Email address" onChange={handleEmailChange} />
            {emailErrors ? (<p key={nanoid()} className="formError">{emailErrors}</p>) : null }
            <label htmlFor="password" className="login-label">Password:</label>
            <input type="password" id="password" className="login-input" onChange={handlePasswordChange} />
            {passwordErrors ? (<p key={nanoid()} className="formError">{passwordErrors}</p>) : null }
            <button className="btn login-button" type="submit">Submit</button>
            <hr />
            <div aria-label="signup-container" className="flex flex-row signup-container">
                Need an account? &nbsp; Then &nbsp; <Link to="/signup" className="">Signup</Link>
            </div>
        </form>
    )

}

export default LoginForm