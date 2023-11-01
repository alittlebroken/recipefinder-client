import './NewCookbookForm.css'
import Form from '../../UI/Form/Form'
import FormInput from '../../UI/Form/FormInput'
import FormUpload from '../../UI/Form/FormUpload'
import apiProvider from '../../../providers/apiProvider'
import { selectProfileData } from '../../../slices/Profile/Profile.slice'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const NewCookbookForm = (props) => {

    /* Extract props passed in */
    const {
        handleNotifications,
        isDataDirty,
        handleCloseModal
    } = props

    /* Get profile data */
    const profile = useSelector(selectProfileData)

    /* Set the initial values for the form */
    const initialValues = {
        name: '',
        description: '',
        images: [],
        title: '',
        altText: ''
    }

    /* Handler for the form submission */
    const handleSubmit = async (e, form, dirty) => {
        /* prevent the from from submitting */
        e.preventDefault()

        /* Generate payloads for the various resources we are going to be 
         * creating */
        const cookbookParams = {
            auth: {
                authenticate: true
            },
            payload: {
                userId: profile.userId,
                name: form.name,
                description: form.description,
                image: null
            }
        }

        /* First try to add the cookbook details, if the form is Dirty don't submit */
        if(!dirty){

            const cookbookResult = await apiProvider.create('cookbooks', cookbookParams)
        
            if(cookbookResult.success){
                /* Get the ID for the cookbook just created */
                const cookbookId = cookbookResult?.results[0].id
                
                /* Create the params to send with the request */
                const imageParams = {
                    auth: {
                        authenticate: true
                    },
                    payload: {
                        userId: profile.userId,
                        src: '',
                        resource: 'Cookbook',
                        resourceid: cookbookId,
                        title: form.title,
                        images: form.images[0]
                    }
                }

                /* Send the request and check the sreponse */
                const imageResult = await apiProvider.create('uploads', imageParams)
                
                if(imageResult.status >= 200 && imageResult.status < 300){
                    handleNotifications({
                        className: "cc-notif cc-ok",
                        message: 'New cookbook successfully created'
                    })
                    isDataDirty(true)
                    handleCloseModal(true)
                }

            } else {
                    /* Something went wrong */
                    handleNotifications({
                        className: "cc-notif cc-error",
                        message: 'Unable to add new cookbook. Please try again later'
                    })
                    handleCloseModal(true)
            }

        }
        

    }

    return (
        <Form 
            initialValues={initialValues}
            onSubmit={handleSubmit}
            bordered={false}
        >
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
    )

}

export default NewCookbookForm