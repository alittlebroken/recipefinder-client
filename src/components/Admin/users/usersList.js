import { 
    Datagrid, 
    EmailField, 
    List, 
    TextField,
    EditButton,
    ShowButton,
    DeleteButton,
    TextInput
} from 'react-admin';

/* Add in search and filtering to the list view */
const filterOptions = [
    <TextInput source="username" label="search" alwaysOn resettable autocomplete='off' />,
]

export const UserList = () => (
    <List filters={filterOptions}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="username" />
            <EmailField source="email" />
            <TextField source="roles" />
            <TextField source="forename" />
            <TextField source="surname" />
            <EditButton />
            <ShowButton />
            <DeleteButton />
        </Datagrid>
    </List>
);