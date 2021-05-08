import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import { Form, Field, withFormik, } from 'formik'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import { green } from '@material-ui/core/colors'
import FileBase from 'react-file-base64'
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto'



import { CreateExperienceValidationSchema } from '../../components/validation_schema/ValidationSchema'
import { createExperience } from '../../store/actions/experiences'




const MySelectComponent = ({ setFieldValue, errors, touched }) => {
   

    const handleChange = (e) => {
        setFieldValue("category", e.target.value, true)
    }

    return (

        <FormControl 
            variant="outlined" 
            style={{ width: "100%" }}
            error={touched.category && errors.category ? true : false}
        >

            <InputLabel htmlFor="outlined-age-native-simple">Category</InputLabel>

            <Select
                native
                onChange={handleChange}
                label="Category"
                inputProps={{
                    name: 'category',
                    id: 'outlined-age-native-simple',
                }}
            >
                <option aria-label="None" value="" />
                <option value="Sports">Sports</option>
                <option value="Adventure">Adventure</option>
                <option value="Work">Work</option>
                <option value="Food" >Food</option>
                <option value="Travels">Travels</option>
                <option value="Vacations">Vacation</option>
                <option value="Honeymoon">Honeymoon</option>
                <option value="Honeymoon">Others</option>
            </Select>

            {touched.category && errors.category && <small>{errors.category}</small> }

        </FormControl>
    )
}




const CreateExperiencePage = ({ setFieldValue, touched, errors }) => {
     const [fileName, setFileName] = useState("")
    
    //console.log(errors)
    
    const handleFileBaseDone = (file) =>{
        const fName = file.name.substr(0, 20)
        setFileName(fName)
        setFieldValue(setFieldValue("imageUrl", file.base64))
    }

    
    const isAuth = useSelector((state) => state.auth.isAuth)

    if(!isAuth) return <Redirect to='/signin' />


    return (
        <div className="create-experience-page-form-container">


            <div className="create-experience-form-section-container">
                <div className="create-experience-page-form-image-div" />
                <Form>

                    <MySelectComponent
                        setFieldValue={setFieldValue}
                        touched={touched}
                        errors={errors}
                    />


                    <Field
                        as={TextField}
                        type="text" name="title"
                        label="Title" id="outlined-basic"
                        variant="outlined"
                        style={{ width: "100%" }}
                        error={touched.title && errors.title ? true : false}
                        helperText={touched.title && errors.title ? errors.title : null}
                    />


                    <Field as={TextField} type="text" name="summary" label="Summary"
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        variant="outlined"
                        style={{ width: "100%" }}
                        error={touched.summary && errors.summary ? true : false}
                        helperText={touched.summary && errors.summary ? errors.summary : null}
                    />

                    <label>

                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={(file) => handleFileBaseDone(file)}
                        />

                        <div 
                            className="custom-input-file-container"
                            style={ touched.imageUrl && errors.imageUrl &&  {borderColor : "red"}}
                        
                        >

                            <div className="button-container">
                                <p>Add Image </p><InsertPhotoIcon style={{ color: "white", marginLeft: "5px" }} />
                            </div>

                            <div className="file-name-container">
                               <p>{fileName ? fileName  : "No Image Selected"}</p> 
                            </div>

                        </div>

                        { touched.imageUrl && errors.imageUrl && <small>Please add an image</small>}
                    </label>


                    <Field
                        as={Button}
                        type="submit"
                        variant="outlined"
                        style={{ backgroundColor: green[500], color: "white", width: "250px" }}
                    >
                        Share Experience
                    </Field >

                    

                </Form>
            </div>
        </div>
    )
}



const FormikCreateExperiencePage = withFormik({
    mapPropsToValues({ user }) {
        return {
            "category": "",
            "title": "",
            "summary": "",
            "createdBy": user?._id,
            "imageUrl": "",
        }
    },

    validationSchema: CreateExperienceValidationSchema,

    handleSubmit(values, { props, setStatus, setSubmitting }) {
        //const { category, title, summary, imageUrl } = values
        const { createExperience } = props

        
        createExperience(values)
        //console.log(values)

    }
})(CreateExperiencePage)


const mapStateToProps = state => {
    return{
        user: state.auth.user
    }
}


const mapDispatchToProps = (dispatch) =>{
    return{
        createExperience : (data) => dispatch(createExperience(data)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FormikCreateExperiencePage)


