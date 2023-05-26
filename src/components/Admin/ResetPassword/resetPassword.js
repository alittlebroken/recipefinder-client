import { useState } from "react"
import { useDataProvider, useRecordContext } from "react-admin"

import Modal from '../../Modal/Modal'

const ResetPassword = () => {

    const dataProvider = useDataProvider()
    const record = useRecordContext()

    const [showModal, setShowModal] = useState(false)

    const [newPass, setNewPass] = useState()
    const [repeatPass, setRepeatPass] = useState()

    const [errors, setErrors] = useState()

    /* Handle updating the new password and repeat new password inputs */
    const handleNewPassInput = (event) => {
        setNewPass(event.target.value)
    }

    const handleRepeatPassword = (event) => {
        setRepeatPass(event.target.value)
    }

    /* What to do if the user submits the form */
    const handleSubmit = async (e) => {

        /* prevent any underlying forms from being submitted */
        e.preventDefault()

        /* Ensure that the passwords mactn before we submit */
        if(newPass === undefined || repeatPass === undefined){
            setErrors("You must supply a new password")
        } else if(newPass === repeatPass) {

            /* Ensure the pass is at least a few chars in length */
            if(newPass?.length < 8){
                setErrors("Password must be at least 8 or more characters in length")
            }

            /* All seems ok now send the password to the API to be changed */
            const response = await dataProvider.resetPassword('users', {
                id: record.id,
                password: newPass
            })

            if(!response || response === false){
                setErrors("There was a problem resetting the users password")
            }

            /* When the pass has been successfully changed
             * reset the input states */
            setNewPass(null)
            setRepeatPass(null)
            setErrors(null)

            /* Close the modal */
            setShowModal(false)
        } else {
            setErrors("The supplied passwords don't match")
        }
    }

    return (
        <>
            <button
                className="button" 
                onClick={ (e) => {
                    e.preventDefault()
                    setShowModal(true)
                    }
                } >
                Reset password
            </button>
            <Modal
                title="Password reset" 
                show={showModal} 
                onClose={setShowModal}
                onSubmit={handleSubmit}
                footer={errors && errors}
            >
                <form>
                    <label for="newPassword">New Password</label>
                    <input
                    className="input"
                    id="newPass" 
                    type="password" 
                    onChange={handleNewPassInput}
                    />
                    <label for="repeatPass">Confirm Password</label>
                    <input 
                    className="input"
                    id="repeatPass"
                    type="password" 
                    onChange={handleRepeatPassword}
                    />
                </form>
                <button className="button" onClick={handleSubmit}>Reset</button>
            </Modal>
        </>
    )

}

export default ResetPassword