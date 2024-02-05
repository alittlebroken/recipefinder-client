import React from "react"
import { useState } from "react"

import { AiOutlineClose } from "react-icons/ai"

import "./modal.css"

const Modal = (props) => {

    const handleClose = (e) => {
        e.preventDefault()

        props.onClose(false)
    }

    /* build up some CSS to apply based on the props passed in */
    let classes = 'modal-container '
    classes += props.width90 ? 'modal-width-90 ' : ''
    classes += props.width80 ? 'modal-width-80 ' : ''
    classes += props.width75 ? 'modal-width-70 ' : ''
    classes += props.width50 ? 'modal-width-50 ' : ''
    classes += props.width35 ? 'modal-width-35 ' : ''

    if(!props.show) return null

    return (
        <div className="modal-bg">
            <div className={classes}>
                <div className="modal-title">
                    { props.title } <button onClick={handleClose}><AiOutlineClose /></button>
                </div>
                <div className="modal-content">
                    { props.children }
                </div>
                <div className="modal-footer">
                   { props.footer }
                </div>
            </div>
        </div>
    )
}

export default Modal;