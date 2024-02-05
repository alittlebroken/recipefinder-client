import './Select.css'
import { nanoid } from '@reduxjs/toolkit'

const Select  = (props) => {


    /* Destructure the passed in props */
    const { 
        options, 
        name, 
        is, 
        id, 
        selected,
        handleChange,
        initialOption
    } = props

    /* Set up the clkasses to be used for the component */
    let classes = 'search-select'

    return (
        <select value={selected} name={name} style={is} id={id} className={classes} onChange={handleChange}>
            <option>{initialOption}</option>
            {options.map((option) => {
                return <option key={nanoid()} value={option.value}>{option.value}</option>
            })}
        </select>
    )
}

export default Select