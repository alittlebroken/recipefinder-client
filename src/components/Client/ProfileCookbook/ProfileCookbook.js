import './ProfileCookbook.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import {
    getCookBookRecipeList,
    upPage,
    downPage,
    setRecsPerPage,
    goToPage,
    selectIsLoading,
    selectHasError,
    selectRecipes,
    selectPage,
    selectPages,
    selectRecsPerPage,
    selectRecords,
    selectCookbook
} from '../../../slices/Cookbooks/Cookbooks.slice'
import Pagination from '../../UI/Pagination/Pagination'
import { nanoid } from '@reduxjs/toolkit'
import Modal from '../../UI/Modal/Modal'
import { useNavigate, useParams } from 'react-router-dom'
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

    /* Get the ID of the cookbook from the url params */
    const urlParams = useParams()
    const cookbookId = urlParams.id

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

    /* Get the current cookbook */
    const cookbooks = useSelector(selectCookbook)
    const tmp = cookbooks.filter( item => item.id === parseInt(cookbookId))
    const cookbook = tmp[0]

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

            await dispatch(getCookBookRecipeList(payload))
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
            dispatch(downPage())
        } else if(e.target.value === '+'){
            setPage(page + 1)
            dispatch(upPage())
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

    /* Handle the removal of a recipe from the cookbook */
    const handleRemove = async e => {

        /* Prevent the default action when clicking the button*/
        e.preventDefault()

        /* Get the type of button that was pressed */
        const buttonValue = e.target.name

        if(buttonValue === "remove"){

            /* Generate the paramns to send along with the API request */
            const params = {
                auth: {
                    authenticate: true,
                },
                payload: {
                    id: e.target.value
                }
            }

            const result = await apiProvider.removeAll('recipes', params)

            /* check the result of removing the record */
            if(result.status >= 200 && result.status < 300){
                setNotifications({
                    className: "cc-notif cc-ok",
                    message: "Recipe successfully removed from cookbook."
                })
            }

            setId(null)
            setShowRemoveModal(false)
        } else if (buttonValue === "cancel"){
            setId(null)
            setShowRemoveModal(false)
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
                
                <div aria-label="recipe remove container" className="cb-recipe-remove-container">
                    Are you sure you wish to remove this recipe from the Cookbook?

                    <button 
                        name="remove" 
                        value={id}
                        className="btn cb-remove-btn"
                        onClick={(e) => {
                            handleRemove(e)
                        }}
                    >
                        Remove
                    </button>
                    <button 
                        name="cancel" 
                        className="btn cb-cancel-btn"
                        onClick={(e) => {
                            handleRemove(e)
                        }}
                    >
                        Cancel
                    </button>
                </div>

            </Modal>

            <img 
                src={cookbook.src}
                title={cookbook.title}
                alt={cookbook.alt}
                className="cb-image"
            />

            <div aria-label="heading container" className="cb-header-container flex">
                <h2 className="cb-head-2">
                    {cookbook.name}
                </h2>
                <button 
                    className="btn cb-edit-btn"
                    onClick={(e) => {
                        setShowEditModal(true)
                    }}
                >
                    Edit
                </button>
            </div>

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

                {recipes ? (
                    <h4>
                        Your Cookbook is empty.
                    </h4>
                    
                        ) : recipes.map( recipe => {

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