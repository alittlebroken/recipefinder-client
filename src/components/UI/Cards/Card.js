import './Card.css'

/* Card base */
const Card = (props) => {

    // Destructure the props
    const { 
        children,
        rounded,
        shadow,
        thinBorder,
        mediumBorder,
        thickBorder,
        otherClasses,
    } = props

    // Apply various classes based on the props passed in
    let className = 'card'

    className += rounded ? ' card-rounded' : null
    className += shadow ? ' card-shadow' : null
    className += thinBorder ? ' card-border-thin' : null
    className += mediumBorder ? ' card-border-medium' : null
    className += thickBorder ? ' card-border-thick' : null
    
    // Finally other styles here - Should be a string of class names starting with a space
    className += otherClasses

    return (
        <>
            <div aria-label="card-container" className={className}>
                {children}
            </div>
        </>
    )

}



export default Card;