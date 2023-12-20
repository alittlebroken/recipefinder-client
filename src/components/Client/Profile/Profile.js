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

    /* State to indicate if profile data is dirty at all */
    const [profileDirty, setProfileDirty] = useState(false)

    /* destructure the props */
    const {
        token
    } = props

    /* Load the users profile when the component is mounted */
    useEffect(() => {
        const fetchData = async () => {
            
            await dispatch(getUserProfile(token?.user?.id))
        }
        fetchData()
    },[dispatch, profileDirty])


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
            { profileData && <ProfilePersonalInfo  user={profileData} handleProfileDirty={setProfileDirty} /> }
            { profileData && <ProfilePasswordReset /> }

        </div>
    )
}

export default Profile