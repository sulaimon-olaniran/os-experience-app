import React, { useState } from 'react'
import { Form, Field, withFormik } from 'formik'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
//import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import FileBase from 'react-file-base64'
import { green } from '@material-ui/core/colors'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto'




import { updateAccount } from '../../store/actions/auth'




const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        marginBottom: "15px",
    },
}));




const EditProfilePage = ({ errors, touched, serverError, setFieldValue, values }) => {
    const [newImage, setNewImage] = useState(null)
    const styles = useStyles()



    const handleFileBaseDone = (file) => {
        setNewImage(file.base64)
        setFieldValue(setFieldValue("profileImage", file.base64))
    }

    const handleRemoveImage = (file) => {
        setNewImage('')
        setFieldValue(setFieldValue("profileImage", ''))
    }


    return (

        <div className="edit-profile-page-container">

            <Form className="edit-profile-page-form-container">
                <Avatar
                    className={styles.large}
                    src={newImage ? newImage : values?.profileImage}
                />

                <div className="upload-image-controllers">

                    <label>

                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={(file) => handleFileBaseDone(file)}
                        />

                        <div className="custom-input-file-container">

                            <div className="button-container">
                                <p>Select Image </p><InsertPhotoIcon style={{ color: "white", marginLeft: "5px" }} />
                            </div>

                        </div>


                    </label>

                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleRemoveImage}
                    >
                        Remove Image
                    </Button>
                </div>

                <Field as={TextField}
                    type="text" name="firstName"
                    label="First Name" id="firstName"
                    variant="outlined"
                    error={touched.firstName && errors.firstName ? true : false}
                    helperText={touched.firstName && errors.firstName ? errors.firstName : null}
                    style={{ width: "95%" }}
                />

                <Field as={TextField}
                    type="text" name="lastName"
                    label="Last Name" id="lastName"
                    variant="outlined"
                    error={touched.lastName && errors.lasNname ? true : false}
                    helperText={touched.lastName && errors.lastName ? errors.lastName : null}
                    style={{ width: "95%" }}
                />

                <Field as={TextField}
                    type="text" name="about"
                    label="About You" id="about"
                    variant="outlined"
                    error={touched.about && errors.about ? true : false}
                    helperText={touched.about && errors.about ? errors.about : null}
                    style={{ width: "95%" }}
                />



                <Field as={TextField}
                    type="text" name="website"
                    label="Your Website Link" id="website"
                    variant="outlined"
                    style={{ width: "95%" }}
                />



                <Field as={TextField}
                    type="text" name="instagram"
                    label="Your Instagram Link" id="instagram"
                    variant="outlined"
                    style={{ width: "95%" }}
                />


                <Field as={TextField}
                    type="text" name="twitter"
                    label="Your Twitter Link" id="twitter"
                    variant="outlined"
                    style={{ width: "95%" }}
                />




                <Field as={TextField}
                    type="text" name="facebook"
                    label="Your Facebook Link" id="facebook"
                    variant="outlined"
                    style={{ width: "95%" }}
                />



                <Field
                    as={Button}
                    type="submit"
                    variant="outlined"
                    id='submit_button'
                    style={{ backgroundColor: green[500], color: "white", width: "250px" }}
                >
                    Update Profile
                </Field >

                {serverError !== null && <small className="error-text">{serverError}</small>}



            </Form>

        </div>
    )
}




const FormikEditProfile = withFormik({
    mapPropsToValues({ user }) {
        return {
            "firstName": user?.firstName || "",
            "lastName": user?.lastName || "",
            "profileImage": user?.profileImage || "",
            "facebook": user?.facebook || "",
            "instagram": user?.instagram || "",
            "twitter": user?.twitter || "",
            "about": user?.about || "",
            "website": user?.website || ""
        }
    },

    //validationSchema: SignUpValidationSchema,

    handleSubmit(values, { props, setStatus, setSubmitting }) {
        const { updateAccount } = props
        //const { firstName, lastName, email, password } = values

        updateAccount(values)

    }
})(EditProfilePage)


const mapStateToProps = state => {
    return {
        serverError: state.auth.updateAccountError,
        user: state.auth.user
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        updateAccount: data => dispatch(updateAccount(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FormikEditProfile)