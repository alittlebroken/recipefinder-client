import './Modal.css'

const Modal = ({handleClose, show, children}) => {

    /* set the classes to apply if the Modal is open or not */
    const showHideClass  = show ? "modal modal-display" : "modal modal-none"

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