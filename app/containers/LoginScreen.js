import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity
} from 'react-native';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import ResponsiveImage from 'react-native-responsive-image';
import Icon from 'react-native-vector-icons/Zocial';
//NAVIGATION
import { StackNavigator,NavigationActions } from 'react-navigation';
//STYLE
import styles from '../styles/style_main';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../actions'
import * as firebase from 'firebase'

class LoginScreen extends Component {
	componentDidMount(){

  }
  
  render(){
	console.log(this.props);
	return(
	<View style={styles.containerLogin}>
        <ResponsiveImage source={require('../img/logo.png')} initWidth="450" initHeight="450" style={{marginTop:-40}}/>
        
        <TouchableOpacity 
          onPress = {()=>this.props.actions.func_googleSignin()}
          style={styles.loginButton}>
          <ResponsiveImage style={{marginLeft: 20, marginRight:35}} source={require('../img/google.png')} initWidth="30" initHeight="30"/>
          <Text style={{fontSize: 18, textAlign: "center",fontWeight:'bold', color:"#73746D"}}>Sign in with Google</Text>
        </TouchableOpacity>
        
        <View style={styles.footerContainer}>
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

export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen);