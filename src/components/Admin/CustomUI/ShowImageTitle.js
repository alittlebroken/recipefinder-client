import "./ShowImageTitle.css"

import { useRecordContext } from 'react-admin'

const ShowImageTitle = ({showTitle, title, source}) => {

    const record = useRecordContext()

    let imageTitle
    if(source){
        imageTitle = record[source]
    } else {
        imageTitle = title
    }

    return (
        <span className="ImageTitleContainer">
            {showTitle && <h2>{imageTitle}</h2>}
        </span>
    )
}

export default ShowImageTitle