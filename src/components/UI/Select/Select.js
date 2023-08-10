import './Select.css'

const Select  = (props) => {

    /* Destructure the passed in props */
    const { 
        options, 
        name, 
        is, 
        id, 
        selected } = props

    /* Set up the clkasses to be used for the component */
    let classes = 'search-select'

    return (
        <select name={name} style={is} id={id} className={classes}>
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