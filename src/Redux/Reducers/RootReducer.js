import {combineReducers} from 'redux'
import CreateNewLabelReducer from './CreateNewLabelReducer'

const RootReducer = combineReducers({
    createLabelReducer : CreateNewLabelReducer
})

export default RootReducer