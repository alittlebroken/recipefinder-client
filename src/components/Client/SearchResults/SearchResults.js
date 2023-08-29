
import './SearchResults.css'

import Card from '../../UI/Cards/Card'
import Recipe from '../Recipe/Recipe'

const SearchResults = (props) => {

    /* Destructure the supplied props */
    const {
       results,
       terms,
       searchType,
       totalCount 
    } = props

    /* Determine the title for the page */
    const allRecipes = `${totalCount ? totalCount : 0} recipes found.`
    const foundRecipes = `${totalCount ? totalCount : 0 } recipes found matching "${terms}"`

    /* Setup handlers for the components */
    

    return (
        <div aria-label="search-results-container" className="searchResultsContainer">
            {terms === undefined || terms === '' ? (<h3>{allRecipes} </h3>) : (<h4>{foundRecipes}</h4>)}
            
            <Card.List>
                {results?.length < 1 ? (<p>No Records found matching the supplied search terms or options</p>): ''}
                {results?.map((result) => {
                    return <Recipe key={result.id} record={result} />
                })}
            </Card.List>
        </div>
    )

}

export default SearchResults