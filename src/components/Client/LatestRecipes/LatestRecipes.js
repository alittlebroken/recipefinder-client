import './LatestRecipes.css'

import Card from '../../UI/Cards/Card'
import Recipe from '../Recipe/Recipe'

const LatestRecipes = (props) => {

    // Destructure the passed in props
    const {
        recipes,
    } = props

    return (
        <div aria-label="latest recipes layer" className="latest-layer">
            <div aria-label="latestRecipes container" className="latestRecipeContainer">
                <h3>Latest Recipes</h3>
                <Card.List>
                    {recipes.map( recipe => {
                        return <Recipe key={recipe.id} record={recipe} />
                    })}
                </Card.List>
            </div>
        </div>
    )

}

export default LatestRecipes