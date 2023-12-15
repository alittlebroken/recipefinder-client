import './Categories.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import apiProvider from '../../../providers/apiProvider'
import Pagination from '../../UI/Pagination/Pagination'
import CategoriesList from './CategoriesList'

const Categories = () => {

    /* State for holding a list of categories */
    const [categories, setCategories] = useState([])

    /* pagination state */
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(null)
    const [recsPerPage, setRecsPerPage] = useState(10)
    const [totalRecs, setTotalRecs] = useState()

    const handleChangeOfPage = (e) => {
        if(e.target.value === '-'){
            setPage(page - 1)
        } else if(e.target.value === '+'){
            setPage(page + 1)
        }
    }

    const handleGoToSpecificPage = (e) => {
        setPage(e.target.value)
    }

    const handleRecsPerPageChange = (e) => {
        setRecsPerPage(parseInt(e.target.value))
    }

    /* Load the categories as soon as the compoment mopunts */
    useEffect(() => {

        /* by using a arrow function here we can apply async to await the return of
           the data from the API as useEffect does not this nativly */
           const fetchData = async (resource) => {

                /* Create the params for the API request */
                const params = {
                    pagination: {
                        page: page,
                        perPage: recsPerPage
                    }
                }

                /* Send the request to thew API */
                const res = await apiProvider.getList(resource, params)

                if(res.status >= 200 && res.status < 300){
                    setCategories(res.data.results)
                    setPage(res.data.currentPage)
                    setTotalRecs(res.data.totalRecords)
                    setPages(parseInt(res.data.totalRecords / recsPerPage))
                }

           }

        /* Retrieve the data */
        fetchData('categories')

    }, [page, recsPerPage])

    return (
        <div aria-label="container for list of categories" className="categorieContainer flex">

            <h2 className="categoriesHeader">Categories</h2>

            <Pagination 
                totalRecords={totalRecs}
                currentPage={page}
                totalPages={pages}
                recsPerPage={recsPerPage}
                handlePageChange={handleChangeOfPage}
                handleGoToPage={handleGoToSpecificPage}
                handleRecsChange={handleRecsPerPageChange}
            />
            
            <CategoriesList data={categories} />
            
            <Pagination 
                totalRecords={totalRecs}
                currentPage={page}
                totalPages={pages}
                recsPerPage={recsPerPage}
                handlePageChange={handleChangeOfPage}
                handleGoToPage={handleGoToSpecificPage}
                handleRecsChange={handleRecsPerPageChange}
            />


        </div>
    )
}

export default Categories