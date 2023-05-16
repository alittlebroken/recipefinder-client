import { 
    Create, 
    TextInput,
    required,
    minLength,
    maxLength,
    TabbedForm,
    ImageInput,
    ImageField
} from 'react-admin';

/* Validation for the inout fields */
const validateName = [required(), minLength(2), maxLength(255)]
const validateImageTitle = [required(), minLength(2), maxLength(255)]

/* Get the ENV we are for the file upload name */
const getFileUploadName = () => {
    return process.env.REACT_APP_ENV === 'production' ? 'images' : 'tests'
}

export const IngredientCreate = () => (
    <Create>
        <TabbedForm>
            <TabbedForm.Tab label="Details">
                <TextInput source="name" validate={validateName} />
            </TabbedForm.Tab>
            <TabbedForm.Tab label="Images">
            <ImageInput source={getFileUploadName()} label="Images" accept="image/*">
                <ImageField source="src" label="title"/>  
                </ImageInput>
                <TextInput source="title" fullWidth validate={validateImageTitle}/>
            </TabbedForm.Tab>
        </TabbedForm>
    </Create>
);