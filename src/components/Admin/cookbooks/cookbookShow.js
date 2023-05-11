import { 
    DateField, 
    ReferenceField, 
    Show, 
    SimpleShowLayout, 
    TextField,
} from 'react-admin';

import ShowImage from '../CustomUI/ShowImage'
import ShowImageTitle from '../CustomUI/ShowImageTitle'

export const CookbookShow = () => {
    
    return (

    <Show>
        <SimpleShowLayout>
            <ShowImageTitle source="name" showTitle/>
            <ShowImage />
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
)};