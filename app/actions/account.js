import * as constants from '../constants';
import firebaseApp from '../config/firebase';
import * as firebase from 'firebase';
import {ToastAndroid} from 'react-native';

export function updateAccount(data){
	return (dispatch) => {
		dispatch(accountUpdate(data));
	}
}

//FUNCTIONS
function accountUpdate(data){
  console.log("Updating . . . ");
  return{
    type: constants.UPDATE_ACCOUNT,
    data
  }
}