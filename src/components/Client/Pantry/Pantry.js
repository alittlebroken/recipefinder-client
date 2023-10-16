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
    goToPage
} from '../../../slices/Pantry/Panty.slice'
import { AuthProvider } from 'react-admin'

const Pantry = (props) => {

    /* Alias the dispatch hook */
    const dispatch = useDispatch()

    /* destructure the props */
    const {
        token
    } = props

    /* Gather the data from the store */
    const ingredients = useSelector(selectPantryIngredients)

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

    

    return (
        <>
        </>
    )
}

export default Pantry