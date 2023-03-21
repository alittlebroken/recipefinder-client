import { 
    Create, 
    TextInput,
    SimpleForm,
    SelectInput,
    required,
    minLength,
    email,
    choices
} from 'react-admin';

/* Choices for the roles a user can have.
 * Only two choices for now but as we add
 * m ore we can move to a DB table and use a 
 * reference input to get the values
 */
const roleOptions = [ 
    {id: 'admin', name: 'admin'},
    {id: 'customer', name: 'customer'}
]

/* custom validation */
const validatePasswordsMatch = (value, allValues) => {
    if(allValues.password !== allValues.confirmPassword){
        return 'The entered passwords do not match'
    } 
    return undefined
}

/* Validation Options */
const validateUsername = [required(), minLength(6)]
const validateEmail = [required(), email()]
const validateForname = [required(), minLength(2)]
const validateSurname = [required(), minLength(2)]
const validateRoles = [required(), choices(['admin', 'customer'])]
const validatePasswords = [required(), minLength(5), validatePasswordsMatch]

export const UserCreate = () => (

    <Create>
        <SimpleForm>
            <TextInput source="username" fullWidth validate={validateUsername} />
            <TextInput source="email" fullWidth validate={validateEmail} />
            <TextInput source="forename" fullWidth validate={validateForname} />
            <TextInput source="surname" fullWidth validate={validateSurname} />
            <SelectInput source="roles" choices={roleOptions} validate={validateRoles} />
            <TextInput label="Password" source="password" validate={validatePasswords} />
            <TextInput label="Confirm Password" source="confirmPassword" validate={validatePasswords} />
        </SimpleForm>
    </Create>
    
);