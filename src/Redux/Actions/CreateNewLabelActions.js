import {STORE_USERID, STORE_USER_LABEL} from './CreateNewLabelType'
export const storeUserID = (userId) => {
    return {
        type : STORE_USERID,
        payload : userId
    }
}

export const storeUserLabel = (userLabel) => {
    return {
        type : STORE_USER_LABEL,
        payload : userLabel
    }
}