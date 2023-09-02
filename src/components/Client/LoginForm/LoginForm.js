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
    const [usernameErrors, setUsernameErrors] = useState('')
    const [password, setPassword] = useState('')

    /* Handlers for updating the form inputs */
    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
        if(e.target.value.length === 0){
            setUsernameErrors('You must specify a username')
        } else if (e.target.value.length < 8){
            setUsernameErrors('Username must be 8 characters or longer')
        }
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        
    }

    /* Handle submission of the form */
    const handleSubmit = (e) => {
        e.preventDefault()

         
            /* Perform the login */
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
            {usernameErrors ? (<p key={nanoid()} className="formError">{usernameErrors}</p>) : null }
            <label htmlFor="password" className="login-label">Password:</label>
            <input type="password" id="password" className="login-input" onChange={handlePasswordChange} />
            <button className="btn login-button" type="submit">Submit</button>
            <hr />
            <div aria-label="signup-container" className="flex flex-row signup-container">
                Need an account? &nbsp; Then &nbsp; <Link to="/signup" className="">Signup</Link>
            </div>
        </form>
    )

}

export default LoginForm