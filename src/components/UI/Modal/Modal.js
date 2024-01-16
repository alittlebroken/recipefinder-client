import './Modal.css'

const Modal = ({
    handleClose, 
    show, 
    children, 
    sz600,
    sz900,
    sz1024,
    sz90p,
    sz75p,
    sz50p,
    classes,
    iStyles
}) => {

    /* set the classes to apply if the Modal is open or not */
    let showHideClass  = show ? "modal modal-display" : "modal modal-none"

    /* add additional classes if needed */
    let mainClasses = 'modal-main default-size'
    mainClasses += sz600 ? ' modal-sz600' : ''
    mainClasses += sz900 ? ' modal-sz900' : ''
    mainClasses += sz1024 ? ' modalsz1024' : ''
    mainClasses += sz50p ? ' modal-sz50p' : ''
    mainClasses += sz75p ? ' modal-sz75p' : ''
    mainClasses += sz90p ? ' modal-sz90p' : ''
    mainClasses += classes ? classes : ''

    return (
        <div aria-label="modal container" className={showHideClass}>
            <div aria-label="modal content" className={mainClasses} style={iStyles}>
                {children}
                <button className="modal-close" type="button" onClick={handleClose}>X</button>
            </div>
        </div>
    )

}

export default Modal