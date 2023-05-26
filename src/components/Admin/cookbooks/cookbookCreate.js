import { 
    DateInput, 
    Create, 
    ReferenceInput,  
    TextInput, 
    SelectInput, 
    required,
    minLength,
    maxLength,
    TabbedForm,
    ImageInput,
    ImageField
} from 'react-admin';

import ShowImage from '../CustomUI/ShowImage'
import ShowImageTitle from '../CustomUI/ShowImageTitle'

/* Get the ENV we are for the file upload name */
const getFileUploadName = () => {
    return process.env.REACT_APP_ENV === 'production' ? 'images' : 'tests'
}

/* Validation for the input fields */
const validateName = [required(), minLength(2), maxLength(255)]
const validateDescription = [required(), minLength(2)]
const validateImageTitle = [required(), minLength(2)]

export const CookbookCreate = () => (
    <Create>
        <TabbedForm>
            <TabbedForm.Tab label="Details">
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="email" />
            </ReferenceInput>
            <TextInput source="name" validate={validateName}/>
            <TextInput multiline source="description" validate={validateDescription} />
            <TextInput source="image" />
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