import './Button.css'

const Button = (props) => {

    // Destructure passed in props
    const {
        children,
        primary,
        secondary,
        clickHandler,
        disabled,
        outline,
        rounded,
        roundedOutline,
        widthAuto,
        widthHalf,
        widthFull,
        is
    } = props

    // Setup the class names for the button
    let classNames = 'btn'
    classNames += outline ? ' btn-outline' : ''
    classNames += rounded ? ' btn-circle' : ''
    classNames += roundedOutline ? ' btn-circle-outline' : ''
    classNames += widthAuto ? ' btn-width-auto' : ''
    classNames += widthHalf ? ' btn-width-half' : ''
    classNames += widthFull ? ' btn-width-full' : ''
    classNames +=  primary ? ' btn-color-pri' : '';
    classNames +=  secondary ? ' btn-color-sec' : '';

    return (
        <button 
            className={classNames} 
            {...(disabled && disabled)} 
            onClick={clickHandler}
            style={is}
        >
            {children}
        </button>
    )

}

export default Button