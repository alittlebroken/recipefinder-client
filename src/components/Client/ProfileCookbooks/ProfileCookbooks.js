import './ProfileCookbooks.com'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

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

    useEffect(() => {

        /* Generate a payload to send to the API */
        const payload = {
            user: {
               id: profileData.userId
            }
        }

        /* This function will allows us to use async in useEffectn when we try and get the
         * data from the API */
        const fetchData = async () => {

            await getCookbooks(payload)
        }

        /* get the data from the API */
        fetchData()
    }, [dispatch])

    return(
        <div aria-label="content container" className="flex flex-col">

            <div aria-label="container for header and add button" className=" head-container flex">
                <h2 className="pc-head-2">Add Cookbook</h2>
                <button 
                    type="submit" 
                    value="new" 
                    className="btn pc-btn-new"
                >
                    New
                </button>
            </div>

            <div aria-label="cookbooks container" className="pc-cookbooks-container flex">



            </div>

        </div>
    )
}

export default ProfileCookbooks