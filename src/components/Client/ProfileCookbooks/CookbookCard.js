import './CookbookCard.css'
import { nanoid } from '@reduxjs/toolkit'
import { useState } from 'react'
import Modal from '../../UI/Modal/Modal'
import apiProvider from "../../../providers/apiProvider"
import { useNavigate } from 'react-router-dom'

const CookBookCard = (props) => {

    /* Destructure the passed in props */
    const {
        data,
        setIsDirty,
        handleNotifications
    } = props

    /* Alias the navigate hook */
    const navigate = useNavigate()

    /* Set the state for opening the modal form */
    const [showRemoveModal, setShowRemoveModal] = useState(false)

    /* Handle the close of the remove Modal */
    const handleRemoveModal = (e) => {
        e.preventDefault()
        setShowRemoveModal(false)
    }

    /* Handles the submission of the form */
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    /* Handle the click of a button */
    const handleClick = async (e) => {
        e.preventDefault()

        /* Which button was pressed */
        if(e.target.value === "cancel"){
            setShowRemoveModal(false)
        } else if (e.target.value === "remove"){
            
            /* generate the params for removing the cookbook */
            const params = {
                auth: {
                    authenticate: true
                },
                id: data?.id
            }

            const res = await apiProvider.removeOne('cookbooks', params)

            if(res.status >= 200 && res.status < 300){
                handleNotifications({
                    className: "cc-notif cc-ok",
                    message: "Cookbook successfully removed"
                })
                setIsDirty(true)
            } else {
                handleNotifications({
                    className: "cc-notif cc-error",
                    message: "Unable to remove cookbook. Please try again later."
                })
            }

        }

    }

    return (

        <div aria-label="cookbook container" className="cc-container flex">

            <Modal key={nanoid()} show={showRemoveModal} handleClose={handleRemoveModal}>
                
                <form id="form-remove" onSubmit={handleSubmit} className="flex form-container">
                    <h3>{data.name}</h3>
                    <p>Are you sure you wish to remove this cookbook and all it's recipes?</p>
                    <div aria-label="action buttons container" className="flex flex-row action-container">
                        <button 
                            id="remove" 
                            value="remove" 
                            className="btn btn-action"
                            onClick={handleClick}
                        >
                            Remove
                        </button>
                        <button 
                            id="cancel" 
                            value="cancel" 
                            className="btn btn-action"
                            onClick={handleClick}
                        >
                            Cancel
                        </button>
                    </div>
                </form>

            </Modal>

            <img src={data.src} title={data.title} alt={data.alt} className="cc-image" />

            <div aria-label="card content container" className="flex cc-content-container">
                <div aria-label="cookbook details" className="cc-details-container flex">

                    <h3 className="cc-head-3">{data.name}</h3>

                    <p className="cc-description">{data.description}</p>

                </div>

                <div aria-label="cookbook action button container" className="cc-action-buttons flex">

                    <button 
                        name="moreInfo" 
                        className="cc-btn-action-more" 
                        value="more"
                        onClick={(e) => {
                            navigate(`/profile/cookbook/${data.id}`)
                        }}
                    >
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