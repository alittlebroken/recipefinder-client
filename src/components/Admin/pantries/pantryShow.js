import { 
    Show, 
    ReferenceField, 
    TextField,
    SelectField,
    NumberField,
    Datagrid,
    ArrayField,
    TabbedShowLayout,
} from 'react-admin';

export const PantryShow = () => (
    <Show>
        <TabbedShowLayout>
            <TabbedShowLayout.Tab label="Details">
                <TextField source="id" fullWidth/>
                <ReferenceField label="User" source="id" reference="users" >
                    <TextField source="email" />
                </ReferenceField>
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="Ingredients">
                <ArrayField source="ingredients">
                    <Datagrid bulkActionButtons={false} empty={<div>No ingredients found</div>}>
                        <TextField source="name" />
                        <NumberField source="amount" />
                        <TextField source="amount_type" />
                    </Datagrid>
                </ArrayField>
            </TabbedShowLayout.Tab>
        </TabbedShowLayout>
    </Show>
);