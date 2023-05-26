import { 
    DateField,
    Show, 
    SimpleShowLayout,
    useRecordContext,
    ReferenceField, 
    TextField,
    NumberField,
    SelectField,
} from 'react-admin';


/* Generate the title for the page */
const PageTitle = () => {

    /* Get the recordContext so we have access to the data displayed in the edit page */
    const record = useRecordContext()
    return <span>Edit { record ? `"${record.name}"` : '' } </span>
}

export const StepShow = () => (
    <Show title={<PageTitle />}>
        <SimpleShowLayout>
            <TextField source="id" fullWidth/>
            <ReferenceField source="recipeId" reference="recipes" fullWidth>
                <TextField source="name" fullWidth/>
            </ReferenceField>
            <TextField source="content" multiline fullWidth/>
            <NumberField source="stepNo" fullWidth/>
            <DateField source="created_at" fullWidth/>
            <DateField source="updated_at" fullWidth/>
        </SimpleShowLayout>
    </Show>
);