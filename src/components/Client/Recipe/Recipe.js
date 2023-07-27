/* Import other components */
import Card from '../../UI/Cards/Card'
import Button from  '../../UI/Button/Button'
import { useNavigate } from 'react-router-dom'

const Recipe = (props) => {

    /* Destructure the props */
    const { record } = props

    /* Handle a click to show more details for a recipe */
    const navigate = useNavigate()

    return (
        <Card 
         
        thinBorder 
        >
            <Card.Image 
                source={record.src} 
                title={record.title}
                altText={record.alt}
                
            /> 
            <Card.Body>
                <Card.Title text={record.name} medium />
                {record.textContent}
            </Card.Body>
            <Card.Actions alignCenter>
                <Button 
                clickHandler={() => {navigate(`/recipe/${record.id}`)}} 
                widthFull  
                >
                    More
                </Button>
            </Card.Actions>
        </Card>
    )
}

export default Recipe