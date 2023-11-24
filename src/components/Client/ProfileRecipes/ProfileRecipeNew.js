import './ProfileRecipeNew.css'

import Form from '../../UI/Form/Form'
import FormInput from '../../UI/Form/FormInput'
import FormUpload from '../../UI/Form/FormUpload'
import FormList from '../../UI/Form/FormList'

import { selectProfileData } from '../../../slices/Profile/Profile.slice'
import { useSelector, useDispatch } from 'react-redux'

import apiProvider from '../../../providers/apiProvider'

const ProfileRecipeNew = props => {

    /* Extract props passed in */
    const {
        handleNotifications,
        isDataDirty = false,
        handleCloseModal
    } = props

    /* Get profile data */
    const profile = useSelector(selectProfileData)

    /* Get a list of ingredients */
    //const ingredients = useList('ingredients')

    /* Set the form values we are expecting */
    const initialValues = {
        name: '',
        description: '',
        images: [],
        imageTitle: '',
        imageAlt: '',
        servings: '',
        calories: '',
        prepTime: '',
        cookTime: '',
        ingredients: [],
        ingredient: '',
        amount: '',
        amountType: '',
        steps: [],
        stepNo: '',
        stepContent: '',
        categories: [],
        categoryName: ''
    }

    /* handler for form submission */
    const handleSubmit = async (e, form, dirty) => {

        /* Prevent the form from submitting when it is submitted */
        e.preventDefault()

        /* We need to set the correct object layout for some of the 
           values passed into the payload */
           let steps = []
           form.steps.forEach(step => {
            let tmp = {
                stepNo: step.stepNo,
                content: step.stepContent
            }
            steps.push(tmp)
           })

           let categories = []
           form.categories.forEach(category => {
            let tmp = {
                id: category.category
            }
            categories.push(tmp)
           })

           let ingredients = []
           form.ingredients.forEach(ingredient => {
            let tmp = {
                id: parseInt(ingredient.ingredients),
                amount: parseInt(ingredient.amount),
                amountType: ingredient.amountType
            }
            ingredients.push(tmp)
           })

        /* generate the payload to be sent to the API */
        const params = {
            auth: {
                authenticate: true
            },
            payload: {
                userId: profile.userId,
                name: form.name,
                servings: form.servings,
                calories_per_serving: form.calories,
                prep_time: form.prepTime,
                cook_time: form.cookTime,
                ingredients: ingredients,
                steps: steps,
                categories: categories
            }
        }

        console.log(params)

        /* Only submit the form if it is not dirty */ 
        if(!dirty){

            /* Send the request */
            const recipeResult = await apiProvider.create('recipes', params)
            console.log(recipeResult)

            if(recipeResult.success === true){
                console.log('Uploading image for recipe...')
                /* Now we can try and send the image to upload */

                /* Id of the item just created */
                let id = recipeResult.results[0].id
                console.log('Form: ', form)
                console.log('Form Images: ', form.images)

                /* Create the params for the request */
                const imageParams = {
                    auth: {
                        authenticate: true
                    },
                    payload: {
                        userId: profile.userId,
                        src: '',
                        resource: 'recipe',
                        resourceid: id,
                        title: form.title,
                        alt: form.imageAlt,
                        images: form.images[0]
                    }
                }
                
                /* send the request and check the result */
                const uploadResult = await apiProvider.create('uploads', imageParams)
                console.log(uploadResult)
                if(uploadResult.status >= 200 && uploadResult.status < 300){
                    handleNotifications({
                        className: "cc-notif cc-ok",
                        message: 'New recipe successfully created'
                    })
                    isDataDirty(true)
                    handleCloseModal(true)
                } else {
                    handleNotifications({
                        className: "cc-notif cc-ok",
                        message: 'Unable to create recipe, there was a problem with the image. Please try again later.'
                    })
                    /* Remove the uplaoded recipe */
                    const removeResult = await apiProvider.removeOne('uploads', {
                        auth: {
                            authenticate: true
                        },
                        id: id
                    })
                    isDataDirty(true)
                }

            } else {
                console.log('Unable to create recipe...')
                /* Something went wrong */
                handleNotifications({
                   className: "cc-notif cc-error",
                   message: 'Unable to add new recipe. Please try again later'
               })
    
           }

        } 

        console.log(form.images)

    }



    return(
        <Form initialValues={initialValues} bordered={false} submit={handleSubmit}>
            <h2 className="add-recipe-head-2">New Recipe</h2>

            <FormInput 
                name="name"
                label="Name"
                validators={[
                    { type: 'minLength', value: 4 }
                ]}
            />

            <FormInput 
                name='description'
                label='Description'
                validators={[
                    { type: 'minLength', value: 4 }
                ]}
            />

            <FormUpload 
                name="images"
                label="Recipe Images"
                acceptType="image/*"
                validators={[
                    { type: "required", value: null },
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
                name='imageTitle'
                label='Image Title'
                validators={[
                    { type: 'minLength', value: 4 }
                ]}
            />
            
            <FormInput 
                name='imageAlt'
                label='Image Alternate Text'
                validators={[
                    { type: 'minLength', value: 4 }
                ]}
            />

            <h3 className="add-recipe-head-3">Information</h3>
            
            <FormInput 
                name='servings'
                label='Servings'
                validators={[
                    { type: 'isNumber', value: null }
                ]}
            />

            <FormInput 
                name='calories'
                label='Calories per serving'
                validators={[
                    { type: 'isNumber', value: null }
                ]}
            />

            <FormInput 
                name='prepTime'
                label='Prep Time'
                validators={[
                    { type: 'isNumber', value: null }
                ]}
            />

            <FormInput 
                name='cookTime'
                label='Cook Time'
                validators={[
                    { type: 'isNumber', value: null }
                ]}
            />

            <FormList
                name="ingredients"
                title="Ingredients"
                inputData={
                    { 
                        ingredients: {
                            name: "ingredients",
                            value: "",
                            type: "select",
                            placeholder: "Select an ingredient",
                            validators: null
                        },
                        amount: {
                            name: "amount",
                            value: "",
                            type: "number",
                            placeholder: "Amount",
                            validators: [
                                { type: "isNumber", value: null}
                            ]
                        }, 
                        amountType: {
                            name: "amountType",
                            value: "",
                            type: "text",
                            placeholder: "Amount Type",
                            validators: [
                                { type: "minLength", value: 4}
                            ]
                        } 
                    }
                }
                inputOptions={[
                    { name: "ingredients", resource: "ingredients" }
                ]} 
            />

            <FormList
                name="steps"
                title="Steps"
                inputData={{
                        stepNo: {
                            name: "stepNo",
                            value: "",
                            type: "number",
                            placeholder: "Step #",
                            validators: [
                                { type: "isNumber", value: null}
                            ]
                        }, 
                        stepContent: {
                            name: "stepContent",
                            value: "",
                            type: "text",
                            placeholder: "Content",
                            validators: [
                                { type: "minLength", value: 4}
                            ]
                        } 
                    }}
            />

            <FormList
                name="categories"
                title="Categories"
                inputData={{
                        category: {
                            name: "category",
                            value: "",
                            type: "select",
                            placeholder: "Select a category",
                            validators: null
                        }
                    }}
                inputOptions={[
                    { name: "category", resource: "categories" }
                ]}
            />

        </Form>
    )
}

export default ProfileRecipeNew