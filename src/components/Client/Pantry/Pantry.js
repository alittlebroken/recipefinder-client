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
    setFilter
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
    let ingredients = useSelector(selectPantryIngredients)

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
    const submit = async (event, form) => {
        event.preventDefault()
        await dispatch(setFilter(event.target[0].value))
    }

    return (
        <div className="p-container flex flex-col">
            <h3 className="p-head-2">{profileData.username}'s Pantry</h3>
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

            <div aria-label="ingredient list" className="pi-list">

                {ingredients.map( ingredient => {
                    return (
                        <div aria-label="ingredient container" className="flex pi-ingredient">
                            <img 
                                src={ingredient?.src}
                                alt={ingredient?.alt}
                                title={ingredient?.title}
                            />
                            <div aria-label="ingredient details container" className="flex pi-detail-container">
                               
                               <div aria-label="pantry ingredient details" className="pi-details flex">
                                    
                                    <h3>{ingredient.name}</h3>

                                    <div aria-label="pantry ingredient amount" className="pi-amount flex flex-row">
                                        <label>Amount:</label><p>{ingredient.amount}</p>
                                    </div>
                                    <div aria-label="pantry ingredient amount" className="pi-amount flex flex-row">
                                        <label>Amount Type:</label><p>{ingredient.amount_type}</p>
                                    </div>

                                </div>

                                <div aria-label="pantry ingredient actions" className="pi-actions flex">
                                    <button className="btn pi-remove">Remove</button>
                                    <button className="btn pi-edit">Edit</button>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>

            <Pagination 
                        totalRecords={pagination.records}
                        recsPerPage={pagination.recsPerPage}
                        totalPages={pagination.pages}
                        currentPage={pagination.page}
                        handlePageChange={pageChangeHandler}
                        handleRecsChange={recsChangeHandler}
                        minified
            />
        </div>
    )
}

export default Pantry