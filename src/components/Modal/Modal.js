import React from "react"
import { useState } from "react"

import { AiOutlineClose } from "react-icons/ai"

import "./modal.css"

const Modal = (props) => {

    const handleClose = (e) => {
        e.preventDefault()

        props.onClose(false)
    }

    if(!props.show) return null

    return (
        <div className="modal-bg">
            <div className="modal-container">
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