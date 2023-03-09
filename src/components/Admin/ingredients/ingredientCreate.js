import { 
    DateTimeInput, 
    Create, 
    SimpleForm, 
    TextInput,
    required,
    minLength,
    maxLength 
} from 'react-admin';

/* Validation for the inout fields */
const validateName = [required(), minLength(2), maxLength(255)]


export const IngredientCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" validate={validateName} />
            <DateTimeInput source="created_at" />
            <DateTimeInput source="updated_at" />
        </SimpleForm>
    </Create>
);