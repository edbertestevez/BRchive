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

class SplashScreen extends Component {

	changeScreen(){
		alert("LOGGED");
		/*const actionToDispatch = NavigationActions.reset({
	    index: 0,
	    actions: [NavigationActions.navigate({ routeName: "Home" })]
	  })
	  this.props.navigation.dispatch(actionToDispatch)	*/
	}

	checkLog(){
		const { navigate } = this.props.navigation;
		console.log("OK");
		let route;
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
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
		setTimeout(()=>this.checkLog(), 2000);
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