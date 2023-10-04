import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import './Profile.css'

import ProfileHeader from './ProfileHeader'
import ProfileDataBar from './ProfileDataBar'
import ProfilePersonalInfo from './ProfilePersonalInfo'
import ProfilePasswordReset from "./ProfilePasswordReset"

/* Import the selectors and thunks for the profile component */
import { 
    getUserProfile, 
    selectProfileData,
    selectLoading,
    selectHasError
} from '../../../slices/Profile/Profile.slice'

const Profile = (props) => {

    /* Alias the despatch hook */
    const dispatch = useDispatch()

    let profileData = useSelector(selectProfileData)
    let loading = useSelector(selectLoading)
    let error = useSelector(selectHasError)

    /* destructure the props */
    const {
        token
    } = props

    /* Load the users profile when the component is mounted */
    useEffect(() => {
        const fetchData = async () => {
            console.log('During useEffect')
            await dispatch(getUserProfile(token?.user?.id))
        }
        fetchData()
    },[dispatch])


    return (
        <div aria-label="profile container" className="profile-container">

            { profileData && <ProfileHeader 
                    src={profileData.avatar_src}
                    alt={profileData.avatar_alt}
                    title={profileData.avatar_title}
                    forename={profileData?.forename}
                    surname={profileData?.surname}
                    email={profileData?.email}
                />
            }
            { profileData && <ProfileDataBar /> }
            { profileData && <ProfilePersonalInfo  user={profileData} /> }
            { profileData && <ProfilePasswordReset /> }

        </div>
    )
}

export default Profile