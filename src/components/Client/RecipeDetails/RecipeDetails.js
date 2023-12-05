import './RecipeDetails.css'

import Carousel from '../../UI/Carousel/Carousel'
import RecipeSteps from './RecipeSteps'
import RecipeIngredients from './RecipeIngredients'
import RecipeInformation from './RecipeInformation'
import RecipeCategories from './RecipeCategories'

import useRecipe from '../../../hooks/useRecipe'

const RecipeDetails = ({id}) => {

    /* Extract the details for the recipe */
    const recipe = useRecipe(id)

    return(
        <div aria-label="recipe detail container" className="recipeContainer">

            <div aria-label="recipe header container" className="recipeHeaderContainer">
                <h2 className="recipeTitle">{recipe.name}</h2>
            </div>

            <RecipeCategories categories={recipe.categories} />

            <div aria-label="recipe description" className="recipeDescription">
                {recipe.description}
            </div>

            <Carousel>

                {recipe.images.map( (slide, idx) => {
                    return <div key={idx} aria-label="carousel image slide" className="carouselSlide">
                        <img src={slide.src} title={slide.title} alt={slide.alt} />
                    </div>
                })}

            </Carousel>

            <div aria-label="recipe details container" className="recipeDetailsContainer">

                <div aria-label="recipe details left container" className="recipeDetailsLeft">

                    <RecipeSteps steps={recipe.steps} />

                </div>

                <div aria-label="recipe details right container" className="recipeDetailsRight">

                    <RecipeIngredients ingredients={recipe.ingredients} />

                    <RecipeInformation information={{
                        servings: recipe.servings,
                        calories: recipe.calories_per_serving,
                        prep_time: recipe.prep_time,
                        cook_time: recipe.cook_time
                    }} />

                </div>

            </div>

        </div>
    )

}

export default RecipeDetails