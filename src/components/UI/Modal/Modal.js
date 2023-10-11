import './Modal.css'

const Modal = ({handleClose, show, children}) => {

    /* set the classes to apply if the Modal is open or not */
    const showHideClass  = show ? "modal display-block" : "modal display-none"

    return (
        <div aria-label="modal container" className={showHideClass}>
            <div aria-label="modal content" className="modal-main">
                {children}
                <button type="button" onClick={handleClose}>Close</button>
            </div>
        </div>
    )

}

export default Modal