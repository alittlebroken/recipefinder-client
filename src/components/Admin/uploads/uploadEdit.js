import {  
    Edit, 
    NumberInput, 
    TextInput,
    ImageInput,
    ReferenceField,
    useRecordContext,
    TextField,
    TabbedForm,
    DateTimeInput,
    required,
    minLength,
    maxLength,
    email,
    number,
} from 'react-admin';

/* Custom Components */
/* Generate the title for the page */
const PageTitle = () => {

    /* Get the recordContext so we have access to the data displayed in the edit page */
    const record = useRecordContext()
    return <span>Edit { record ? `"${record.title}"` : '' } </span>
}

/* Component for showing an Image */
const ShowImage = () => {
    const record = useRecordContext()
    const spanStyles = {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
    const imageStyles = {
        borderRadius: 10,
        width: '30%',
        height: '30%',
    }
    return <span style={spanStyles}><img src={record.src} alt={record.title} style={imageStyles} /></span>
}

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

export const UploadEdit = () => (
    <Edit title={<PageTitle />}>
        <TabbedForm>

            <TabbedForm.Tab label="Details">
                <TextInput source="id" disabled fullWidth/>
                <ReferenceField source="userid" reference="users" fullWidth disabled>
                    <TextInput source="email" fullWidth disabled/>
                </ReferenceField>
                <TextInput source="src" fullWidth validate={validateSrc} />
                <TextInput source="title" fullWidth validate={validateTitle} />
                <TextInput source="mimetype" fullWidth validate={validateMimeType} />
                <TextInput source="resource" fullWidth validate={validateResource} />
                <NumberInput source="resourceid" fullWidth validate={validateResourceId} />
                <DateTimeInput source="created_at" fullWidth/>
                <DateTimeInput source="updated_at" fullWidth/>
            </TabbedForm.Tab>

            <TabbedForm.Tab label="Images">
                <ShowImage />
                <ImageInput source={getFileUploadName()} label="Images" accept="image/*">
                    <TextField source="src" title="title" />
                </ImageInput>
            </TabbedForm.Tab>
        </TabbedForm>
    </Edit>
);