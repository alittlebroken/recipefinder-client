/* Import other components */
import Card from '../../UI/Cards/Card'

const Recipe = (props) => {

    /* Destructure the props */
    const { record } = props

    return (
        <Card key={record.id}
        is={{ width: 400 }}
        >
            <Card.Image 
                source={record?.images[0]?.source} 
                title={record?.images[0]?.title}
                altText={record?.images[0]?.alt}
                is={{ borderRadius: 15}}
            />
            <Card.Container>
                <Card.Title text={record.name} medium link={`/recipe/${record.id}`} is={{ display: 'flex', justifyContent: 'center' }} />
                <Card.Tags is={{ display: 'flex', justifyContent: 'center' }} >
                    {record.categories.map((category) => {
                        return <Card.Tag key={category.id} text={category.name} />
                    })}
                </Card.Tags>
            </Card.Container>
            
        </Card>
    )
}

export default Recipe