import './PopularRecipes.css'

import Recipe from '../Recipe/Recipe'
import Card from '../../UI/Cards/Card'

const PopularRecipes = (props) => {

    /* Destructure any props */
    const {
        records
    } = props

    return (
        <div aria-label="popular recipes container" className="popularrecipes-container">
            <h3>Popular Recipes</h3>
            <Card.List>
                {records.map((recipe) => {
                    return <Recipe record={recipe} />
                })}
            </Card.List>
        </div>
    )

}

export default PopularRecipes;