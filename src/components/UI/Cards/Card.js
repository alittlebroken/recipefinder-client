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
    let classNames = 'card-img'

    classNames += rounded ? ' card-image-rounded' : null
    classNames += leftRounded ? ' card-image-rounded-left' : null
    classNames += rightRounded ? ' card-image-rounded-right' : null

    return (
        <>
            <img src={source} alt={altText} title={title} className={classNames} />
       </>
    )

}

/* Card Body */
Card.Body = (props) => {

    // Destructure the props
    const {
        children,
        rightBorder
    } = props

    // Generate the styles for the component
    let classNames = 'card-body'

    classNames += rightBorder ? ' card-body-border-right' : null

    return (
        <>
            <div aria-label="card-body" className={classNames}>
                {children}
            </div>
        </>
    )

}

export default Card;