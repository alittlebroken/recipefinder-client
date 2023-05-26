import { 
    DateField, 
    Show, 
    SimpleShowLayout, 
    TextField 
} from 'react-admin';

/* Import custom components */
import ShowImage from '../CustomUI/ShowImage'
import { ShowImageTitle } from '../CustomUI/ShowImageTitle'

export const IngredientShow = () => (
    <Show>
        <SimpleShowLayout>
            <ShowImage />
            <TextField source="id" />
            <TextField source="name" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
        </SimpleShowLayout>
    </Show>
);