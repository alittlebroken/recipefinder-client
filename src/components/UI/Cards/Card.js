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

/* Image component for card */
Card.Image = (props) => {

    // Destructure the props
    const {
        source,
        title,
        altText,
        rounded,
        leftRounded,
        rightRounded
    } = props

    // Setup the css class names to be used
    let className = 'card-img'

    className += rounded ? ' card-image-rounded' : null
    className += =leftRounded ? ' card-image-rounded-left' : null
    className += rightRounded ? ' card-image-rounded-right' : null

    return (
        <>
            <img src={source} altText={altText} title={title} className={className} />
        </>
    )

}

export default Card;