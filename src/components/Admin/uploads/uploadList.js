import { 
    Datagrid, 
    List, 
    TextField,
    EditButton,
    DeleteButton,
    ShowButton,
    ReferenceField,
    TextInput,
    useRecordContext
} from 'react-admin';

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

/* Add in search and filtering to the list view */
const filterOptions = [
    <TextInput source="title" label="search" alwaysOn />,
    <TextInput source="resource" />,
]

export const UploadList = () => (
    <List filters={filterOptions}>
        <Datagrid>
            <TextField source="id"/>
            <DataGridImage />
            <ReferenceField source="userid" reference="users" emptyText="Missing user">
                <TextField source="email" />
            </ReferenceField>
            <TextField source="title" />
            <TextField source="resource" />
            <EditButton />
            <ShowButton />
            <DeleteButton />
        </Datagrid>
    </List>
);