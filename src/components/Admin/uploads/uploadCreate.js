import {  
    Create, 
    NumberInput, 
    TextInput,
    ImageInput,
    ReferenceInput,
    useRecordContext,
    TextField,
    TabbedForm,
    required,
    minLength,
    maxLength,
    email,
    number,
    AutocompleteInput
} from 'react-admin';

/* Custom Components */

/* Get the ENV we are for the file upload name */
const getFileUploadName = () => {
    return process.env.REACT_APP_ENV === 'production' ? 'images' : 'tests'
}

/* Validation Methods */
const validateSrc = [required(), minLength(2), maxLength(255)]
const validateTitle = [required(), minLength(2), maxLength(255)]
const validateMimeType = [required(), minLength(2), maxLength(255)]
const validateResource = [required(), minLength(2), maxLength(255)]
const validateResourceId = [required(), number()]
const validateEmail = [required(), email()]

export const UploadCreate = () => (
    <Create>
        <TabbedForm>

            <TabbedForm.Tab label="Details">
                <ReferenceInput source="userId" reference="users">
                        <AutocompleteInput optionText="email" validate={validateEmail} fullWidth/>
                </ReferenceInput>
                <TextInput source="src" fullWidth />
                <TextInput source="title" fullWidth validate={validateTitle} />
                <TextInput source="resource" fullWidth validate={validateResource} />
                <NumberInput source="resourceid" fullWidth validate={validateResourceId} />
            </TabbedForm.Tab>

            <TabbedForm.Tab label="Images">
                <ImageInput source={getFileUploadName()} label="Images" accept="image/*">
                    <TextField source="src" title="title" />
                </ImageInput>
            </TabbedForm.Tab>
        </TabbedForm>
    </Create>
);