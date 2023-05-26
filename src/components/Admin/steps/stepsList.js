import { 
    Datagrid, 
    DateField, 
    List, 
    NumberField, 
    ReferenceField, 
    TextField,
    useRecordContext,
    TextInput,
    NumberInput,
    EditButton,
    ShowButton,
    DeleteButton,
    CreateButton
} from 'react-admin';

/* Component to display the step content in an expandable field */
const StepExpandContent = () => {
    const record = useRecordContext()
    return (
        <div>{record.content}</div>
    )
}

/* Filters for narrowing down the data returned */
const filterOptions = [
    <TextInput source="content" label="Search" alwaysOn />,
    <NumberInput source="stepNo" />,
]

export const StepList = () => (
    <List filters={filterOptions}>
        <Datagrid expand={<StepExpandContent />}>
            <TextField source="id" />
            <ReferenceField source="recipeId" reference="recipes">
                <TextField source="name" />
            </ReferenceField>
            <NumberField source="stepNo" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
            <EditButton />
            <ShowButton />
            <DeleteButton />
        </Datagrid>
    </List>
);