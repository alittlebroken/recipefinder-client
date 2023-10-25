import './ProfileCookbooks.com'
import { useSelector, useDispatch } from 'react-redux'

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

const ProfileCookbooks = (props) => {

    /* Alias the dispatch and selector hooks */
    const dispatch = useDispatch()


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