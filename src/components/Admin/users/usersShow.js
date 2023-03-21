import { 
    Show, 
    SimpleShowLayout,
    TextField,
} from 'react-admin';

export const UserShow = () => (

    <Show>
        <SimpleShowLayout>
            <TextField source="id" disabled fullWidth />
            <TextField source="username" fullWidth />
            <TextField source="email" fullWidth />
            <TextField source="forename" fullWidth />
            <TextField source="surname" fullWidth />
            <TextField source="roles" />
        </SimpleShowLayout>
    </Show>
    
);