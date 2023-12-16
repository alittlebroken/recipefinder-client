import './RecipeCategories.css'
import { useNavigate } from 'react-router-dom'
import { nanoid } from '@reduxjs/toolkit'

const RecipeCategories = ({ categories }) => {

    /* Alias various hooks */
    const navigate = useNavigate()

    return (
        <div aria-label="container for categories" className="rc-categoriesContainer flex">

            {
                categories.map(category => {
                    return (
                        <div key={nanoid()} aria-label="category container" className="rc-categoryContainer" onClick={(e) => {
                            navigate(`/recipes/${category.name.toLowerCase()}`)
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