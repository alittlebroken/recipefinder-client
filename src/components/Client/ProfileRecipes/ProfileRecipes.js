import './ProfileRecipes.css'

const ProfileRecipes = () => {

    return (
        <div aria-label="recipes container" className="pr-container flex">

            <div aria-label="recipes header container" className="pr-header-container">
                <h2 className="pr-head-2">Recipes</h2>
                <button className="btn pr-btn-new">New</button>
            </div>

            <div aria-label="recipe filter container" className="pr-filter-container">


            </div>

            <div aria-label="recipes container" className="pr-recipes-container">

            </div>


        </div>
    )
}

export default ProfileRecipes