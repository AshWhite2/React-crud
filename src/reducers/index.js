import { combineReducers } from 'redux'
import users from './users'
import { reducer as formReducer } from 'redux-form'
import { authReducer } from "./authReducer";

export default combineReducers({
    users,
    auth: authReducer,
    form: formReducer
})