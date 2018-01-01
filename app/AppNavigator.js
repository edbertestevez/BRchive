import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import {Container, Header, Content, Footer, StyleProvider, Icon, Left, Right, Button, Body, Title, Card, CardItem} from 'native-base';

import LoginScreen from './containers/LoginScreen';
import SplashScreen from './containers/SplashScreen';
import HomeScreen from './containers/HomeScreen';
import BorrowScreen from './containers/BorrowScreen';
import BorrowInfoScreen from './containers/BorrowInfoScreen';

//EDIT HERE 
//Navigation ka pages
export const AppNavigator = StackNavigator({
  Splash: { 
    screen: SplashScreen, 
    navigationOptions:{
      header: null
    }
  },
  Login: { 
  	screen: LoginScreen, 
  	headerMode: 'screen',
  	navigationOptions:{
  		header: null
  	}
  },
  Home: { 
    screen: HomeScreen, 
    navigationOptions:{
      header: null
    }
  },
  Borrow:{
    screen: BorrowScreen,
  }, 
  BorrowInfo:{
    screen: BorrowInfoScreen
  }
},{
  initialRouteName: 'Borrow',
}
);	
	
const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);