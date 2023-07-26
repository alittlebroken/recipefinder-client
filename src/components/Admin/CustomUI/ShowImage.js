import {
    useRecordContext
} from 'react-admin'

import './ShowImage.css'
import ShowImageTitle from './ShowImageTitle'

const ShowImage = () => {
    const record = useRecordContext()
    let images = []
    
    if(record?.pictures && record?.pictures.length >= 1){
        record.pictures.forEach(picture => {
                images.push({
                    src: picture.src,
                    title: picture.title
                })
            })
    } else if (record?.pictures){
        images.push({ 
            src: record.pictures.src,
            title: record.pictures.title
        })
    } else if (record?.src) {
        images.push({ 
            src: record.src,
            title: record.title
        })
    } 

    console.log('Final images list: ', images)

    return (
        <span className="imageContainer">

            <div className="cards">
            {images.length > 0 && images.map(image => (
                    <div className="card-admin">
                        <img src={image.src} title={image.title} alt={image.title} />
                        <div className="card-info">
                            <h3>{image.title}</h3>
                        </div>
                    </div>
            ))}
            </div>

        </span>
    )
}

export default ShowImage