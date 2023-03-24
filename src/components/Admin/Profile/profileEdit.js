import axios from 'axios'
import 
    React, 
    { useState, useEffect } from 'react'

import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    Avatar,
    TextField,
    MenuItem,
    Button
} from '@mui/material'

import { useDataProvider } from 'react-admin'
import { ImageInput, ImageField } from 'react-admin';

import inMemoryJWT from '../../../utils/auth.utils'

export const ProfileEdit = () => {

    /* Alias the dataProvider */
    const dp = useDataProvider()

    /* get any user profile from localStorage */
    const profile = JSON.parse(localStorage.getItem("adminUserProfile"))
    if(!profile){
       /* Perhaps here we get the details from the API */
       axios.get(
        `${process.env.REACT_APP_API_URL}/auth/profile`,
        {
            withCredentials: true,
            headers: {
                'token': inMemoryJWT.getToken(),
                'Content-type': 'application/json'
            }
        }
       ).then(response => {
        /* Store the response in localstorage */
        const data = response.data.data
        const newProfile = {
            ...data,
            nickName: `${data.forename} ${data.surname}`,
            avatar: null
        }
        localStorage.setItem("adminUserProfile", JSON.stringify(newProfile))
       })
    }

    const [username, setUsername] = useState(profile.username)
    const [email, setEmail] = useState(profile.email)
    const [forename, setForename] = useState(profile.forename)
    const [surname, setSurname] = useState(profile.surname)
    const [roles, setRoles] = useState(profile.roles)
    const [avatar, setAvatar] = useState(JSON.parse(localStorage.getItem("adminAvatar")))

    const roleOptions = [
        { value: "admin", label: "Administrator"},
        { value: "customer", label: "Customer" }
    ]

    const handleSubmit = (event) => {
        event.preventDefault()

        const profileToSave = {
            username,
            email,
            forename,
            surname,
            roles,
        }

        const saveResult = dp.updateUserProfile(profileToSave)

        if(saveResult){
            handleAvatarImage()
            localStorage.setItem("adminUserProfile", JSON.stringify(profileToSave))
        }

    }

    /* Handle changing a users profile picture and placing it localStorage */
    const handleAvatarImage = () => {
        /* Get a new instance of the file reader */
        const reader = new FileReader()
        reader.onload = (e) => {
            localStorage.setItem("adminAvatar", JSON.stringify(e.target.result))
            document.getElementById("adminAvatar").src = e.target.result
        }
        reader.readAsDataURL(avatar)
    }

    return (
        <Grid container spacing={2} p={5}>
            <Grid item xs >
                
            </Grid>
            <Grid item xs={6}>
                <Card variant="outlined">
                    <CardContent sx={{ display: "flex", justifyContent: "center"}}>
                        {/*<Avatar 
                            id="adminAvatar"
                            alt={profile.forename} 
                            src={avatar} 
                            sx={{ mt: 2, width: 200, height: 200}} />*/}
                        <img
                            id="adminAvatar"
                            alt={forename}
                            src={avatar}
                            style={{
                                borderRadius: "50%",
                                width: 200,
                                height: 200
                            }}
                        />
                    </CardContent>
                    <CardContent 
                        sx={{ display: "flex", justifyContent: "center", flexDirection: "column"}}
                    >
                        <form style={{ display: "flex", flexDirection: "column" }}>
                            <TextField 
                            label="Username" 
                            size="small"
                            variant="outlined"
                            onChange={(e) => setUsername(e.target.value)}
                            defaultValue={username} />

                            <TextField 
                            label="Forename"
                            size="small" 
                            variant="outlined"
                            onChange={(e) => setForename(e.target.value)}
                            defaultValue={forename} />

                            <TextField 
                            label="Surname"
                            size="small" 
                            variant="outlined"
                            onChange={(e) => setSurname(e.target.value)}
                            defaultValue={surname} />

                            <TextField 
                            label="Email"
                            size="small" 
                            variant="outlined"
                            onChange={(e) => setEmail(e.target.value)}
                            defaultValue={email} />

                            <TextField 
                            label="Roles"
                            size="small" 
                            variant="outlined"
                            select
                            onChange={(e) => setRoles(e.target.value)}
                            defaultValue={roles}>
                                {roleOptions.map( (role) => (
                                    <MenuItem key={role.value} value={role.value}>
                                        {role.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {/*<TextField 
                                id="avatarImage"
                                type="file"
                                label="Upload Avatar"
                                size="small"
                                variant="outlined"
                                onChange={(e) => setAvatar(e.target.files[0])}
                                />*/}
                            <Button
                                component="label"
                                variant="outlined"
                            >
                                Upload Avatar
                                <input type="file" accept="image/jpg" hidden onChange={(e) => setAvatar(e.target.files[0])} />
                            </Button>
                            <div 
                            id="form-tools" 
                            style={
                                    { 
                                        display: "flex", 
                                        justifyContent: "flex-end",
                                        padding: "7px"
                                    }
                                }>
                                <Button 
                                    variant="contained"
                                    onClick={handleSubmit}
                                >Save</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs >
                
            </Grid>
        </Grid>
    )

}