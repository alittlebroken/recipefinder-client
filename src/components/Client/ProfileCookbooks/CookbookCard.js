import './CookbookCard.css'
import { nanoid } from '@reduxjs/toolkit'
import { useState } from 'react'
import Modal from '../../UI/Modal/Modal'

const CookBookCard = (props) => {

    /* Destructure the passed in props */
    const {
        data
    } = props

    /* Set the state for opening the modal form */
    const [showRemoveModal, setShowRemoveModal] = useState(false)

    /* Handle the close of the remove Modal */
    const handleRemoveModal = (e) => {
        e.preventDefault()
        setShowRemoveModal(false)
    }

    return (

        <div aria-label="cookbook container" className="cc-container flex">

            <Modal key={nanoid()} show={showRemoveModal} handleClose={handleRemoveModal} >

            </Modal>

            <img src={data.src} title={data.title} alt={data.alt} className="cc-image" />

            <div aria-label="card content container" className="flex cc-content-container">
                <div aria-label="cookbook details" className="cc-details-container flex">

                    <h3 className="cc-head-3">{data.name}</h3>

                    <p className="cc-description">{data.description}</p>

                </div>

                <div aria-label="cookbook action button container" className="cc-action-buttons flex">

                    <button name="moreInfo" className="cc-btn-action-more" value="more">
                        More Info
                    </button>

                    <button 
                        name="remove" 
                        className="cc-btn-action-remove" 
                        value="remove"
                        onClick={(e) => { setShowRemoveModal(true)}}
                    >
                        Remove
                    </button>

                </div>
            </div>

        </div>
    )

}

export default CookBookCard