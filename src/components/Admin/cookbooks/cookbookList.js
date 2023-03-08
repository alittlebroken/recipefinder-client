import { 
    Datagrid, 
    DateField, 
    List, 
    ReferenceField, 
    TextField, 
    EditButton, 
    TextInput, 
    ReferenceInput, 
    SelectInput,
    ShowButton,
    DeleteButton
} from 'react-admin';

/* Add in search and filtering to the list view */
const filterOptions = [
    <TextInput source="name" label="search" alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users">
        <SelectInput optionText="email" />
    </ReferenceInput>
]

const CookbookList = () => (
    <List filters={filterOptions}>
        <Datagrid>
            <TextField source="id" />
            <ReferenceField source="userId" reference="users" emptyText="Missing user">
                <TextField source="email" />
            </ReferenceField>
            <TextField source="name" />
            <TextField source="description" />
            <TextField source="image" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
            <EditButton />
            <ShowButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export default CookbookList