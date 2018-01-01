import React, { Component } from 'react';
import {View, Text, TouchableOpacity} from "react-native";
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
import HomeSelection from '../components/HomeSelection';
import styles from '../styles/style_main';
import btnStyles from '../styles/style_buttons';


class HomeScreen extends Component {

	
	// componentWillMount(){
	// 	//schange ni after implement
	// 	firebase.database().ref("/users/iH0q89QPSCU04kcNcrGwLVXiCw53").on('value', (snapshot) => {
	// 		if(snapshot.exists()){
	// 			this.props.actions.updateAccount(snapshot.key,snapshot.val());
	// 		}
	// 		console.log("VALUE:",snapshot.numChildren());
	// 	});
	// }
	render(){
		const { navigate } = this.props.navigation;
		console.log(this.props)
		return(
			<View style={{flex:1, alignItems:'center',backgroundColor: '#fff'}}>
				<ResponsiveImage source={require('../img/logo.png')} initWidth="250" initHeight="250" style={{marginTop:50, marginBottom: 10}}/>
				
				<HomeSelection
					borrowItems = {()=>navigate("Borrow")}
					returnItems = {()=>navigate("Return")}
				/>

				<View style={styles.footerContainer}>
		          	<Text style={styles.userText}>Edbert Jason Estevez</Text>
		          	<TouchableOpacity 
		          		onPress={()=>this.props.actions.func_signout()}
		          		style={btnStyles.logoutButton}>
		          		
		          		<Text style={btnStyles.normalText}>Sign Out</Text>
		          	</TouchableOpacity>

		          	<Text style={styles.footerText}> &#9400; All Rights Reserved</Text>
		          	<Text style={[styles.footerText, styles.brown]}> DecypherApps</Text>
		        </View>

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

export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen);