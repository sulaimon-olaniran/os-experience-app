import {
    FETCHED_ACCOUNT,
    SIGNING_UP,
    SIGNED_UP,
    SIGN_UP_ERROR,
    LOGGED_OUT,
    SIGNING_IN,
    SIGNED_IN,
    SIGN_IN_ERROR,
    FETCHING_ACCOUNT,
    FETCHED_ACCOUNT_FAILED,
    UPDATE_ACCOUNT_FAIL,
    UPDATING_ACCOUNT,
    UPDATED_ACCOUNT
} from '../../constants/actionTypes'


const initState = {
    token : localStorage.getItem('token'),
    isAuth : false,
    fetchingAccount : true,
    updatingAccount : false,
    updateAccountError : null,
    signingUp : false,
    signingIn : false,
    user : null,
    signUpError : null,
    signInError : null,
}





const authReducer = (state = initState, action) => {
    switch (action.type) {
        
        case FETCHING_ACCOUNT:
            return {
                ...state,
                //fetchingAccount : true
            }


        case FETCHED_ACCOUNT:
            return {
                ...state,
                fetchingAccount : false,
                isAuth : true,
                user : action.payload
            }


        case FETCHED_ACCOUNT_FAILED:
            return {
                ...state,
                fetchingAccount : false,
                isAuth : false,
                user : null,
            }
        
        case UPDATING_ACCOUNT:
            return {
                ...state,
                updatingAccount : true
            }


        case UPDATED_ACCOUNT:
            return {
                ...state,
                updatingAccount : false,
                user : action.payload
            }

        case UPDATE_ACCOUNT_FAIL:
            return {
                ...state,
                updateAccountError : action.payload,
                updatingAccount : false
            }
        
        case SIGNING_IN:
            return {
                ...state,
                signingIn : true
            }


        case SIGNING_UP:
            return {
                ...state,
                signingUp : true
            }
            
        case SIGNED_UP:
        case SIGNED_IN:
            localStorage.setItem("token", action.payload.token)
            return {
                ...state,
                isAuth : true,
                ...action.payload,
                signingUp : false,
                signingIn : false
            }
            
        case SIGN_UP_ERROR:
            
            return {
                ...state,
                isAuth : false,
                signUpError : action.payload,
                signingUp : false
            }
            
        case SIGN_IN_ERROR:
            
            return {
                ...state,
                isAuth : false,
                signInError : action.payload,
                signingIn : false,
            }
            
        case LOGGED_OUT:
            localStorage.removeItem('token')
            return {
                ...state,
                isAuth : false,
                user : null
            }

        default : return state

    }
}



export default authReducer