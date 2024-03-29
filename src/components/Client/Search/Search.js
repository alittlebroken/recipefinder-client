import './Search.css'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from '../../UI/Button/Button'
import Select from '../../UI/Select/Select'

import Pagination from '../../UI/Pagination/Pagination'

import { 
    performSearch,
    setSearchTerms,
    selectSearchResults,
    selectSearchTerms,
    selectSearchPage,
    selectSearchNumPages,
    selectSearchNumRecords,
    selectSearchLoading,
    selectSearchErrored,
    selectSearchOptions,
    clearSearchResults,
    setSearchOptions,
    increasePage,
    decreasePage,
    setRecsPerPage,
    selectRecsPerPage,
    goToPage,
 } from '../../../slices/Search/SearchSlice'

import SearchResults from '../SearchResults/SearchResults'

const Search = (props) => {

    // Alias dispatch function
    const dispatch = useDispatch()

    // Gather data from the store for the component
    const searchTerms = useSelector(selectSearchTerms)
    const searchResults = useSelector(selectSearchResults)
    const currentPage = useSelector(selectSearchPage)
    const totalPages = useSelector(selectSearchNumPages)
    const totalRecords = useSelector(selectSearchNumRecords)
    const loading = useSelector(selectSearchLoading)
    const errored = useSelector(selectSearchErrored)
    const searchOptions = useSelector(selectSearchOptions)
    const currentRecsPerPage = useSelector(selectRecsPerPage)

    // Create state for the component
    const [ terms, setTerms ] = useState(searchTerms || '')
    const [ options, setOptions ] = useState('recipes')
    
    // Pagination State
    const [ page, setPage ] = useState(currentPage || 1)
    const [ perPage, setPerPage ] = useState(5)

    // Update the state as the component mounts
    useEffect(() => {
        if(terms !== undefined){
            dispatch(performSearch({
                terms,
                options: searchOptions,
                pagination: {
                   page,
                   perPage
                },
                sort: {
                    field: 'created_at',
                    order: 'desc'
                }
            }))
        }
    },[dispatch, page, perPage])

    // Handler for submit of the search from
    const handleSearchSubmit = (e) => {
        e.preventDefault()
        // Update search terms
        dispatch(setSearchTerms(terms))
        dispatch(setSearchOptions(options))
        dispatch(performSearch({
            terms,
            options: searchOptions,
            pagination: {
               page,
               perPage
            },
            sort: {
                field: 'created_at',
                order: 'desc'
            }
        }))
    }

    // Handler for change in the submit field
    const handleSearchChange = (e) => {
        setTerms(e.target.value)
    }

    /* Handlers for Pagination */
    const handleOptionChange = (e) => {
        dispatch(setSearchOptions(e.target.value))
        setOptions(e.target.value)
    }

    const handleChangeOfPage = (e) => {
        if(e.target.value === '-'){
            setPage(page - 1)
            dispatch(decreasePage())
        } else if(e.target.value === '+'){
            setPage(page + 1)
            dispatch(increasePage())
        }
    }

    const handleRecsPerPageChange = (e) => {
        setPerPage(parseInt(e.target.value))
        dispatch(setRecsPerPage(e.target.value))
    }

    const handleGoToSpecificPage = (e) => {
        setPage(e.target.value)
        dispatch(goToPage(e.target.value))
    }

    return(
        <div className="s-container">
            <div aria-label='search-container' className="search-container">
                <div aria-label='searchField-container' className='searchField-container'>
                    <i className="fa fa-search icon"></i>
                    <input 
                        type="search" 
                        name="search" 
                        className="search-input" 
                        placeholder="Type in a recipe name or ingredient"
                        value={terms}
                        onChange={(e) => { handleSearchChange(e) }}
                    />
                    <Select 
                        name="searchOption"
                        id="searchOptions"
                        selected={searchOptions}
                        initialOption="Select search type"
                        handleChange={(e) => handleOptionChange(e) }
                        options={[{ value: 'Ingredients'}, { value: 'Categories' }, { value: 'Recipes' } ]}
                    />
                    <Button 
                        roundedOutline 
                        secondary 
                        clickHandler={handleSearchSubmit}
                        id="search-button"
                    >
                        GO
                    </Button>
                </div>   
            </div>
            <div aria-label="searchresults-container" className="searchResults-container">

                {loading ? 'Loading search results' : (<SearchResults results={searchResults} terms={terms} searchType={options} totalCount={totalRecords} />)}

            </div>
            <Pagination 
                totalRecords={totalRecords} 
                currentPage={currentPage} 
                totalPages={totalPages}
                recsPerPage={currentRecsPerPage}
                handlePageChange={handleChangeOfPage}
                handleGoToPage={handleGoToSpecificPage}
                handleRecsChange={handleRecsPerPageChange}
            />
        </div>
    )

}

export default Search