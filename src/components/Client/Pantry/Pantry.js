import './Pantry.css'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    getPantryIngredients,
    selectPantryIngredients,
    selectError,
    selectLoading,
    selectPage,
    selectPages,
    selectRecsPerPage,
    selectRecords,
    pageUp,
    pageDown,
    setRecsPerPage,
} from '../../../slices/Pantry/Pantry.slice'
import { 
    selectProfileData,
} from '../../../slices/Profile/Profile.slice'
import Pagination from '../../UI/Pagination/Pagination'
import Form from '../../UI/Form/Form'
import FormInput from '../../UI/Form/FormInput'


const Pantry = (props) => {

    /* Alias the dispatch hook */
    const dispatch = useDispatch()

    /* destructure the props */
    const {
        token
    } = props

    /* Gather the data from the store */
    const ingredients = useSelector(selectPantryIngredients)

    /* Get the user profile data */
    let profileData = useSelector(selectProfileData)

    /* pagination options */
    const pagination = {
        page: useSelector(selectPage),
        pages: useSelector(selectPages),
        recsPerPage: useSelector(selectRecsPerPage),
        records: useSelector(selectRecords)
    }

    /* Are we still loading data or have we encountered an error */
    const loading = useSelector(selectLoading)
    const errored = useSelector(selectError)

    /* State for controlling pagination */
    const [page, setPage] = useState(pagination.page)
    const [recsPage, setRecsPage] = useState(pagination.recsPerPage)

    /* Handler for going forward or backward the pages */
    const pageChangeHandler = async (e) => {
        if(e.target.value === '-'){
            setPage(page - 1)
            dispatch(pageDown())
        } else if(e.target.value === '+'){
            setPage(page + 1)
            dispatch(pageUp())
        }
    }

    /* Handler for changing how many records to display per
     * page 
    */
    const recsChangeHandler = async (e) => {
        setRecsPage(e.target.value)
        dispatch(setRecsPerPage(e.target.value))
    }

    /* Load the user pantry */
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getPantryIngredients({ 
                pantryId: parseInt(profileData.pantryId)
            }))
        }
        fetchData()
    }, [])

    /* Handler for the forms submit function */
    const submit = (event, form) => {
        event.preventDefault()
        
    }

    return (
        <>
            <h2 className="pantry-head-2">{profileData.username}'s Pantry</h2>
            <Form 
                initialValues={{
                findIngredient: ''
            }}
                
                onSubmit={submit}
            >
                <FormInput 
                    name="findIngredient"
                    label="Find Ingredient"
                />
            </Form>
            <Pagination 
                        totalRecords={pagination.records}
                        recsPerPage={pagination.recsPerPage}
                        totalPages={pagination.pages}
                        currentPage={pagination.page}
                        handlePageChange={pageChangeHandler}
                        handleRecsChange={recsChangeHandler}
                        minified
            />

            <Pagination 
                        totalRecords={pagination.records}
                        recsPerPage={pagination.recsPerPage}
                        totalPages={pagination.pages}
                        currentPage={pagination.page}
                        handlePageChange={pageChangeHandler}
                        handleRecsChange={recsChangeHandler}
                        minified
            />
        </>
    )
}

export default Pantry