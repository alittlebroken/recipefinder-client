import './NewCookbookForm.css'
import Form from '../../UI/Form/Form'
import FormInput from '../../UI/Form/FormInput'
import FormUpload from '../../UI/Form/FormUpload'

const NewCookbookForm = (props) => {

    /* Set the initial values for the form */
    const initialValues = {
        name: '',
        description: '',
        image: '',
        title: '',
        altText: ''
    }

    /* Handler for the form submission */
    const handleSubmit = (e) => {
        e.preventDefault()
    }


    return (
        <Form 
            initialValues={initialValues}
            submit={handleSubmit}
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
                name="image"
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

        </Form>
    )

}

export default NewCookbookForm