/* Import other components */
import Card from '../../UI/Cards/Card'

const Recipe = (props) => {

    /* Destructure the props */
    const { record } = props

    /* Get image details out of the passed in record */
    let imgSource, imgTitle, imgAlt
    if(record.images === undefined || record?.images?.length < 1){
        imgSource = 'https://fakeimg.pl/600x400?text=No+image'
        imgTitle = 'No Image currently Available'
        imgAlt = imgTitle
    } else {
        imgSource = record?.images[0]?.source
        imgTitle = record?.images[0]?.title
        imgAlt = record?.images[0]?.alt
    }

    return (
        <Card key={record.id}
        is={{ width: 400 }}
        >
            <Card.Image 
                source={imgSource} 
                title={imgTitle}
                altText={imgAlt}
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