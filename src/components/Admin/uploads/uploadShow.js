import { 
    DateField, 
    NumberField, 
    Show, 
    SimpleShowLayout, 
    TextField,
    ReferenceField
} from 'react-admin';

import ShowImage from '../CustomUI/ShowImage'

export const UploadShow = () => (
    <Show>
        <SimpleShowLayout>
            <ShowImage />
            <TextField source="id" />
            <ReferenceField source="userId" reference="users" >
                <TextField source="email" />
            </ReferenceField>
            <TextField source="src" />
            <TextField source="title" />
            <TextField source="alt" />
            <TextField source="mimetype" />
            <TextField source="resource" />
            <NumberField source="resourceid" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
        </SimpleShowLayout>
    </Show>
)