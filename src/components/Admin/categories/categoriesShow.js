import { 
    DateField, 
    ReferenceField, 
    Show, 
    SimpleShowLayout, 
    TextField 
} from 'react-admin';

export const CategoryShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
        </SimpleShowLayout>
    </Show>
);