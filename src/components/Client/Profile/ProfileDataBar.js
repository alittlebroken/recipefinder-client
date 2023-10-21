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
          <Link to="/pantry" className="pdb-link-btn flex" >Pantry</Link>
          <Link to="/profile/ingredients" className="pdb-link-btn flex" >Ingredients</Link>
          <Link to="/profile/recipes" className="pdb-link-btn flex" >Recipes</Link>
          <Link to="/profile/cookbooks" className="pdb-link-btn flex" >Cookbooks</Link>
        </div>
    )

}

export default ProfileDataBar