import { 
    Edit,
    SimpleForm,
    DateTimeInput, 
    EditButton,
    ShowButton,
    DeleteButton,
    TextInput,
    required,
    minLength,
    maxLength,
    useRecordContext
} from 'react-admin';

/* Generate the title for the page */
const PageTitle = () => {

    /* Get the recordContext so we have access to the data displayed in the edit page */
    const record = useRecordContext()
    return <span>Edit { record ? `"${record.name}"` : '' } </span>
}

/* Validation functions */
const validateName = [required(), minLength(2), maxLength(255)]

export const CategoryEdit = () => (
    <Edit title={<PageTitle />}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="name" validate={validateName} />
            <DateTimeInput source="created_at" />
            <DateTimeInput source="updated_at" />
        </SimpleForm>
    </Edit>
);