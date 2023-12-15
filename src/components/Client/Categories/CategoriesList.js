import './Categories.css'
import { nanoid } from '@reduxjs/toolkit'
import { Link } from 'react-router-dom'

const CategoriesList = ({ data }) => {
    
    console.log(data)

    if(!data || data?.length < 1){
        return (
            <div aria-label="container for no records" className="noRecords flex">
                No records found
            </div>
        )
    } else {
        return (
            <div aria-label="List of categories" className="categoriesList flex">
                {data && data.map( record => {
                    return (
                        <div key={nanoid} aria-label="category container" className="categoryContainer">
                            <Link to={`/recipes/${record.name.toLowerCase()}`}>{record.name}</Link>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default CategoriesList