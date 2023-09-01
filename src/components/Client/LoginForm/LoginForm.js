import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { nanoid } from "@reduxjs/toolkit"

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
            <label htmlFor="email">Email address:</label>
            <input type="text" id="email" placeholder="Email address" onChange={handleUsernameChange} />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password"  onChange={handlePasswordChange} />
            <button type="submit">Submit</button>
            {errors.map((error) => {
                return (<p key={nanoid()} className="formError">{error}</p>)
            })}
            <hr />
            <a href="/signup">Sign Up</a>
        </form>
    )

}

export default LoginForm