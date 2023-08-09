import './Radio.css'

const Radio = (props) => {

    // Destructure the props required for this component
    const {
        id,
        name,
        value,
        handleChange,
        is,
        primary, 
        secondary
    } = props

    // Setup the classes for the component
    let classes = 'radio-container'
    classes += primary ? ' radio-primary' : ''
    classes += secondary ? ' radio-secondary' : ''

    return (
        <div 
         aria-label="radio button container" 
         className={classes} style={is} 
        >
            <input 
                type="radio" 
                id={id}
                name={name} 
                value={value} 
                onChange={handleChange}
            />
            &nbsp;
            {value}
        </div>
    )

}

export default Radio