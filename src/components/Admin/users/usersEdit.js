import { 
    Edit, 
    TextInput,
    TabbedForm,
    SelectInput,
    required,
    minLength,
    email,
    choices
} from 'react-admin';

import ResetPassword from '../ResetPassword/resetPassword'

/* Choices for the roles a user can have.
 * Only two choices for now but as we add
 * m ore we can move to a DB table and use a 
 * reference input to get the values
 */
const roleOptions = [ 
    {id: 'admin', name: 'admin'},
    {id: 'customer', name: 'customer'}
]


/* Validation Options */
const validateUsername = [required(), minLength(6)]
const validateEmail = [required(), email()]
const validateForname = [required(), minLength(2)]
const validateSurname = [required(), minLength(2)]
const validateRoles = [required(), choices(['admin', 'customer'])]

export const UserEdit = () => (

    <Edit>
        <TabbedForm>
            <TabbedForm.Tab label="Details">
                <TextInput source="id" disabled fullWidth />
                <TextInput source="username" fullWidth validate={validateUsername} />
                <TextInput source="email" fullWidth validate={validateEmail} />
                <TextInput source="forename" fullWidth validate={validateForname} />
                <TextInput source="surname" fullWidth validate={validateSurname} />
            </TabbedForm.Tab>
            <TabbedForm.Tab label="Security">
                <SelectInput source="roles" choices={roleOptions} validate={validateRoles} />
                <ResetPassword />
            </TabbedForm.Tab>
        </TabbedForm>
    </Edit>
    
);