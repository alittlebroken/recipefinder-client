import './ProfileCookbooks.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

import {
    getCookbooks,
    pageUp,
    pageDown,
    setRecsPerPage,
    goToPage,
    selectCookBooks,
    selectIsLoading,
    selectHasError,
    selectPages,
    selectPage,
    selectRecsPerPage,
    selectRecords
} from  '../../../slices/Cookbooks/Cookbooks.slice'

import { 
    selectProfileData,
} from '../../../slices/Profile/Profile.slice'

import CookBookCard from './CookbookCard'

import { nanoid } from '@reduxjs/toolkit'

import Modal from '../../UI/Modal/Modal'
import NewCookbookForm from './NewCookbookForm'

const ProfileCookbooks = (props) => {

    /* Alias the dispatch and selector hooks */
    const dispatch = useDispatch()

    /* Extract the data from the slice */
    const cookbooks = useSelector(selectCookBooks)
    const isLoading = useSelector(selectIsLoading)
    const hasError = useSelector(selectHasError)
    const pages = useSelector(selectPages)
    const page = useSelector(selectPage)
    const recsPerPage = useSelector(selectRecsPerPage)
    const records = useSelector(selectRecords)

    /* Gather the users profile data */
    /* Get the user profile data */
    let profileData = useSelector(selectProfileData)

    /* state for showing the add cookbook modal form */
    const [showNewModal, setShowNewModal] = useState(false)

    /* Sets if the data for this is dirty and needs to be refreshed */
    const [isDataDirty, setIsDataDirty] = useState(false)

    /* Notifications */
    const [notifications, setNotifications] = useState()

    /* Handler for closing the new cookbook modal */
    const handleNewModalClose = () => {
        setShowNewModal(false)
    }

    useEffect(() => {

        /* Generate a payload to send to the API */
        const payload = {
            user: {
               id: profileData.userId
            }
        }

        /* This function will allows us to use async in useEffect when we try and get the
         * data from the API */
        const fetchData = async () => {
            await dispatch(getCookbooks(payload))
        }

        /* get the data from the API */
        fetchData()
    },[dispatch, isDataDirty])


    return(
        <div aria-label="content container" className="cookbooks-container flex">

            <Modal show={showNewModal} handleClose={handleNewModalClose}>
                <NewCookbookForm />
            </Modal>

            <div aria-label="container for header and add button" className=" head-container flex">
                <h2 className="pc-head-2">My Cookbooks</h2>
                <button 
                    type="submit" 
                    value="new" 
                    className="btn pc-btn-new"
                    onClick={ e=> { setShowNewModal(true) }}
                >
                    New
                </button>
            </div>

            <div aria-label="cookbooks container" className="pc-cookbooks-container flex">

                {cookbooks.map( cookbook => {
                    return (
                        <CookBookCard key={nanoid()} data={cookbook} setIsDirty={setIsDataDirty} handleNotifications={setNotifications} />
                    )
                })}

            </div>

            <div aria-label="notification container" className="cc-notifications">
                {notifications && (
                    <div 
                        aria-label="notification message" 
                        className={notifications.className}
                    >
                        {notifications.message}
                    </div>
                )}
            </div>

        </div>
    )
}

export default ProfileCookbooks