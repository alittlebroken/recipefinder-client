import './ProfileCookbook.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import {
    getCookBookRecipeList,
    pageUp,
    pageDown,
    setRecsPerPage,
    goToPage,
    selectIsLoading,
    selectHasError,
    selectRecipes,
    selectPage,
    selectPages,
    selectRecsPerPage,
    selectRecords
} from '../../../slices/Cookbooks/Cookbooks.slice'
import Pagination from '../../UI/Pagination/Pagination'
import { nanoid } from '@reduxjs/toolkit'
import Modal from '../../UI/Modal/Modal'
import { useNavigate } from 'react-router-dom'
import Form from '../../UI/Form/Form'
import FormInput from '../../UI/Form/FormInput'
import FormUpload from '../../UI/Form/FormUpload'
import { selectProfileData } from '../../../slices/Profile/Profile.slice'
import apiProvider from '../../../providers/apiProvider'

const ProfileCookbook = (props) => {

    /* Alias the dispatch hook */
    const dispatch = useDispatch()

    /* Alias the navigation hook */
    const navigate = useNavigate()

    /* Destructure the props passed in */
    const {
        cookbook
    } = props

    /* Get a list of the recipes for this cookbook */
    const recipes = useSelector(selectRecipes)

    /* Are we still loading data or have we encountered an error */
    const loading = useSelector(selectIsLoading)
    const errored = useSelector(selectHasError)

    /* pagination options */
    const pagination = {
        page: useSelector(selectPage),
        pages: useSelector(selectPages),
        recsPerPage: useSelector(selectRecsPerPage),
        records: useSelector(selectRecords)
    }

    /* State for controlling pagination */
    const [page, setPage] = useState(pagination.page)
    const [recsPage, setRecsPage] = useState(pagination.recsPerPage)

    /* State for controlling if the data is outdated ( dirty ) */
    const [isDirty, setIsDirty] = useState(false)

    /* State for Modal forms */
    /* remove ingredient State */
    const [showRemoveModal, setShowRemoveModal] = useState(false)
    /* edit ingredient state */
    const [showEditModal, setShowEditModal] = useState(false)

    /* State for setting id of ingredient to remove or update */
    const [id, setId] = useState()

    /* Load the recipe list */
    useEffect(() => {

        /* function to fetch the data from the API asynchronously */
        const fetchData = async () => {

            /* generate the payload for the API call */
            const payload = {
                cookbookId: cookbook.id
            }

            await getCookBookRecipeList(payload)
        }

        /* Get the data */
        fetchData()
    }, [page, recsPage, dispatch, isDirty])

    /* Handler for changing how many records to display per
     * page 
    */
    const recsChangeHandler = async (e) => {
        setRecsPerPage(e.target.value)
        dispatch(setRecsPerPage(e.target.value))
    }

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

    /* Handler for closing the remove modal */
    const handleCloseRemovalModal = () => {
        setId(null)
        setShowRemoveModal(false)
    }

    /* Handle the closing of the edit model */
    const handleCloseEditModal = () => {
        setId(null)
        setShowEditModal(false)
    }

    /* Set the initial values for the Form component */
    const formInitialValues = {
        name: cookbook.name,
        description: cookbook.description,
        images: cookbook.src,
        title: cookbook.title,
        altText: cookbook.alt
    }

    /* Get profile data */
    const profile = useSelector(selectProfileData)

    /* Notifications */
    const [notifications, setNotifications] = useState()

    /* Handler for the form submission */
    const handleSubmit = async (e, form, dirty) => {
        
        /* prevent the from from submitting */
        e.preventDefault()

        /* Create the params for editing the cookbook */
        const cookbookParams = {
            auth: {
                authenticate: true
            },
            payload: {
                userId: profile.userId,
                cookbookId: cookbook.id,
                name: form.name,
                description: form.description,
                image: null
            }
        }

        /* Only update the form if it has been changed */
        if(isDirty){

            /* Update the cookbook */
            const cookbookResult = await apiProvider.update('cookbooks', cookbookParams)

            if(cookbookResult.success){

                /* Attempt to update the Image for the cookbook */

                /* Create a param object to pass with the image request */
                const imageParams = {
                    auth: {
                        authenticate: true
                    },
                    payload: {
                        userId: profile.userId,
                        src: '',
                        resource: 'Cookbook',
                        resourceid: cookbook.id,
                        title: form.title,
                        images: form.images[0]
                    }
                }

                /* Send the request and check the response */
                const imageResult = await apiProvider.updated('images', imageParams)

                if(imageResult.status >= 200 && imageResult.status < 300){
                    setNotifications({
                        className: "cc-notif cc-ok",
                        message: "Cookbook successfully updated."
                    })
                    setIsDirty(true)
                    handleCloseEditModal(true)
                }

            } else {

                setNotifications({
                    className: "cc-notif cc-error",
                    message: "Unable to update the cookbook. Please try again later."
                })
                handleCloseEditModal(true)

            }

        }

    }

    return (
        
        <div aria-label="cookbook container" className="cb-container flex">

            <Modal key={nanoid()} show={showEditModal} handleClose={handleCloseEditModal}>
                <Form 
                    initialValues={formInitialValues}
                    onSubmit={handleSubmit}
                    bordered={false}
                >
                    
                    <img 
                        src={cookbook.src}
                        title={cookbook.title}
                        alt={cookbook.alt}
                    />

                    <FormInput 
                        name="name"
                        label="Name"
                        validators={[
                            { type: "minLength", value: 4}
                        ]}
                    />   

                    <FormInput 
                        name="description"
                        label="Description"
                        validators={[
                            { type: "minLength", value: 4}
                        ]}
                    />

                    <FormUpload 
                        name="images"
                        label="Cookbook Image"
                        acceptType="image/*"
                        validators={[
                            { type: "required", value: null},
                            { type: "fileType", value: [
                                'image/png',
                                'image/jpg',
                                'image/jpeg',
                                'image/gif'
                            ]},
                            {type: "maxFileSize", value: 1024}
                        ]}
                    />

                    <FormInput 
                        name="title"
                        label="Image Title"
                        validators={[
                            { type: "minLength", value: 4}
                        ]}
                    />

                    <FormInput 
                        name="altText"
                        label="Image Alternative Text"
                        validators={[
                            { type: "minLength", value: 4}
                        ]}
                    />

                </Form>
            </Modal>

            <Modal key={nanoid()} show={showRemoveModal} handleClose={handleCloseRemovalModal}>
                
            </Modal>

            <img 
                src={cookbook.src}
                title={cookbook.title}
                alt={cookbook.alt}
            />

            <h2 className="cb-head-2">
                {cookbook.name}
            </h2>

            <div aria-label="cookbook description" className="cb-description">
                {cookbook.description}
            </div>

            <div aria-label="recipes container" className="cb-recipe-list flex">

            <Pagination 
                        totalRecords={pagination.records}
                        recsPerPage={pagination.recsPerPage}
                        totalPages={pagination.pages}
                        currentPage={pagination.page}
                        handlePageChange={pageChangeHandler}
                        handleRecsChange={recsChangeHandler}
                        minified
            />

                {recipes.map( recipe => {

                    <div key={nanoid()} aria-label="recipe-container" className="cb-recipe-container flex">

                        <img 
                            src={recipe.images[0].imageSrc} 
                            title={recipe.images[0].imageTitle}
                            alt={recipe.images[0].imageAlt}
                        />

                        <div aria-label="recipe content" className="cb-recipe-content flex">

                            <div aria-label='recipe details' className="cb-recipe-details flex">

                                <h3 className="cb-head-3">{recipe.name}</h3>

                                <p aria-label="recipe description" className="cb-recipe-desc">
                                    {recipe.description}
                                </p>

                            </div> 

                            <div aria-label="recipe actions" className="cb-recipe-actions flex">

                                <button 
                                    name="remove" 
                                    className="btn cb-action-btn flex"
                                    value={recipe.id}
                                    onClick={(event => {
                                        setId(event.target.value)
                                        setShowRemoveModal(true)
                                    })}
                                >
                                    Remove
                                </button>
                                <button 
                                    name="moreInfo" 
                                    classname="btn cb-action-btn flex"
                                    onClick={(e) => {
                                        navigate(`/recipes/${recipe.id}`)
                                    }}
                                >
                                    More Info
                                </button>
                            </div> 

                        </div>

                    </div>

                })}

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

        </div>

    )

}

export default ProfileCookbook