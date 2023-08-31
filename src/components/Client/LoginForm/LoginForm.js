import { useState, useContext } from "react"
import { redirect } from "react-router-dom";

/* Import provider context  */
import { ProviderContext } from '../../contexts/providers'

const LoginForm = () => {

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

    /* Handle submission of the form */
    const handleSubmit = (e) => {
        e.preventDefault()

        /* Validate the form inputs */
        handleValidation()

        /* Perform the login */
        const result = providers.authProvider.login(username, password)
        if(result !== true){
            setErrors([
                ...errors,
                result.message
            ])
        }

        /* redirect to the main page */
        redirect("/")

    }

    /* render the component */
    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            <label for="email">Email address:</label>
            <input type="text" id="email" placeholder="Email address" />
            <label for="password">Password:</label>
            <input type="password" id="password" />
            <button type="submit">Submit</button>
            {errors.map((error) => {
                return (<p className="formError">{error}</p>)
            })}
            <hr />
            <a href="/signup">Sign Up</a>
        </form>
    )

}

export default LoginForm