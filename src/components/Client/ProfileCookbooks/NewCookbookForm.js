import './NewCookbookForm.css'
import Form from '../../UI/Form/Form'
import FormInput from '../../UI/Form/FormInput'
import FormUpload from '../../UI/Form/FormUpload'
import apiProvider from '../../../providers/apiProvider'
import { selectProfileData } from '../../../slices/Profile/Profile.slice'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const NewCookbookForm = (props) => {

    /* Set any state this form needs to use */
    const [hasError, setHasError] = useState()
    const [hasResult, setHasResult] = useState()

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
    const handleSubmit = async (e, form) => {
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

        /* First try to add the cookbook details */
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
                setHasResult('New cookbook successfully created')
            }

        } else {
            /* Something went wrong */
            setHasError('Unable to add new cookbook. Please try again later')
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
            />

            <FormInput 
                name="description"
                label="Description"
            />

            <FormUpload 
                name="images"
                label="Cookbook Image"
                acceptType="image/*"
            />

            <FormInput 
                name="title"
                label="Image Title"
            />

            <FormInput 
                name="altText"
                label="Image Alternative Text"
            />

            {hasError && (
                <div aria-label="add new cookbook error" className="nc-error">
                    {hasError}
                </div>
            )}

            {hasResult && (
                <div aria-label="add new cookbook success" className="nc-ok">
                    {hasResult}
                </div>
            )}

        </Form>
    )

}

export default NewCookbookForm