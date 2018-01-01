import { combineReducers } from 'redux';
import nav from './nav';
import account from './user/account'
const rootReducer = combineReducers({
	nav,
	account
})

export default rootReducer