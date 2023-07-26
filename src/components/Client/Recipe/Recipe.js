/* Import other components */
import Card from '../../UI/Cards/Card'
import { useNavigate } from 'react-router-dom'

const Recipe = (props) => {

    /* Destructure the props */
    const { record } = props

    /* Handle a click to show more details for a recipe */
    const navigate = useNavigate()
    const handleClick = (id) => {
        navigate(`/recipe/${id}`)
    }

    return (
        <Card>
            <Card.Image 
                source={record.src} 
                title={record.title}
                altText={record.alt}
            /> 
            <Card.Body>
                <Card.Title text={record.name} medium />
                {record.textContent}
            </Card.Body>
            <Card.Actions>
                <button onClick={handleClick(record.id)}>More</button>
            </Card.Actions>
        </Card>
    )
}

export default Recipe