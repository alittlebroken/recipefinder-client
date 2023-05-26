import { 
    DateInput,
    Create, 
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

export const StepCreate = () => (
    <Create>
        <SimpleForm>
            <ReferenceInput source="recipeId" reference="recipes" fullWidth>
                <SelectInput optionText="name" optionValue="id" validate={validateRecipe}  fullWidth/>
            </ReferenceInput>
            <TextInput source="content" multiline validate={validateContent} fullWidth/>
            <NumberInput source="stepNo" validate={validateStepNo} fullWidth/>
            <DateInput source="created_at" disabled fullWidth/>
            <DateInput source="updated_at" disabled fullWidth/>
        </SimpleForm>
    </Create>
);