import './LatestRecipes.css'

import Card from '../../UI/Cards/Card'
import Recipe from '../Recipe/Recipe'

const LatestRecipes = (props) => {

    // Destructure the passed in props
    const {
        recipes,
    } = props

    return (
        <div aria-label="latestRecipes container" className="latestRecipeContainer">
            <h3>Latest Recipes</h3>
            <Card.List>
                {recipes.map( recipe => {
                    return <Recipe record={recipe} />
                })}
            </Card.List>
        </div>
    )

}

export default LatestRecipes