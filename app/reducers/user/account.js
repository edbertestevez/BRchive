import {LOGIN_USER, LOGOUT_USER, UPDATE_ACCOUNT, UPDATE_BORROW_COUNT, UPDATE_RETURN_COUNT} from '../../constants'

//initial values
const initialState = {
	uid: '',
	name: '',
	email: '',
	phone: '',
	borrowCount: 0,
	returnCount: 0,
	isLogged: false,
}

export default function accountReducer(state = initialState, action){
	switch(action.type){
		case LOGIN_USER:{
			return{
				...state,
				isLogged: true,
			}
		}break;

		case LOGOUT_USER:{
			return{
				...state,
				isLogged: false,
			}
		}break;
		
		case UPDATE_ACCOUNT:{
			return{
				...state,
				uid: action.key,
				name: action.data.name,
				phone: action.data.phone,
				email: action.data.email
			}
		}break;

		case UPDATE_BORROW_COUNT:{
			return{
				...state,
				borrowCount: action.data
			}
		}break; 

		case UPDATE_RETURN_COUNT:{
			return{
				...state,
				returnCount: action.data
			}
		}break; 
		default: return state
	}
}	