import './PopularRecipes.css'

import Recipe from '../Recipe/Recipe'

const PopularRecipes = (props) => {

    /* Destructure any props */
    const {
        records
    } = props

    return (
        <div aria-label="popular recipes container" className="popularrecipes-container">
            <h2>Popular Recipes</h2>
            {records.map((recipe) => {
                return <Recipe record={recipe} />
            })}
        </div>
    )

}

export default PopularRecipes;