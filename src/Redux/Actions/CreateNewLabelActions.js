import {STORE_USERID, STORE_USER_LABEL, STORE_NAVIGATION_SCREEN, STORE_LABELID} from './CreateNewLabelType'
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

export const storeNavigationScreen = (screenName) => {
    return {
        type : STORE_NAVIGATION_SCREEN,
        payload : screenName
    }
}

export const storeLabelId = (labelId) => {
    return {
        type : STORE_LABELID,
        payload : labelId
    }
}