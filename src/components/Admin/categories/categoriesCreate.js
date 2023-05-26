import { 
    Create,
    SimpleForm,
    DateTimeInput, 
    TextInput,
    required,
    minLength,
    maxLength,
} from 'react-admin';


/* Validation functions */
const validateName = [required(), minLength(2), maxLength(255)]

export const CategoryCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" validate={validateName} />
            <DateTimeInput source="created_at" />
            <DateTimeInput source="updated_at" />
        </SimpleForm>
    </Create>
);