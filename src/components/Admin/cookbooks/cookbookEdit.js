import { 
    DateTimeInput, 
    Edit, 
    ReferenceInput, 
    SimpleForm, 
    TextInput, 
    SelectInput, 
    useRecordContext,
    required,
    minLength,
    maxLength
} from 'react-admin';

/* Generate the title for the page */
const PageTitle = () => {

    /* Get the recordContext so we have access to the data displayed in the edit page */
    const record = useRecordContext()
    return <span>Edit { record ? `"${record.name}"` : '' } </span>
}

/* Validation for the inout fields */
const validateName = [required(), minLength(2), maxLength(255)]
const validateDescription = [required(), minLength(2)]

export const CookbookEdit = () => (
    <Edit title={<PageTitle />}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="email" />
            </ReferenceInput>
            <TextInput source="name" validate={validateName}/>
            <TextInput multiline source="description" validate={validateDescription} />
            <TextInput source="image" />
            <DateTimeInput source="created_at" />
            <DateTimeInput source="updated_at" />
        </SimpleForm>
    </Edit>
);