import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog'
import { Button } from '@material-ui/core'




import { deleteExperience, saveExperience, unSaveExperience } from '../../../store/actions/experiences'







const OptionsDialog = ({ open, handleClose, user, experience, openShare }) => {

    const handleOpenShareDialog = () =>{
        openShare()
        handleClose()
    }


    const dispatch = useDispatch()

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <div className="options-dialog-container">

                {user?._id === experience?.createdBy &&
                    <div className="options-dialog-button-container">
                        <Button
                            onClick={() => dispatch(deleteExperience(experience?._id))}
                        >
                            Delete
                        </Button>
                    </div>
                }

                <Link
                    to={`/experience/${experience?._id}`}
                    className="options-dialog-button-container"
                >
                    <Button>
                        View
                    </Button>
                </Link>

                <div className="options-dialog-button-container">
                    <Button onClick={handleOpenShareDialog}>
                        Share
                    </Button>
                </div>

                {user?._id !== experience?.createdBy &&

                    <div className="options-dialog-button-container">
                        {user?.savedExperience.includes(experience?._id) ?
                            <Button
                                onClick={() => dispatch(unSaveExperience(experience?._id))}
                            >
                                Unsave
                            </Button>

                            :

                            <Button
                                onClick={() => dispatch(saveExperience(experience?._id))}
                            >
                                Save
                            </Button>}
                    </div>
                }

            </div>
        </Dialog>
    )
}



export default OptionsDialog