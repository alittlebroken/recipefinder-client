import { 
    DateTimeInput, 
    Edit, 
    ReferenceInput, 
    TextInput, 
    SelectInput, 
    useRecordContext,
    required,
    minLength,
    maxLength,
    TabbedForm,
    ImageField,
    ImageInput
} from 'react-admin';

import ShowImage from '../CustomUI/ShowImage'
import ShowImageTitle from '../CustomUI/ShowImageTitle'

/* Generate the title for the page */
const PageTitle = () => {

    /* Get the recordContext so we have access to the data displayed in the edit page */
    const record = useRecordContext()
    return <span>Edit { record ? `"${record.name}"` : '' } </span>
}

/* Get the ENV we are for the file upload name */
const getFileUploadName = () => {
    return process.env.REACT_APP_ENV === 'production' ? 'images' : 'tests'
}

/* Validation for the input fields */
const validateName = [required(), minLength(2), maxLength(255)]
const validateDescription = [required(), minLength(2)]
const validateImageTitle = [required(), minLength(2)]

export const CookbookEdit = () => (
    <Edit title={<PageTitle />}>
        <TabbedForm>
            <TabbedForm.Tab label="Details">
                <TextInput source="id" disabled />
                <ReferenceInput source="userId" reference="users">
                    <SelectInput optionText="email" />
                </ReferenceInput>
                <TextInput source="name" validate={validateName}/>
                <TextInput multiline source="description" validate={validateDescription} />
                <DateTimeInput source="created_at" />
                <DateTimeInput source="updated_at" />
            </TabbedForm.Tab>
            <TabbedForm.Tab label="Images">
                <ShowImage />
                <ImageInput source={getFileUploadName()} label="Images" accept="image/*">
                    <ImageField source="src" label="title"/>  
                </ImageInput>
                <TextInput source="title" fullWidth validate={validateImageTitle}/> 
            </TabbedForm.Tab>
        </TabbedForm>
    </Edit>
);