import React from 'react'
import Backdrop from '@material-ui/core/Backdrop'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { FadeLoader } from "react-spinners"






const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))





const ActionLoader = () => {
    const styles = useStyles()
    const actionsLoader = useSelector((state) => state.experiences.actionsLoader)
    const updatingAccount = useSelector((state) => state.auth.updatingAccount)

    return (
        <Backdrop className={styles.backdrop} open={actionsLoader || updatingAccount}>
            <FadeLoader color="white" />
        </Backdrop>
    )
}



export default ActionLoader