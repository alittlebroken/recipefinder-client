import './Modal.css'

const Modal = ({
    handleClose, 
    show, 
    children, 
    sz600 = undefined,
    sz900 = undefined,
    sz1024 = undefined,
    sz90p = undefined,
    sz75p = undefined,
    sz50p = undefined,
    classes = undefined
}) => {

    /* set the classes to apply if the Modal is open or not */
    let showHideClass  = show ? "modal modal-display" : "modal modal-none"

    /* add additional classes if needed */
    showHideClass += sz600 ? ' modal-sz600' : ''
    showHideClass += sz900 ? ' modal-sz900' : ''
    showHideClass += sz1024 ? ' modal-sz1024' : ''
    showHideClass += sz50p ? ' modal-sz50p' : ''
    showHideClass += sz75p ? ' modal-sz75p' : ''
    showHideClass += sz90p ? ' modal-sz90p' : ''
    showHideClass += classes ? classes : ''

    return (
        <div aria-label="modal container" className={showHideClass}>
            <div aria-label="modal content" className="modal-main">
                {children}
                <button className="modal-close" type="button" onClick={handleClose}>X</button>
            </div>
        </div>
    )

}

export default Modal