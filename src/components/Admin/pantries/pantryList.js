import { 
    Datagrid, 
    List, 
    TextField,
    EditButton,
    ShowButton,
    DeleteButton
} from 'react-admin';

export const PantryList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="username" />
            <TextField source="numIngredients" />
            <EditButton />
            <ShowButton />
            <DeleteButton />
        </Datagrid>
    </List>
);