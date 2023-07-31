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
        <Card key={record.id}
        thinBorder 
        >
            <Card.Image 
                source={record?.images[0]?.source} 
                title={record?.images[0]?.title}
                altText={record?.images[0]?.alt}
                
            />
            <Card.Title text={record.name} medium />
            <Card.Container>
                <Card.Body>
                    {record.description}
                </Card.Body>
                <Card.Actions alignCenter>
                    <Button 
                    clickHandler={() => {navigate(`/recipe/${record.id}`)}} 
                    widthFull  
                    >
                        More
                    </Button>
                </Card.Actions>
            </Card.Container>
        </Card>
    )
}

export default Recipe