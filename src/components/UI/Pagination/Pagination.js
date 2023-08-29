import '../core.css'
import './Pagination.css'

import { nanoid } from '@reduxjs/toolkit'

import Select from '../Select/Select'
import Button from '../Button/Button'

const Pagination = (props) => {

    /* Destructure the passed in props */
    const {
        classes,
        is,
        totalRecords,
        currentPage,
        totalPages,
        recsPerPage,
        handlePageChange,
        handleRecsChange,
        handleGoToPage
     } = props

     /* Create an array of buttons */
     let pagers = []
     for(let i = 0; i < totalPages; i++){
        if(totalPages > 5 && i === 3){
            pagers.push({ id: nanoid(), value: '...', name: '...'})
        } else {
            pagers.push({ id: nanoid(), value: i + 1, name: i + 1})
        }
     }

     /* Setup the options for the select box */
     const selectOptions = [
        { value: 5, text: '5 recs per page'},
        { value: 10, text: '10 recs per page' },
        { value: 25, text: '25 recs per page'},
        { value: 50, text: '50 recs per page'},
        { value: 75, text: '75 recs per page'},
        { value: 100, text: '100 recs per page'}
     ]

     return (
        <>
            <div aria-label="pagination container" className="page-container flex flex-row flex-center">
                <Button
                    id={nanoid()}
                    outline
                    is={{ width: '40px'}}
                    clickHandler={handlePageChange}
                    value='-'
                >
                    {'<'}
                </Button>
                {
                    pagers.map((pager) => {
                        return (
                            <Button
                             outline
                             id={pager.id}
                             key={pager.id}
                             is={{ width: '40px'}}
                             clickHandler={handleGoToPage}
                             value={pager.name}
                            >
                                {pager.name}
                            </Button>
                        )
                    })    
                }
                <Select 
                    id={nanoid()}
                    options={selectOptions} 
                    initialOption={'Recs per page'} 
                    selected={recsPerPage || 5} 
                    name="selectRecordsPerPage" 
                    handleChange={handleRecsChange}
                />
                <Button
                    id={nanoid()}
                    outline
                    is={{ width: '40px'}}
                    clickHandler={handlePageChange}
                    value='+'
                >
                    {'>'}
                </Button>
            </div>
        </>
     )

}

export default Pagination