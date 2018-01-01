import * as constants from '../constants';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import firebaseApp from '../config/firebase';
import * as firebase from 'firebase';
import {ToastAndroid} from 'react-native';

export function func_googleSignin(){
  return (dispatch) => {
  GoogleSignin.configure({
      //iosClientId: "<FROM DEVELOPER CONSOLE>", // only for iOS
      webClientId: "539651046642-tdoo7krno4n8ir9vuuc7uv1uqbv5ipnk.apps.googleusercontent.com",
    })
    .then(() => {
    GoogleSignin.signIn()
          .then((user) => {
            console.log(user);
            const credential = firebase.auth.GoogleAuthProvider.credential(user.idToken, user.accessToken);
            console.log(credential)
            return firebase.auth().signInWithCredential(credential);
          })
          .then((currentUser)=>{
            //INSERT RECORD SA FIREBASE
            let phone;
            if(currentUser.phoneNumber==null){
              phone="Not Available";
            }else{
              phone = currentUser.phoneNumber;
            }
            firebase.database().ref("/users").once('value', function(snapshot){
              if(snapshot.hasChild(currentUser.uid)){
                alert(snapshot.child("/"+currentUser.uid+"/email").val());
              }else{
                firebase.database().ref("/users/"+currentUser.uid).set({
                  name: currentUser.displayName,
                  email: currentUser.email,
                  phone: phone,
                  borrowCount: 0,
                  returnCount: 0
                })
              }
            });
            
            console.log(currentUser);
          })
          //.then(dispatch(loginUser()))
          .catch((err) => {
            console.log('WRONG SIGNIN', err);
          })
          .done();
    });
    }

}


export function func_googleSignout(){
  return (dispatch) => {
   GoogleSignin.signOut()
    .then(() => {
      //this.setState({user: ''});
      firebase.auth().signOut().then(function() {
      console.log("Logged out successfully");
      dispatch(logoutUser()); //FUNCTION to reducer
      // Sign-out successful.
      console.log("OUT");
    }, function(error) {
      // An error happened.
    });
      console.log("Logged out successfully");
    })
    .catch((err) => {
      console.log(err);
    });

    }
}

export function func_signout(){
  firebase.auth().signOut().then(function() {
    console.log('Signed Out');
  }, function(error) {
    console.error('Sign Out Error', error);
  });

  return (dispatch)=>{}
}





//FUNCTIONS
function loginUser(){
  console.log("MA LOGIN KA TO");
  return{
    type: constants.LOGIN_USER
  }
}

function logoutUser(){
console.log("MA LOGOUT KA TO");
  return{
    type: constants.LOGOUT_USER
  }
}