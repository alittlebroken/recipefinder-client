import './RecipeInformation.css'

const RecipeInformation = ({info}) => {


    return (
        <div aria-label="container for recipe information" className="recipeInfoContainer flex">
            <h3>Information</h3>

            <div aria-label="list of informational items" className="infoItems flex">

                <div aria-label="container for individual informational item" className="infoItem flex">
                   <h4>{info.calories}</h4>
                   <hr />
                   Calories
                </div>

                <div aria-label="container for individual informational item" className="infoItem flex">
                   <h4>{info.servings}</h4>
                   <hr />
                   Servings
                </div>

                <div aria-label="container for individual informational item" className="infoItem flex">
                   <h4>{info.prep_time}</h4>
                   <hr />
                   Prep time ( mins )
                </div>

                <div aria-label="container for individual informational item" className="infoItem flex">
                   <h4>{info.cook_time}</h4>
                   <hr />
                   Cook time ( mins )
                </div>

            </div>
        </div>
    )

}

export default RecipeInformation