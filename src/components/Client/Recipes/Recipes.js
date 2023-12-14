import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Recipes.css'

import { 
    performSearch,
    setSearchTerms,
    selectSearchResults,
    selectSearchTerms,
    selectSearchPage,
    selectSearchNumPages,
    selectSearchNumRecords,
    selectSearchLoading,
    selectSearchErrored,
    selectSearchOptions,
    clearSearchResults,
    setSearchOptions,
    increasePage,
    decreasePage,
    setRecsPerPage,
    selectRecsPerPage,
    goToPage,
 } from '../../../slices/Search/SearchSlice'
import { 
    selectProfileData,
} from '../../../slices/Profile/Profile.slice'
import Pagination from '../../UI/Pagination/Pagination'
import Modal from '../../UI/Modal/Modal'
import { useCookbooks } from '../../../hooks/useCookbooks'
import apiProvider from '../../../providers/apiProvider'
import { nanoid } from '@reduxjs/toolkit'
import RecipeList from './RecipeList'

const Recipes = props => {

    /* Alias the dispatcher */
    const dispatch = useDispatch()

    /* Alias the navigation hook */
    const navigate = useNavigate()

    // Gather data from the store for the component
    const searchTerms = useSelector(selectSearchTerms)
    const searchResults = useSelector(selectSearchResults)
    const currentPage = useSelector(selectSearchPage)
    const totalPages = useSelector(selectSearchNumPages)
    const totalRecords = useSelector(selectSearchNumRecords)
    const loading = useSelector(selectSearchLoading)
    const errored = useSelector(selectSearchErrored)
    const searchOptions = useSelector(selectSearchOptions)
    const currentRecsPerPage = useSelector(selectRecsPerPage)

    /* Get the users profile information */
    const profile = useSelector(selectProfileData)

    /* Gather a list of the users cookbooks
       but only if we are logged in
    */
    const cookbooks = useCookbooks('cookbooks', profile.userId)

    /* pagination options */
    const pagination = {
        page: currentPage,
        pages: totalPages,
        recsPerPage: currentRecsPerPage,
        records: totalRecords
    }

    /* State for controlling pagination */
    const [page, setPage] = useState(pagination.page)
    const [recsPage, setRecsPerPage] = useState(pagination.recsPerPage)

    /* State for working on the current record the user has selected, for removal etc */
    const [currentRecipe, setCurrentRecipe] = useState(null)

    /* State for controlling the modals */
    const [showModalAdd, setShowModalAdd] = useState(false)

    /* State for which cookbook we need to add the recipe to */
    const [selectedCookbook, setSelectedCookbook] = useState()

    /* State for the filter */
    const [filter, setFilter] = useState(searchTerms)
    const [options,setOptions] = useState('recipes')

    /* Set state for notifications */
    const [notifications, setNotifications] = useState()

    // Update the state as the component mounts
    useEffect(() => {
        if(filter !== undefined){
            dispatch(performSearch({
                terms: filter,
                options: searchOptions,
                pagination: {
                   page,
                   recsPage
                },
                sort: {
                    field: 'created_at',
                    order: 'desc'
                }
            }))
        }
    },[dispatch, page, recsPage])

    /* Handle the filter being submitted */
    const handleFilter = (e) => {
        e.preventDefault()

        // Update filter
        dispatch(setSearchTerms(filter))
        dispatch(setSearchOptions(options))
        dispatch(performSearch({
            terms: filter,
            options: searchOptions,
            pagination: {
               page,
               recsPage
            },
            sort: {
                field: 'created_at',
                order: 'desc'
            }
        }))
    }

    const handleChangeOfPage = (e) => {
        if(e.target.value === '-'){
            setPage(page - 1)
            dispatch(decreasePage())
        } else if(e.target.value === '+'){
            setPage(page + 1)
            dispatch(increasePage())
        }
    }

    const handleRecsPerPageChange = (e) => {
        setRecsPerPage(parseInt(e.target.value))
        dispatch(setRecsPerPage(e.target.value))
    }

    const handleGoToSpecificPage = (e) => {
        setPage(e.target.value)
        dispatch(goToPage(e.target.value))
    }

    /* Handle form submission */
    const handleSubmit = (e) => {
        e.preventDefault()

    }

    if(loading) {
        return ('Please wait loading data ...')
    }

    if(errored) {
        return ('We have encountered an error. Apologies for the inconvinience.')
    }

    return (
        <div aria-label="container for a list of recipes" className="recipesContainer flex">

            <Modal
                show={showModalAdd}
                handleClose={(e) => {
                    e.preventDefault()
                    setShowModalAdd(false)
                }}
            >
                <h3 className="selectModalHeading">Add recipe to cookbook?</h3>
                <div aria-label="" className="selectContainer flex">
                    <select 
                        name="cookbook" 
                        id="cookbook" 
                        className="cookbookSelect"
                        onChange={(e) => {
                            e.preventDefault()
                            setSelectedCookbook(e.target.value)
                        }}
                        defaultValue="Please select a cookbook"
                    >
                        <option disabled value={null}>Please select a cookbook</option>
                        {cookbooks && cookbooks.map(cookbook => {
                            return (
                                <option value={cookbook.id}>{cookbook.name}</option>
                            )
                        })}
                    </select>
                    <button 
                        className="btn selectBtn"
                        value={{
                            cookbookId: selectedCookbook,
                            recipeId: currentRecipe
                        }}
                        onClick={async (e) => {
                            e.preventDefault()
                            
                            /* Create the params to send to the API */
                            const params = {
                                id: parseInt(selectedCookbook),
                                auth: {
                                    authenticate: true
                                },
                                payload: {
                                    recipeId: currentRecipe
                                }
                            }

                            /* Send the request off */
                            const res = await apiProvider.create("cookbookRecipes",params)
                            
                            if(res.status >= 200 && res.status < 300){
                               console.log("recipe added to cookbook")
                               setNotifications({
                                className: 'notif-ok',
                                message: 'Recipe successfully added to cookbook.'
                                })
                               setCurrentRecipe(null)
                               setSelectedCookbook(null)
                               setShowModalAdd(false) 
                            } else {
                               setNotifications({
                                className: "notif-error",
                                message: 'Unable to add recipe to cookbook.'
                                })
                               setCurrentRecipe(null)
                               setSelectedCookbook(null)
                               setShowModalAdd(false) 
                            }

                        }}
                    >
                        Add
                    </button>
                </div>
            </Modal>

            <h2 className="recipesHeading">Recipes</h2>

           <div aria-label="container for filtering recipes" className="recipesFilter flex">
             
             <input 
                type="text" 
                id="filter" 
                name="filter" 
                value={filter}
                onChange={(e) => {
                    setFilter(e.target.value)
                }}
             />
             <button onClick={handleFilter}>Filter</button>

           </div> 

           <Pagination 
                totalRecords={totalRecords} 
                currentPage={currentPage} 
                totalPages={totalPages}
                recsPerPage={currentRecsPerPage}
                handlePageChange={handleChangeOfPage}
                handleGoToPage={handleGoToSpecificPage}
                handleRecsChange={handleRecsPerPageChange}
            />

            <RecipeList 
                recipes={searchResults} 
                showModal={setShowModalAdd}
                setRecipe={setCurrentRecipe}
                navigateTo={navigate}
                profile={profile}
            />

           <Pagination 
                totalRecords={totalRecords} 
                currentPage={currentPage} 
                totalPages={totalPages}
                recsPerPage={currentRecsPerPage}
                handlePageChange={handleChangeOfPage}
                handleGoToPage={handleGoToSpecificPage}
                handleRecsChange={handleRecsPerPageChange}
            />

            {notifications && (
                <div aria-label="notifications container" className={notifications.className}>
                    {notifications.message}
                </div>
            )}

        </div>
    )

}

export default Recipes