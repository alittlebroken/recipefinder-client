import { 
    DateTimeInput, 
    Edit, 
    SimpleForm, 
    TextInput,
    useRecordContext,
    required,
    minLength,
    maxLength,
    TabbedForm,
    ImageField,
    ImageInput
} from 'react-admin';

/* Import custom components */
import ShowImage from '../CustomUI/ShowImage'
import { ShowImageTitle } from '../CustomUI/ShowImageTitle'

/* Get the ENV we are for the file upload name */
const getFileUploadName = () => {
    return process.env.REACT_APP_ENV === 'production' ? 'images' : 'tests'
}

/* Generate the title for the page */
const PageTitle = () => {

    /* Get the recordContext so we have access to the data displayed in the edit page */
    const record = useRecordContext()
    return <span>Edit { record ? `"${record.name}"` : '' } </span>
}

/* Validation for the inout fields */
const validateName = [required(), minLength(2), maxLength(255)]
const validateImageTitle = [required(), minLength(2), maxLength(255)]

export const IngredientEdit = () => (
    <Edit title={<PageTitle />}>
        <TabbedForm>
            <TabbedForm.Tab label="details">
                <TextInput source="id" disabled />
                <TextInput source="name" validate={validateName} />
                <DateTimeInput source="created_at" />
                <DateTimeInput source="updated_at" />
            </TabbedForm.Tab>
            <TabbedForm.Tab label="Images">
                <ShowImage />
                <ImageInput source={getFileUploadName()} label="Images" accept="image/*">
                    <ImageField source="src" label="title"/>  
                </ImageInput>
                <TextInput label="Title" source="pictures.title" fullWidth validate={validateImageTitle}/>
            </TabbedForm.Tab>
            
        </TabbedForm>
    </Edit>
);