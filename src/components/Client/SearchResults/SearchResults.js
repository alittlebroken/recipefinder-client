import { useSelector } from 'react-redux'

import './SearchResults.css'

import Card from '../../UI/Cards/Card'
import Recipe from '../Recipe/Recipe'

import Pagination from '../../UI/Pagination/Pagination'

import { 
    selectSearchPage,
    selectSearchNumPages,
    selectSearchNumRecords 
} from '../../../slices/Search/SearchSlice'

const SearchResults = (props) => {

    // Destructure the supplied props
    const {
       results,
       terms,
       searchType,
       totalCount 
    } = props

    /* Gather the details for the Pagination component */
    const currentPage = useSelector(selectSearchPage)
    const totalPages = useSelector(selectSearchNumPages)
    const totalRecords = useSelector(selectSearchNumRecords)

    /* Determine the title for the page */
    const allRecipes = `${totalCount} recipes found.`
    const foundRecipes = `${totalCount} recipes found matching "${terms}"`

    return (
        <div aria-label="search-results-container" className="searchResultsContainer">
            {terms === undefined || terms === '' ? (<h3>{allRecipes} </h3>) : (<h4>{foundRecipes}</h4>)}
            
            <Card.List>
                {results?.length < 1 ? (<p>No Records found matching the supplied search terms or options</p>): ''}
                {results?.map((result) => {
                    return <Recipe key={result.id} record={result} />
                })}
            </Card.List>
            <Pagination 
                totalRecords={totalRecords} 
                currentPage={currentPage} 
                totalPages={totalPages}
            />
        </div>
    )

}

export default SearchResults