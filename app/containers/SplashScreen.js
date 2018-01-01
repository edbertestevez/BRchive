import React, { Component } from 'react';
import {View, Text} from "react-native";
import { NavigationActions } from 'react-navigation';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../actions'
import { BackHandler } from "react-native";
//FIREBASE
import firebaseApp from '../config/firebase';
import * as firebase from 'firebase';
import ResponsiveImage from 'react-native-responsive-image';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

class SplashScreen extends Component {


	changeScreen(){
		alert("LOGGED");
		/*const actionToDispatch = NavigationActions.reset({
	    index: 0,
	    actions: [NavigationActions.navigate({ routeName: "Home" })]
	  })
	  this.props.navigation.dispatch(actionToDispatch)	*/
	}

	checkLog(action){
		const { navigate } = this.props.navigation;
		console.log("OK");
		let route;
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				firebase.database().ref("/users/"+user.uid).on('value', (snapshot) => {
					if(snapshot.exists()){
						action.updateAccount(snapshot.key,snapshot.val());
					}
				});

				firebase.database().ref("/borrow/"+user.uid).on('value', (snapshot) => {
					if(snapshot.exists()){
						action.updateBorrowCount(snapshot.numChildren());
					}
					console.log("BORROW VALUE:",snapshot.numChildren());
				});

				firebase.database().ref("/return/"+user.uid).on('value', (snapshot) => {
					if(snapshot.exists()){
						action.updateReturnCount(snapshot.numChildren());
					}
					console.log("RETURN VALUE:",snapshot.numChildren());
				});

			   console.log('user logged');
			   route="Home";
		    }else{
		    	console.log('not logged');
		    	route = "Login";
		    }
		    const actionToDispatch = NavigationActions.reset({
			    index: 0,
			    actions: [NavigationActions.navigate({ routeName: "Login" })]
			  })

			navigate(route);
		});
		

	  
	}

	componentWillMount(){
		//schange ni after implement
		if(this.props.state.account.uid!=""){
			firebase.database().ref("/users/"+this.props.state.account.uid).on('value', (snapshot) => {
				if(snapshot.exists()){
					this.props.actions.updateAccount(snapshot.key,snapshot.val());
				}
				console.log("VALUE:",snapshot.numChildren());
				});
		}
		setTimeout(()=>this.checkLog(this.props.actions), 2000);

		//para ma access sa tnan
		GoogleSignin.configure({
      	//iosClientId: "<FROM DEVELOPER CONSOLE>", // only for iOS
     	 webClientId: "539651046642-tdoo7krno4n8ir9vuuc7uv1uqbv5ipnk.apps.googleusercontent.com",
   		 });
	
	}

	render(){
		console.log(this.props)
		return(
			<View style={{flex:1, justifyContent:'center', alignItems:'center',backgroundColor: '#fff'}}>
				<ResponsiveImage source={require('../img/logo.png')} initWidth="400" initHeight="400" style={{marginTop:-40}}/>
				<Text style={{fontSize: 20, fontWeight: 'bold', color: "#cacaca"}}> By DecypherApps </Text>
			</View>
		)
	}
}

//PROPS
const mapStateToProps = state => ({
  state: state
});
 
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(SplashScreen);