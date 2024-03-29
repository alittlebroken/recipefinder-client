import { 
    Edit, 
    NumberInput, 
    TextInput,
    useRecordContext,
    AutocompleteInput,
    required,
    minLength,
    maxLength,
    email,
    number,
    ReferenceInput,
    TabbedForm,
    SelectInput,
    SimpleFormIterator,
    ArrayInput,
    ArrayField,
    TextField,
    Datagrid,
    EditButton,
    DeleteButton,
    ImageInput,
    ImageField
} from 'react-admin';

/* Import custom components */
import ShowImage from '../CustomUI/ShowImage'
import { ShowImageTitle } from '../CustomUI/ShowImageTitle'

/* Generate the title for the page */
const PageTitle = () => {

    /* Get the recordContext so we have access to the data displayed in the edit page */
    const record = useRecordContext()
    return <span>Edit { record ? `"${record.name}"` : '' } </span>
}

/* Get the ENV we are for the file upload name */
const getFileUploadName = () => {
    return process.env.REACT_APP_ENV === 'production' ? 'images' : 'tests'
}

/* Display an image */
const DataGridImage = () => {
    const record = useRecordContext()
    const divStyle = {
        width: '75px',
        height: '75px',
        borderRadius: '10px'
    }
    return <span><img src={record.src} alt={record.title} style={divStyle} /></span>
}


/* Validation for the inout fields */
const validateName = [required(), minLength(2), maxLength(255)]
const validateEmail = [required(), email()]
const validateDescription = [required(), minLength(2)]
const validateServings = [required(), number()]
const validateCaloriesPerServing = [required(), number()]
const validatePrepTime = [required(), number()]
const validateCookTime = [required(), number()]

const validateIngredient = [required()]
const validateAmount = [required(), number()]
const validateAmountType = [required(), minLength(1)]

const validateStepNo = [required(), number()]
const validateStepContent = [required(), minLength(2)]

const validateCookbook = [required()]

const validateCategory = [required()]

const validateImageTitle = [required(), minLength(2)]

export const RecipeEdit = () => (

    <Edit title={<PageTitle />}>

        <TabbedForm spacing={2}>
            <TabbedForm.Tab label="Summary">

                <TextInput source="id" disabled  fullWidth />
                <ReferenceInput source="userId" reference="users">
                    <AutocompleteInput optionText="email" fullWidth validate={validateEmail} />
                </ReferenceInput>
                <TextInput source="name" validate={validateName} fullWidth />
                <TextInput source="description" validate={validateDescription} multiline  fullWidth />
                <NumberInput source="servings" validate={validateServings} fullWidth/>
                <NumberInput source="calories_per_serving" validate={validateCaloriesPerServing} fullWidth/>
                <NumberInput source="prep_time" validate={validatePrepTime} fullWidth />
                <NumberInput source="cook_time" validate={validateCookTime} fullWidth />

            </TabbedForm.Tab>

            <TabbedForm.Tab label="Ingredients">

                <ArrayInput source="ingredients">
                    <SimpleFormIterator inline>
                        <ReferenceInput source="ingredientId" reference="ingredients">
                            <SelectInput label="Ingredient" validate={validateIngredient} optionText="name" optionValue="id" defaultValue="ingredientId"/>
                        </ReferenceInput>
                        <NumberInput source="amount" validate={validateAmount} />
                        <TextInput source="amount_type" validate={validateAmountType} />
                    </SimpleFormIterator>
                </ArrayInput>

            </TabbedForm.Tab>

            <TabbedForm.Tab label="Steps">

                <ArrayInput source="steps">
                    <SimpleFormIterator inline>
                        <NumberInput source="stepNo" validate={validateStepNo} />
                        <TextInput source="content" validate={validateStepContent} fullWidth multiline/>
                    </SimpleFormIterator>
                </ArrayInput>

            </TabbedForm.Tab>

            <TabbedForm.Tab label="Cookbooks">

                <ArrayInput source="cookbooks">
                    <SimpleFormIterator inline fullWidth>
                        <ReferenceInput source="cookbookId" reference="cookbooks" >
                            <AutocompleteInput 
                            label="Name" 
                            optionText="name" 
                            optionValue="id" 
                            fullWidth
                            validate={validateCookbook}
                            />
                        </ReferenceInput>
                    </SimpleFormIterator>
                </ArrayInput>

            </TabbedForm.Tab>

            <TabbedForm.Tab label="Categories">
                
                <ArrayInput source="categories">

                    <SimpleFormIterator inline fullWidth>
                        <ReferenceInput source="categoryId" reference="categories">
                            <SelectInput 
                            label="Name" 
                            optionText="name" 
                            optionValue="id" 
                            fullWidth 
                            validate={validateCategory}
                            />
                        </ReferenceInput>
                    </SimpleFormIterator>
                </ArrayInput>

            </TabbedForm.Tab>

            <TabbedForm.Tab label="Images">
            
                    <ImageInput source={getFileUploadName()} label="Images" accept="image/*">
                        <ImageField source="src" label="title"/>  
                    </ImageInput>
                    <TextInput label="Title" source="title" fullWidth validate={validateImageTitle}/>

                <ArrayField source="pictures" fullWidth>

                   <Datagrid bulkActionButtons={false} fullWidth>
                        <DataGridImage />
                        <TextField source="title" label="Title" />
                        <EditButton resource="uploads" />
                        <DeleteButton resource="uploads" />
                   </Datagrid>
                </ArrayField>

            </TabbedForm.Tab>

        </TabbedForm>

    </Edit>
);