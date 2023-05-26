import { 
    Edit, 
    ReferenceInput, 
    TextInput,
    SelectInput,
    NumberInput,
    SimpleFormIterator,
    ArrayInput,
    TabbedForm,
    required,
    number,
    minLength
} from 'react-admin';

/* Validation functions */
const validateIngredient = [required()]
const validateAmount = [required(), number()]
const validateAmountType = [required(), minLength(2)]

export const PantryEdit = () => (
    <Edit>
        <TabbedForm>
            <TabbedForm.Tab label="Details">
                <TextInput source="id" disabled fullWidth/>
                <ReferenceInput source="id" reference="users" >
                    <SelectInput 
                    optionText="email" 
                    optionValue="id"
                    defaultValue="username" 
                    fullWidth 
                    disabled />
                </ReferenceInput>
            </TabbedForm.Tab>
            <TabbedForm.Tab label="Ingredients">
                <ArrayInput source="ingredients">
                    <SimpleFormIterator inline>
                        <ReferenceInput source="ingredientId" reference="ingredients">
                            <SelectInput 
                            label="Ingredient"  
                            optionText="name" 
                            optionValue="id" 
                            defaultValue="ingredientId"
                            validate={validateIngredient}
                            />
                        </ReferenceInput>
                        <NumberInput source="amount" validate={validateAmount} />
                        <TextInput source="amount_type" validate={validateAmountType} />
                    </SimpleFormIterator>
                </ArrayInput>
            </TabbedForm.Tab>
        </TabbedForm>
    </Edit>
);