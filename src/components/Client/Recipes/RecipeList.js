import './Recipes.css'
import { nanoid } from '@reduxjs/toolkit'

const RecipeList = ({ recipes, showModal, setRecipe, navigateTo, profile, setCookbook = undefined}) => {

    /* Check we have a valid list of recip[es to display */
    if(!recipes || recipes?.length < 1){
        return (
            <div aria-label="empty recipe list container" className="recipeListEmpty flex">No recipes found</div>
        )
    } else {
        return (<div aria-aria-label="recipe list container" className="recipeListContainer flex">{
            recipes.map(recipe => {
                return (
                    <div key={nanoid()} aria-label="container for recipe" className="recipeContainer flex">

                            <img 
                                src={recipe?.images[0]?.source} 
                                title={recipe?.images[0]?.title}
                                alt={recipe?.images[0]?.alt ? recipe?.images[0]?.alt : recipe?.images[0]?.title}
                                className="recipeImage"
                            />

                            
                                <h3 className="recipeHeading">{recipe.name}</h3>

                                
                                    <div aria-label="recipe description" className="recipeDescription">
                                    {recipe.description}
                                    </div>

                                    <div aria-label="recipe actions" className="recipeActions flex">
                                        <button onClick={(e) => {
                                            navigateTo(`/recipe/${recipe.id}`)
                                        }}>More Info</button>
                                        {profile.userId && (
                                            <button onClick={(e) => {
                                                setCookbook('Please select a cookbook')
                                                setRecipe(recipe.id)
                                                showModal(true)
                                            }}>Add</button>
                                        )}
                                    </div>
                                
                            
                        </div>
                )
            })
        }</div>)
    }
    
}

export default RecipeList