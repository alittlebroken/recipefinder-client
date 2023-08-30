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
        <select name={name} style={is} id={id} className={classes} onChange={handleChange}>
            <option>{initialOption}</option>
            {options.map((option) => {
                if(selected === option.value){
                    return <option key={nanoid()} value={option.value} selected>{option.value}</option>
                } else {
                    return <option key={nanoid()} value={option.value}>{option.value}</option>
                }
            })}
        </select>
    )
}

export default Select