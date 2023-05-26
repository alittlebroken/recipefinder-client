import { 
    NumberField, 
    ReferenceField, 
    Show,  
    TextField,
    TabbedShowLayout,
    ArrayField,
    Datagrid,
    ChipField,
    SingleFieldList,
    SimpleShowLayout,
    List,
    WrapperField,
    Labeled
} from 'react-admin';

/* Import custom components */
import ShowImage from '../CustomUI/ShowImage'
import { ShowImageTitle } from '../CustomUI/ShowImageTitle'

/* add custom components for displaying data */
export const RecipeShow = () => (
    <Show>
        <TabbedShowLayout spacing={2}>

            <TabbedShowLayout.Tab label="Summary">

                <TextField source="id" />
                <ArrayField source="categories">
                    <SingleFieldList>
                        <ChipField source="name" />
                    </SingleFieldList>
                </ArrayField>
                <ReferenceField source="userId" reference="users" >
                    <TextField source="email" />
                </ReferenceField>
                <TextField source="name" />
                <TextField source="description" />
                <NumberField source="servings" />
                <NumberField source="calories_per_serving" />
                <NumberField source="prep_time" />
                <NumberField source="cook_time" />
                <TextField source="rating" />
                
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

            <TabbedShowLayout.Tab label="Steps">
                <ArrayField source="steps">
                    <Datagrid bulkActionButtons={false} empty={<div>No steps found</div>}>
                        <TextField source="stepNo" />
                        <TextField source="content" multiline />
                    </Datagrid>
                </ArrayField>
            </TabbedShowLayout.Tab>

            <TabbedShowLayout.Tab label="Cookbooks">
                <ArrayField source="cookbooks">
                    <Datagrid bulkActionButtons={false} empty={<div>No cookbooks found</div>}>
                        <TextField source="name" />
                        <TextField source="description" multiline />
                        <TextField source="image" />
                    </Datagrid>
                </ArrayField>
            </TabbedShowLayout.Tab>

            <TabbedShowLayout.Tab label="Images">
                <ShowImage />
            </TabbedShowLayout.Tab>

        </TabbedShowLayout>
    </Show>
);