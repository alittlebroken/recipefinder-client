import { DateField, ReferenceField, Show, SimpleShowLayout, TextField } from 'react-admin';

export const CookbookShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <ReferenceField source="userId" reference="users">
                <TextField source="email" />
            </ReferenceField>
            <TextField source="name" />
            <TextField source="description" />
            <TextField source="image" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
        </SimpleShowLayout>
    </Show>
);