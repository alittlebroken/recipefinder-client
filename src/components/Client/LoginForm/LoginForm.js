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
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    /* State for any error messages */
    const [errors, setErrors] = useState([])

    /* Handle validation of the form */
    const handleValidation = () => {

        /* Set errors */
        const validationErrors = []

        /* Check if username and password are missing */
        if((!username || username === undefined) && (!password || password === undefined)){
            validationErrors.push('You must supply username and password')
            setErrors(validationErrors)
            return
        }

        /* Is the username set */
        if(!username || username === undefined){
            validationErrors.push('You must supply a username')
            setErrors(validationErrors)
            return
        }

        /* Is the password set */
        if(!password || password === undefined){
            validationErrors.push('You must supply a password')
            setErrors(validationErrors)
            return
        }

    }

    /* Handlers for updating the form inputs */
    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    /* Handle submission of the form */
    const handleSubmit = (e) => {
        e.preventDefault()

        /* Validate the form inputs */
        handleValidation()

        /* Perform the login 
        const result = providers.authProvider.login(username, password)
        if(result !== true){
            setErrors([
                ...errors,
                result.message
            ])
        }
        */
        providers.authProvider.login(username, password)
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
            <input type="text" id="email" className="login-input" placeholder="Email address" onChange={handleUsernameChange} />
            <label htmlFor="password" className="login-label">Password:</label>
            <input type="password" id="password" className="login-input" onChange={handlePasswordChange} />
            <button className="btn login-button" type="submit">Submit</button>
            {errors.map((error) => {
                return (<p key={nanoid()} className="formError">{error}</p>)
            })}
            <hr />
            <div aria-role="signup-container" className="flex flex-row signup-container">
                No account? &nbsp; Then &nbsp; <Link to="/signup" className="">Signup</Link>
            </div>
        </form>
    )

}

export default LoginForm