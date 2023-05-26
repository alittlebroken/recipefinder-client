import { 
    DateInput,
    Edit, 
    useRecordContext,
    ReferenceInput, 
    TextInput,
    NumberInput,
    SelectInput,
    SimpleForm,
    number,
    required,
    minLength
} from 'react-admin';

/* Set the validation functions */
const validateRecipe = [required()]
const validateStepNo = [required(), number()]
const validateContent = [required(), minLength(2)]

/* Generate the title for the page */
const PageTitle = () => {

    /* Get the recordContext so we have access to the data displayed in the edit page */
    const record = useRecordContext()
    return <span>Edit { record ? `"Step No: ${record.stepNo}"` : '' } </span>
}

export const StepEdit = () => (
    <Edit title={<PageTitle />}>
        <SimpleForm>
            <TextInput source="id" disabled fullWidth/>
            <ReferenceInput source="recipeId" reference="recipes" fullWidth>
                <SelectInput optionText="name" optionValue="id" validate={validateRecipe}  fullWidth/>
            </ReferenceInput>
            <TextInput source="content" multiline validate={validateContent} fullWidth/>
            <NumberInput source="stepNo" validate={validateStepNo} fullWidth/>
            <DateInput source="created_at" disabled fullWidth/>
            <DateInput source="updated_at" disabled fullWidth/>
        </SimpleForm>
    </Edit>
);