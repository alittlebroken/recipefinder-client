import './ProfileDataBar.css'
import { Link } from 'react-router-dom'

const ProfileDataBar = (props) => {

    /* Destructure the passed in props */
    const {
        recipeCount,
        ingredientCount,
        cookbookCount,
        pantryCount
    } = props

    return (
        <div aria-label="profile data bar" className="pdb-container flex flex-row">
          <Link to="/profile/pantry" data-descr="12" className="pdb-link-btn flex" >Pantry</Link>
          <Link to="/profile/ingredients" data-descr="12" className="pdb-link-btn flex" >Ingredients</Link>
          <Link to="/profile/recipes" data-descr="1" className="pdb-link-btn flex" >Recipes</Link>
          <Link to="/profile/cookbooks" data-descr="1" className="pdb-link-btn flex" >Cookbooks</Link>
        </div>
    )

}

export default ProfileDataBar