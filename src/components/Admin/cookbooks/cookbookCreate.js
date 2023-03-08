import { 
    DateInput, 
    Create, 
    ReferenceInput, 
    SimpleForm, 
    TextInput, 
    SelectInput, 
    required,
    minLength,
    maxLength
} from 'react-admin';

/* Validation for the inout fields */
const validateName = [required(), minLength(2), maxLength(255)]
const validateDescription = [required(), minLength(2)]

export const CookbookCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="id" disabled />
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="email" />
            </ReferenceInput>
            <TextInput source="name" validate={validateName}/>
            <TextInput multiline source="description" validate={validateDescription} />
            <TextInput source="image" />
            <DateInput source="created_at" />
            <DateInput source="updated_at" />
        </SimpleForm>
    </Create>
);