import {
    useRecordContext
} from 'react-admin'

import './ShowImage.css'

const ShowImage = () => {
    const record = useRecordContext()
    return (
        <span className="imageContainer">
            <img src={record.src} alt={record.title} className="preview" />
        </span>
    )
}

export default ShowImage