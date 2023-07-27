import './Button.css'

const Button = (props) => {

    // Destructure passed in props
    const {
        children,
        clickHandler,
        disabled,
        outline,
        rounded,
        roundedOutline
    } = props

    // Setup the class names for the button
    let classNames = 'btn'
    classNames += outline ? ' btn-outline' : ''
    classNames += rounded ? ' btn-circle' : ''
    classNames += roundedOutline ? ' btn-circle-outline' : ''

    return (
        <button 
            className={classNames} 
            {...(disabled && disabled)} 
            onClick={clickHandler}
        >
            {children}
        </button>
    )

}

export default Button