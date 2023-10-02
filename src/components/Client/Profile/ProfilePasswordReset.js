import { useState } from "react";

import '../../UI/core.css'
import './ProfilePasswordReset.css'

import authProvider from "../../../providers/authProvider";

const ProfilePasswordReset = () => {

    /* Component state */
    const [password, setPassword] = useState('')
    const [passError, setPassError] = useState('')
    const [confirm, setConfirm] = useState('')
    const [conError, setConnError] = useState('')
    const [matchError, setMatchError] = useState('')
    const [formOK, setFormOk] = useState(true)
    const [submitOk, setSubmitOk] = useState()
    const [submitErr, setSubmitErr] = useState()

    /* Method to control the form submission. check validation and
    finally change the users password */
    const handleSubmit = (e) => {
        e.preventDefault()

        /* Validate the form */
        if(password === '' || password === undefined || password.length < 8){
            setPassError("You must supply a password that is at least 8 characters long")
            setFormOk(false)
        }

        if(confirm === '' || confirm === undefined || confirm.length < 8){
            setConnError("Your confirmation of the password must be at least 8 characters long")
            setFormOk(false)
        }

        if(password !== confirm){
            setMatchError("Please ensure the password and confirmed password match")
            setFormOk(false)
        }

        if(formOK){

            /* Generate a payload to be sent to the api */
            
            /* Send the request to the api and process the result */
            authProvider.resetPassword({
                password
            }).then((result) => {
                setSubmitOk(result.message)
                return
            }).catch(e => {
                setSubmitErr(e.message)
                return
            })

        }
    }

    return (
        <form 
          id="passwordResetForm" 
          className="pr-container flex flex-col"
          onSubmit={handleSubmit}
        >
            <h2>Password Reset</h2>
            <label htmlFor="Password">Password:</label>
            <input 
                type="password" 
                name="password" 
                className="pr-input"
                onChange={(e) => setPassword(e.target.value)}
            />
            {passError && (
                <span className="pr-error">{passError}</span>
            )}
            <label htmlFor="confirmpassword">Confirm Password:</label>
            <input 
                type="password"
                name="confirmpassword"
                className="pr-input" 
                onChange={(e) => setConfirm(e.target.value)}    
            />
            {conError && (
                <span className="pr-error">{conError}</span>
            )}
            <button type="submit">Change Password</button>
            {submitOk && (
                <span className="pr-ok">{submitOk}</span>
            )}
            {submitErr && (
                <span className="pr-error">{submitErr}</span>
            )}
        </form>
    )

}

export default ProfilePasswordReset