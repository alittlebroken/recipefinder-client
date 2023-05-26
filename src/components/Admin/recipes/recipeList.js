import { 
    Datagrid, 
    List, 
    NumberField, 
    NumberInput,
    TextField,
    ReferenceField,
    TextInput,
    EditButton,
    ShowButton,
    DeleteButton 
} from 'react-admin';

/* Add in search and filtering to the list view */
const filterOptions = [
    <TextInput source="name" label="search" alwaysOn />,
    <NumberInput source="servings" />,
    <NumberInput source="calories_per_serving" />,
    <NumberInput source="prep_time" />,
    <NumberInput source="cook_time" />,
    <NumberInput source="rating" />
]

export const RecipeList = () => (
    <List filters={filterOptions}>
        <Datagrid>
            <TextField source="id" />
            <ReferenceField source="userId" reference="users">
                <TextField source="email" />
            </ReferenceField>
            <TextField source="name" />
            <EditButton />
            <ShowButton />
            <DeleteButton />
        </Datagrid>
    </List>
);