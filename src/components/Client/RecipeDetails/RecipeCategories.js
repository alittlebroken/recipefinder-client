import './RecipeCategories.css'
import { useNavigate } from 'react-router-dom'
import { nanoid } from '@reduxjs/toolkit'

import { 
    setSearchTerms,
    setSearchOptions,
 } from '../../../slices/Search/SearchSlice'

 import { useDispatch } from 'react-redux'

const RecipeCategories = ({ categories }) => {

    /* Alias various hooks */
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <div aria-label="container for categories" className="rc-categoriesContainer flex">

            {
                categories.map(category => {
                    return (
                        <div key={nanoid()} aria-label="category container" className="rc-categoryContainer" onClick={(e) => {
                            dispatch(setSearchTerms(category.name.toLowerCase()))
                            dispatch(setSearchOptions('categories'))
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