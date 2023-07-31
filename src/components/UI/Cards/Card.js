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
        large,
        medium,
        small,
        circular
    } = props

    // Apply various classes based on the props passed in
    let className = 'card'

    className += rounded ? ' border-radius' : ''
    className += shadow ? ' card-shadow' : ''
    className += thinBorder ? ' card-border-thin' : ''
    className += mediumBorder ? ' card-border-medium' : ''
    className += thickBorder ? ' card-border-thick' : ''

    className += small ? ' card-small' : ''
    className += medium ? ' card-medium' : ''
    className += large ? ' card-large' : ''

    className += circular ? ' card-circular' : ''

    // Finally other styles here - Should be a string of class names starting with a space
    className += ` ${otherClasses}`

    return (
        <>
            <div aria-label="card-container" className={className}>
                {children}
            </div>
        </>
    )

}

/* Card List  - Container for cards */
Card.List = (props) => {

    /* Destructure the props */
    const {
        children,
        classes
    } = props

    /* Setup the classes to be applied to the component */
    let classNames = 'card-list'
    classNames += classes ? classes : ''

    return (
        <div aria-label="card list" className={classNames}>
            {children}
        </div>
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
        rightRounded,
        roundTop,
    } = props

    // Setup the css class names to be used
    let classNames = 'card-img'

    classNames += rounded ? ' card-image-rounded' : ''
    classNames += leftRounded ? ' card-image-rounded-left' : ''
    classNames += rightRounded ? ' card-image-rounded-right' : ''
    classNames += roundTop ? ' border-radius-top' : ''

    // Set a placeholder image if we have none
    let placeHolder = 'https://fakeimg.pl/600x400?text=No+image'

    return (
        <>
            <img src={source ? source : placeHolder } alt={altText} title={title} className={classNames} />
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

    classNames += rightBorder ? ' card-body-border-right' : ''

    return (
        <>
            <div aria-label="card-body" className={classNames}>
                {children}
            </div>
        </>
    )

}

/* Card Title */
Card.Title = (props) => {

    // Destructure the props
    const {
        text,
        small,
        medium,
        large,
        overlay
    } = props

    // collect the styles needed
    let classNames

    classNames += small ? ' card-title-small' : ''
    classNames += medium ? ' card-title-medium' : ''
    classNames += large ? ' card-title-large' : ''

    classNames += overlay ? ' card-overlay-center' : ''

    return (
        <>
            <h5 className={classNames}>{text}</h5>
        </>
    )

}

/* Card Header */
Card.Header = (props) => {

    /* Destructure the passed in props */
    const {
        text,
        classes
    } = props

    /* Construct the list of css classes to use */
    let classNames = "card-header"

    classNames += classes ? classes : ''

    return (
        <div aria-label="card header" className={classNames}>
            {text}
        </div>
    )

}

/* Card Footer */
Card.Footer = (props) => {

    /* Destructure the props passed in */
    const { 
        text,
        classes
     } = props

     /* Setup the css classes to apply to the component */
     let classNames = 'card-footer'

     classNames += classes ? classes : ''

     return (
        <div aria-label="card footer" classNames={classNames} >
            {text}
        </div>
     )

}

/* Card Actions */
Card.Actions = (props) => {

    /* Destructure the props */
    const {
        children,
        classes,
        alignLeft,
        alignCenter,
        alignRight
    } = props

    /* Setup the css classes to apply tp the component */
    let classNames = 'card-actions'
    classNames += alignLeft ? ' align-left' : ''
    classNames += alignCenter ? ' align-center' : ''
    classNames += alignRight ? ' align-right' : ''
    classNames += classes ? classes : ''

    return (
        <div arial-label="card actions" className={classNames}>
            {children}
        </div>
    )

}

/* Card Tags */
Card.Tags = (props) => {

    /* Destructure the props */
    const {
        children,
        classes
    } = props

    /* Setup the classes to be applied to the component */
    let classNames = 'card-tags'
    classNames += classes ? classes : ''

    return (
        <div aria-label="card tag list" className={classNames}>
            {children}
        </div>
    )

}

/* Card Tag */
Card.Tag = (props) => {

    /* Destructure the props */
    const {
        text,
        classes
    } = props

    /* Setup the classes to be applied to the component */
    let classNames = 'card-tag'
    classNames += classes ? classes : ''

    return (
        <div aria-label="card tag" className={classNames}>
            {text}
        </div>
    )

}

/* Card container */
Card.Container = (props) => {

    /* Destructure the props */
    const { 
        children,
        classes,
        overlay
    } = props

    /* Classnames to be applied */
    let classNames = 'card-container'
    classNames += classes ? classes : ''
    classNames += overlay ? ' card-overlay' : ''

    return (
        <div aria-label="card container" className={classNames}>
            {children}
        </div>
    )

}

/* OverLay text for images */
Card.Overlay = (props) => {

    /* Destructure the props */
    const { 
        children,
        classes,
        center,
        centerTop,
        centerBottom
    } = props

    /* Classnames to be applied */
    let classNames = ''
    classNames += classes ? classes : ''
    classNames += center ? ' card-overlay-center' : ''
    classNames += centerTop ? ' card-overlay-center-top' : ''
    classNames += centerBottom ? ' card-overlay-center-bottom' : ''

    return (
        <div aria-label="card overlay" className={classNames}>
            {children}
        </div>
    )

}


export default Card;