import './RecipeCategories'
import { useNavigate } from 'react-router-dom'

const RecipeCategories = ({ categories }) => {

    /* Alias various hooks */
    const navigate = useNavigate()

    return (
        <div aria-label="container for categories" className="categorieContainer">

            {
                categories.map(category => {
                    return (
                        <div aria-label="category container" className="categoryContainer" onClick={(e) => {
                            navigate(`/categories/${category.id}`)
                        }}>

                            { category.name }  

                        </div>
                    )
                })
            }

        </div>
    )

}

export default RecipeCategories