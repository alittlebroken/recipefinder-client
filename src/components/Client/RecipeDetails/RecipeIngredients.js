import './RecipeIngredients.js'

const RecipeIngredients = ({ingredients}) => {
    return (
        <div aria-label="list of ingredients" className="ingredientsList flex">

            <h3>Ingredients</h3>
            <ul className="ingredientList">

                {ingredients.map(ingredient => {
                    return (
                        <li className="ingredientItem">{ingredient.amount} {ingredient.amountType} of {ingredient.name}</li>
                    )
                })}

            </ul>

        </div>
    )
}

export default RecipeIngredients