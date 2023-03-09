import { 
    DateTimeInput, 
    Edit, 
    SimpleForm, 
    TextInput,
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


export const IngredientEdit = () => (
    <Edit title={<PageTitle />}>
        <SimpleForm>
            <TextInput source="id" />
            <TextInput source="name" validate={validateName} />
            <DateTimeInput source="created_at" />
            <DateTimeInput source="updated_at" />
        </SimpleForm>
    </Edit>
);