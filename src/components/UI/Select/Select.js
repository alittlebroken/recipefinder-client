import './Select.css'
import { useDispatch, useSelector } from 'react-redux'

import { 
    selectSearchOptions,
    setSearchOptions 
} from '../../../slices/Search/SearchSlice'

const Select  = (props) => {

    /* Alias the dispatcher */
    const dispatch = useDispatch()

    /* Destructure the passed in props */
    const { 
        options, 
        name, 
        is, 
        id, 
        selected
    } = props

    /* Set up the clkasses to be used for the component */
    let classes = 'search-select'

    /* Get any data that we need from the store */
    const searchOptions = useSelector(selectSearchOptions)

    /* Handlers for interactivity for the component*/
    const handleChange = (e) => {
        e.preventDefault()
        /* Set the new search Option */
        dispatch(setSearchOptions(e.target.value))
    }

    return (
        <select name={name} style={is} id={id} className={classes} onChange={handleChange}>
            {options.map((option) => {
                if(selected === option.value){
                    return <option value={option.value} selected>{option.value}</option>
                } else {
                    return <option value={option.value}>{option.value}</option>
                }
            })}
        </select>
    )
}

export default Select