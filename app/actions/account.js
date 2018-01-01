import * as constants from '../constants';
import firebaseApp from '../config/firebase';
import * as firebase from 'firebase';
import {ToastAndroid} from 'react-native';

export function updateAccount(key, data){
	return (dispatch) => {
		dispatch(accountUpdate(key, data));
	}
}

export function updateBorrowCount(data){
	return (dispatch) => {
		dispatch(borrowCountUpdate(data));
	}
}

export function updateReturnCount(data){
	return (dispatch) => {
		dispatch(returnCountUpdate(data));
	}
}


//FUNCTIONS
function accountUpdate(key, data){
  console.log("Updating . . . ");
  return{
    type: constants.UPDATE_ACCOUNT,
    data,
    key
  }
}

function borrowCountUpdate(data){
  return{
    type: constants.UPDATE_BORROW_COUNT,
    data
  }
}

function returnCountUpdate(data){
  return{
    type: constants.UPDATE_RETURN_COUNT,
    data
  }
}