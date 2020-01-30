import * as ACTION_TYPES from './ActionTypes'
import Utilities from '../utils/Utilities';

export const registerAction = (dataRegister) => {
    return {
        type: ACTION_TYPES.REGISTER,
        dataRegister
    }
}

export const activeAccountAction = (email, code) => {
    return {
        type: ACTION_TYPES.ACTIVE_ACCOUNT,
        email,
        code
    }
}

export const sendEmailAction = (email, types) => {
    return {
        type: ACTION_TYPES.SEND_EMAIL,
        email,
        types
    }
}

export const forgotPasswordAction = (data) => {
    return {
        type: ACTION_TYPES.FORGOT_PASSWORD,
        data
    }
}

export const loginAction = (username, password) => {
    return {
        type: ACTION_TYPES.LOGIN,
        username,
        password
    }
}

export const logoutAction = () => {
    return {
        type: ACTION_TYPES.LOGOUT
    }
}

export const getUserInfoAction = () => {
    return {
        type: ACTION_TYPES.GET_USER_INFO
    }
}

export const updateUserInfoAction = (dataUpdate, isUpdatePassword) => {
    return {
        type: ACTION_TYPES.UPDATE_USER_INFO,
        dataUpdate,
        isUpdatePassword
    }
}