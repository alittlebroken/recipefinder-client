import "./Category.css"
import { Link, useNavigate } from "react-router-dom"

import { 
    setSearchTerms,
    setSearchOptions,
 } from '../../../slices/Search/SearchSlice'

import Card from '../../UI/Cards/Card'
import { useDispatch } from "react-redux"

const Category = (props) => {

    /* Destructure the passed in props */
    const {
        record
    } = props

    /* Alias the various hooks */
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <Card key={record.id} overlay rounded>
            <Link 
                to=''
                onClick={(e) => {
                    dispatch(setSearchTerms(record.name.toLowerCase()))
                    dispatch(setSearchOptions('categories'))
                    navigate(`/recipes/${record.name.toLowerCase()}`)
                }}
            >
                <Card.Container>
                    <Card.Image 
                    rounded 
                    source={"https://media.istockphoto.com/id/1278745986/photo/culinary-background-with-traditional-ingredients-of-italian-cuisine.webp?b=1&s=170667a&w=0&k=20&c=jct5dpWc9sFrs6g4_u9n1aV7IDBEJ5n3T9lF75sMft8="}
                    alt="Various veg on a slate board with some oil" 
                    title="Various veg on a slate board with some oil"
                    />
                    <Card.Overlay center>
                        <Card.Title text={record.name} medium />
                    </Card.Overlay>
                </Card.Container>
            </Link>
        </Card>
    )
}

export default Category