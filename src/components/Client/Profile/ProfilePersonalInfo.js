import { useState } from "react"

import '../../UI/core.css'
import './ProfilePersonalInfo.css'

import apiProvider from "../../../providers/apiProvider"

const ProfilePersonalInfo = (props) => {

    const { resourceid, fileId, userId, user } = props

    /* Create state for the form fields and to capture errors */
    let [forename, setForename] = useState(user.forename)
    const [forenameError, setForenameError] = useState('')
    
    let [surname, setSurname] = useState(user.surname)
    const [surnameError, setSurnameError] = useState('')
    
    let [email, setEmail] = useState(user.email)
    const [emailError, setEmailError] = useState('')
    
    let [roles, setRoles] = useState(user.roles)
    const [rolesError, setRolesError] = useState('')
    
    let [avatar, setAvatar] = useState('')
    const [avatarError, setAvatarError] = useState('')
    let [upload, setUpload] = useState('')
    let [title, setTitle] = useState('')
    const [titleError, setTitleError] = useState('')
    const [formOk, setFormOk] = useState(true)
    const [dirty, setDirty] = useState(false)

    /* state for notifications */
    const [notifications, setNotifcations] = useState(null)
    const [notifType, setNotifType] = useState(null)

    /* When the form is submitted we need to update theusers personal information */
    const handleSubmit = (e) => {
        e.preventDefault()

        /* Reset the form to ensure it is clean each submission */
        setFormOk(true)

        /* Perform validation of the form fileds */
        if(forename === '' || forename === undefined){
            
            setForenameError("You must provide a forename to update")
            setFormOk(false)
            return false
        } else {
            setForenameError(null)
            setFormOk(true)
        }

        if(forename.length < 2){
            
            setForenameError("You must provide a forename greater than 2 characters long")
            setFormOk(false)
            return false
        } else {
            setForenameError(null)
            setFormOk(true)
        }

        if(surname === '' || surname === undefined){
            
            setSurnameError("You must provide a surname to update")
            setFormOk(false)
            return false
        } else {
            setSurnameError(null)
            setFormOk(true)
        }
        

        if(surname.length < 2){
            
            setSurnameError("You must provide a surname greater than 2 characters long")
            setFormOk(false)
            return false
        }
        else {
            setSurnameError(null)
            setFormOk(true)
        }

        if(email === '' || email === undefined){
            
            setEmailError("You must provide an email to update")
            setFormOk(false)
            return false
        } else {
            setEmailError(null)
            setFormOk(true)
        }

        if(email.length < 16){
            
            setEmailError("You must provide an email that is at least 16 characters long")
            setFormOk(false)
            return false
        }else {
            setEmailError(null)
            setFormOk(true)
        }

        if(upload && title.length < 2){
           
            setTitleError("If setting a profile picture you must provide a title that is greater than 2 characters long")
            setFormOk(false)
            return false

        } else {
            setTitleError(null)
            setFormOk(true)
        }

        if(upload && !isNaN(parseInt(title))){

            setTitleError("Image title must be a string of characters.")
            setFormOk(false)
            return false

        } else {
            setTitleError(null)
            setFormOk(true)
        }

       
        if(formOk){
            
            /* Generate the params to send to the server */
            let params = {
                id: user.userId, 
                auth: {
                    authenticate: true
                },
                payload: {
                    fileId,
                    username: email,
                    email,
                    forename,
                    surname,
                    avatar,
                    upload,
                    title,
                    roles
                }
            }


            apiProvider.update('users', params)
            .then(result => {
                setNotifcations('Profile successfully updated')
                setNotifType('ok')
                props.handleProfileDirty(true)
                return true
            })
            .catch(e => {
                setNotifcations('Unable to update profile, please try again later.')
                setNotifType('error')
                
                return false
            })
            
            return true
        } else {
            return false
        }

    }

    return (
        <form onSubmit={handleSubmit} className="ppi-container flex flex-col">

            <h2 className="ppi-heading2">Personal Info</h2>
            
            <label htmlFor="forename">Forename:</label>
            <input 
                type="text" 
                id="forename" 
                name="forename" 
                value={forename}
                className="ppi-input" 
                onChange={(e) => setForename(e.target.value)} />
            {forenameError && (<p className="ppi-error">{forenameError}</p>)}

            <label hmtlFor="surname">Surname:</label>
            <input 
                type="text" 
                id="surname" 
                name="surname" 
                value={surname}
                className="ppi-input" 
                onChange={(e) => setSurname(e.target.value)} />
            {surnameError && (<p className="ppi-error">{surnameError}</p>)}

            <label htmlFor="email">Email:</label>
            <input 
                type="email" 
                id="email" 
                name="email" 
                value={email}
                className="ppi-input" 
                onChange={(e) => setEmail(e.target.value)} />
            {emailError && (<p className="ppi-error">{emailError}</p>)}

            <label htmlFor="roles">Roles:</label>
            <input type="text" name="roles" id="roles" value={roles} disabled className="ppi-input" />

            <h4 className="ppi-heading4">Profile Image</h4>
            {avatar && (<img src={avatar.src} alt={avatar.title} title={avatar.title} className="ppi-avatar" />)}
            <label htmlFor="title">Title:</label>
            <input 
                type="text" 
                id="title" 
                name="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Insert picture title"
                className="ppi-input" />
            {titleError && (<p className="ppi-error">{titleError}</p>)}
            <label htmlFor="avatar">New profile image</label>
            <input type="file" id="avatar" name="avatar" onChange={(e) => setUpload(e.target.files[0])} />
            {avatarError && (<p className="ppi-error">{avatarError}</p>)}

            { notifications && (
                <div aria-label="notifications container" className={`notifications notifType_${notifType}`}>{notifications}</div>
            )}

            <button type="submit" className="ppi-btn">Update</button>


        </form>
    )

}

export default ProfilePersonalInfo