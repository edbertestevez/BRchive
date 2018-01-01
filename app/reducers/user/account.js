import {LOGIN_USER, LOGOUT_USER, UPDATE_ACCOUNT} from '../../constants'

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
				borrowCount: action.data.borrowCount,
				returnCount: action.data.returnCount,
				name: action.data.name,
				phone: action.data.phone,
				email: action.data.email
			}
		} 
		default: return state
	}
}	