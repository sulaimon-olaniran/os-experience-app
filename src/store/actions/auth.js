import axios from 'axios'


import { usersUrl } from '../../api'

import {
    FETCHED_ACCOUNT,
    SIGNING_UP,
    SIGNED_UP,
    LOGGED_OUT,
    SIGNING_IN,
    SIGN_UP_ERROR,
    SIGNED_IN,
    SIGN_IN_ERROR,
    FETCHING_ACCOUNT,
    FETCHED_ACCOUNT_FAILED,
    UPDATING_ACCOUNT,
    UPDATED_ACCOUNT,
    UPDATE_ACCOUNT_FAIL,
    DELETING_ACCOUNT,
    DELETED_ACCOUNT,
    DELETE_ACCOUNT_FAILED

} from '../../constants/actionTypes'




const baseUrl = usersUrl




export const signUpUser = ({ firstName, lastName, email, password }) => {
    return (dispatch, getState) => {
        dispatch({ type: SIGNING_UP })

        //const reqBody = JSON.stringify({ firstName, lastName, email, password })
        const newUser = {
            firstName,
            lastName,
            email,
            password
        }


        axios.post(baseUrl, newUser)
            .then(res => {
                dispatch({
                    type: SIGNED_UP,
                    payload: res.data
                })
            })
            .catch(error => {
                //console.log(error.response.data.message)

                dispatch({
                    type: SIGN_UP_ERROR,
                    payload: error.response.data.message
                })
            })
    }

}


export const signInUser = ({ email, password }) => {
    return (dispatch, getState) => {
        dispatch({ type: SIGNING_IN })

        const reqBody = { email, password }

        axios.post(`${baseUrl}/auth`, reqBody)
        .then(res => {
            dispatch({
                type : SIGNED_IN,
                payload : res.data
            })
        })
        .catch(error => {
            //console.log(error.response.data.message)

            dispatch({
                type: SIGN_IN_ERROR,
                payload: error.response.data.message
            })
        })

    }

}


export const getAccount = () => {
    return (dispatch, getState) => {
        dispatch({ type: FETCHING_ACCOUNT })


        const token = getState().auth.token

        const config = {
            headers: {
                "content-type": "application/json"
            }
        }


        if (token) {
            config.headers["x-auth-token"] = token
        }


        axios.get(`${baseUrl}/auth/user`, config)
            .then(res => {
                dispatch({
                    type: FETCHED_ACCOUNT,
                    payload: res.data
                })
            })
            .catch(error => {
                //console.log(error)
                dispatch({
                    type : FETCHED_ACCOUNT_FAILED
                })
            })
    }

}



export const updateAccount = (data) => {
    return (dispatch, getState) => {
        dispatch({ type : UPDATING_ACCOUNT })

        const { firstName, lastName, website, instagram, twitter, facebook, profileImage, about } = data

        const updatedUser = {
            firstName, lastName, website, instagram, twitter, facebook, profileImage, about
        }

        const token = getState().auth.token
        //console.log(data)
        const config = {
            headers: {
                "content-type": "application/json"
            }
        }


        if (token) {
            config.headers["x-auth-token"] = token
        }

        axios.patch(`${baseUrl}/update/user`, updatedUser, config)
        .then(res => {
            console.log(res.data)
            dispatch({ 
                type : UPDATED_ACCOUNT,
                payload : res.data.user
            })
        })
        .catch(error => {
            dispatch({
                type : UPDATE_ACCOUNT_FAIL,
                payload : error.response.data.message
            })
        })


    }
}

export const deleteAccount = (history) => {
    return (dispatch, getState) => {
        dispatch({
            type : DELETING_ACCOUNT
        })
        

        const token = getState().auth.token
        

        axios.delete(`${baseUrl}/delete/user`, { data: null, headers: {"x-auth-token": token } })
        .then(res => {
            console.log(res)
            dispatch({
                type : DELETED_ACCOUNT,
                payload : res.data.message
            })
            history.push('/')
        })
        .catch(error =>{
            dispatch({
                type : DELETE_ACCOUNT_FAILED,
                payload : error.response.data.message
            })
        })
    }
}



export const logoutUser = (history) => {
    return (dispatch, getState) =>{
        dispatch({
            type : LOGGED_OUT
        })

        history.push('/')
    }
}