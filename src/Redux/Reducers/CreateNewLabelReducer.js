import { STORE_USERID, STORE_USER_LABEL } from '../Actions/CreateNewLabelType'

const initialState = {
    userId : '',
    userLabel : []
}

const CreateNewLabelReducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_USERID:
            return {
                ...state,
                userId : action.payload
            }
        case STORE_USER_LABEL:
            return {
                ...state,
                userLabel : action.payload
            }
        default:
            return state;
    }
}

export default CreateNewLabelReducer; 