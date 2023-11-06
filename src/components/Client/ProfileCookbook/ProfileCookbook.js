import './ProfileCookbook.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import {
    getCookBookRecipeList,
    pageUp,
    pageDown,
    setRecsPerPage,
    goToPage,
    selectIsLoading,
    selectHasError,
    selectRecipes,
    selectPage,
    selectPages,
    selectRecsPerPage,
    selectRecords
} from '../../../slices/Cookbooks/Cookbooks.slice'
import Pagination from '../../UI/Pagination/Pagination'


const ProfileCookbook = (props) => {

    /* Alias the dispatch hook */
    const dispatch = useDispatch()

    /* Destructure the props passed in */
    const {
        cookbook
    } = props

    /* Get a list of the recipes for this cookbook */
    const recipes = useSelector(selectRecipes)

    /* Are we still loading data or have we encountered an error */
    const loading = useSelector(selectIsLoading)
    const errored = useSelector(selectHasError)

    /* pagination options */
    const pagination = {
        page: useSelector(selectPage),
        pages: useSelector(selectPages),
        recsPerPage: useSelector(selectRecsPerPage),
        records: useSelector(selectRecords)
    }

    /* State for controlling pagination */
    const [page, setPage] = useState(pagination.page)
    const [recsPage, setRecsPage] = useState(pagination.recsPerPage)

    /* State for controlling if the data is outdated ( dirty ) */
    const [isDirty, setIsDirty] = useState(false)

    /* Load the recipe list */
    useEffect(() => {

        /* function to fetch the data from the API asynchronously */
        const fetchData = async () => {

            /* generate the payload for the API call */
            const payload = {
                cookbookId: cookbook.id
            }

            await getCookBookRecipeList(payload)
        }

        /* Get the data */
        fetchData()
    }, [page, recsPage, dispatch, isDirty])

    /* Handler for changing how many records to display per
     * page 
    */
    const recsChangeHandler = async (e) => {
        setRecsPerPage(e.target.value)
        dispatch(setRecsPerPage(e.target.value))
    }

    /* Handler for going forward or backward the pages */
    const pageChangeHandler = async (e) => {
        if(e.target.value === '-'){
            setPage(page - 1)
            dispatch(pageDown())
        } else if(e.target.value === '+'){
            setPage(page + 1)
            dispatch(pageUp())
        }
    }



    return (
        
        <div aria-label="cookbook container" className="cb-container flex">

            <img 
                src={cookbook.src}
                title={cookbook.title}
                alt={cookbook.alt}
            />

            <h2 className="cb-head-2">
                {cookbook.name}
            </h2>

            <div aria-label="cookbook description" className="cb-description">
                {cookbook.description}
            </div>

            <div aria-label="recipes container" className="cb-recipe-list flex">

            <Pagination 
                        totalRecords={pagination.records}
                        recsPerPage={pagination.recsPerPage}
                        totalPages={pagination.pages}
                        currentPage={pagination.page}
                        handlePageChange={pageChangeHandler}
                        handleRecsChange={recsChangeHandler}
                        minified
            />

                {recipes.map( recipe => {

                    <div aria-label="recipe-container" className="cb-recipe-container flex">

                        <img 
                            src={recipe.images[0].imageSrc} 
                            title={recipe.images[0].imageTitle}
                            alt={recipe.images[0].imageAlt}
                        />

                        <div aria-label="recipe content" className="cb-recipe-content flex">

                            <div aria-label='recipe details' className="cb-recipe-details flex">

                                <h3 className="cb-head-3">{recipe.name}</h3>

                                <p aria-label="recipe description" className="cb-recipe-desc">
                                    {recipe.description}
                                </p>

                            </div> 

                            <div aria-label="recipe actions" className="cb-recipe-actions flex">

                                <button name="remove" className="btn cb-action-btn flex">Remove</button>
                                <button name="moreInfo" classname="btn cb-action-btn flex">More Info</button>
                            </div> 

                        </div>

                    </div>

                })}

                <Pagination 
                        totalRecords={pagination.records}
                        recsPerPage={pagination.recsPerPage}
                        totalPages={pagination.pages}
                        currentPage={pagination.page}
                        handlePageChange={pageChangeHandler}
                        handleRecsChange={recsChangeHandler}
                        minified
            />

            </div>

        </div>

    )

}

export default ProfileCookbook