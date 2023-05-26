import { 
    Datagrid,
    DateField, 
    List, 
    TextField,
    EditButton,
    ShowButton,
    DeleteButton,
    TextInput,

} from 'react-admin';

/* Add in search and filtering to the list view */
const filterOptions = [
    <TextInput source="name" label="search" alwaysOn />,
]

export const CategoryList = () => (
    <List filters={filterOptions}>
        <Datagrid >
            <TextField source="id" />
            <TextField source="name" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
            <EditButton />
            <ShowButton />
            <DeleteButton />
        </Datagrid>
    </List>
);