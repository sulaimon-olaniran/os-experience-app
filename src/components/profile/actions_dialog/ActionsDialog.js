import React from 'react'
import { useDispatch } from 'react-redux'
import Dialog from '@material-ui/core/Dialog'
import { Button } from '@material-ui/core'




import { logoutUser } from '../../../store/actions/auth'







const ProfileActionsDialog = ({ open, handleClose, id }) => {


    const dispatch = useDispatch()

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <div className="profile-actions-dialog-container">

                <div className="profile-actions-dialog-button-container">
                    <Button>
                        Change Password
                    </Button>
                </div>

                <div className="profile-actions-dialog-button-container">
                    <Button
                        onClick={() => dispatch(logoutUser())}
                    >
                        Log Out
                    </Button>
                </div>

                <div className="profile-actions-dialog-button-container" >
                    <Button>
                        Delete Account 
                    </Button>
                </div>

            </div>
        </Dialog>
    )
}



export default ProfileActionsDialog