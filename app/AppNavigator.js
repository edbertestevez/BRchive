import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import {Container, Header, Content, Footer, StyleProvider, Icon, Left, Right, Button, Body, Title, Card, CardItem} from 'native-base';

import LoginScreen from './containers/LoginScreen';
import SplashScreen from './containers/SplashScreen';
import HomeScreen from './containers/HomeScreen';
//BORROW
import BorrowScreen from './containers/Borrow/BorrowScreen';
import BorrowInfoScreen from './containers/Borrow/BorrowInfoScreen';
import BorrowAddScreen from './containers/Borrow/BorrowAddScreen'
//RETURN
import ReturnScreen from './containers/Return/ReturnScreen'
import ReturnInfoScreen from './containers/Return/ReturnInfoScreen'
import ReturnAddScreen from './containers/Return/ReturnAddScreen'

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
  },
  BorrowAdd:{
    screen: BorrowAddScreen,
    navigationOptions:{
      title: "New Borrow Record"  
    }
  },
  Return:{
    screen: ReturnScreen,
  }, 
  ReturnInfo:{
    screen: ReturnInfoScreen
  },
  ReturnAdd:{
    screen: ReturnAddScreen,
    navigationOptions:{
      title: "New Return Record",
    }
  }
},{
  initialRouteName: 'Splash',
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