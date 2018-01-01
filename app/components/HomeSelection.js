import React, {Component} from 'react'
import { TouchableOpacity, View, Text, ToastAndroid } from 'react-native'
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import btnStyles from '../styles/style_buttons';
import colorStyles from '../styles/style_colors';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../actions'
import { BackHandler } from "react-native";
class HomeSelection extends Component {

	render(){
		return(
			<View>
				{/*Borrowed Item*/}
		        <TouchableOpacity style={[btnStyles.homeButton,colorStyles.bgPrimary]} onPress={this.props.borrowItems}>
		          <View>
		            <Icon name="arrow-left-bold-hexagon-outline" style={colorStyles.cSubPrimary} size={40}/>
		          </View>
		            <Text style={btnStyles.homeText}>Borrowed Items</Text>  
		            <Text style={btnStyles.homeNum}>{this.props.state.account.borrowCount}</Text>  
		        </TouchableOpacity>

				{/*Return Item*/}
				<TouchableOpacity style={[btnStyles.homeButton,colorStyles.bgPrimary]} onPress={this.props.returnItems}>
		          <View>
		            <Icon name="arrow-right-bold-hexagon-outline" style={colorStyles.cSubPrimary} size={40}/>
		          </View>
		            <Text style={btnStyles.homeText}>Return Items</Text>  
		            <Text style={btnStyles.homeNum}>{this.props.state.account.returnCount}</Text>  
		        </TouchableOpacity>		        
	        </View>
		);
	}
	
}

HomeSelection.propTypes = {
  borrowItems: PropTypes.func,
  returnItems: PropTypes.func
};


//PROPS
const mapStateToProps = state => ({
  state: state
});
 
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(HomeSelection);