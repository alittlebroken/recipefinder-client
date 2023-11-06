import './ProfileCookbook.css'

const ProfileCookbook = (props) => {

    /* Destructure the props passed in */
    const {
        cookbook
    } = props

    return (
        
        <div aria-label="cookbook container" className="cb-container flex">

            <img 
                src={cookbook.src}
                title={cookbook.title}
                alt={cookbook.alt}
            />

            <h2 className="cb-head-2">
                {cookbook.name}
            </h2>

            <div aria-label="cookbook description" className="cb-description">
                {cookbook.description}
            </div>

            <div aria-label="recipes container" className="cb-recipe-list flex">

                {recipes.map( recipe => {

                    <div aria-label="recipe-container" className="cb-recipe-container flex">

                        <img 
                            src={recipe.images[0].imageSrc} 
                            title={recipe.images[0].imageTitle}
                            alt={recipe.images[0].imageAlt}
                        />

                        <div aria-label="recipe content" className="cb-recipe-content flex">

                            <div aria-label='recipe details' className="cb-recipe-details flex">

                                <h3 className="cb-head-3">{recipe.name}</h3>

                                <p aria-label="recipe description" className="cb-recipe-desc">
                                    {recipe.description}
                                </p>

                            </div> 

                            <div aria-label="recipe actions" className="cb-recipe-actions flex">

                                <button name="remove" className="btn cb-action-btn flex">Remove</button>
                                <button name="moreInfo" classname="btn cb-action-btn flex">More Info</button>
                            </div> 

                        </div>

                    </div>

                })}

            </div>

        </div>

    )

}

export default ProfileCookbook