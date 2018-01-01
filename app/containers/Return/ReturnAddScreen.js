import React, { Component } from 'react';
import {View, Text, TouchableOpacity, ToastAndroid} from "react-native";
import { NavigationActions } from 'react-navigation';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions'
import { BackHandler, ListView } from "react-native";
//FIREBASE
import firebaseApp from '../../config/firebase';
import * as firebase from 'firebase';
import ResponsiveImage from 'react-native-responsive-image';
import HomeSelection from '../../components/HomeSelection';
import styles from '../../styles/style_main';
import btnStyles from '../../styles/style_buttons';
import colorStyles from '../../styles/style_colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Container, Header, Content, Form, Input, Item, Label, Footer, StyleProvider, Left, Right, Button, Body, Title, Card, CardItem} from 'native-base';

const user_uid = '';
class ReturnAddScreen extends Component {

	/*NO REDUX FOR NOW*/
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	item_name:'',
	  	quantity: 0,
	  	borrower: '',
	  	note: '',
	  };
	  
	}

	componentWillMount(){
		user_uid = this.props.state.account.uid;
	}

    addRecord(){
    	//create new key
    	let new_key = firebase.database().ref("/return/"+user_uid).push().getKey();

    	firebase.database().ref("/return/"+user_uid+"/"+new_key).set({
            item_name: this.state.item_name,
			quantity: this.state.quantity,
			note: this.state.note,
			borrower: this.state.borrower
        })

    	this.props.navigation.navigate("Return");
        ToastAndroid.show('Record successfully added', ToastAndroid.SHORT);

    }

	render(){
		return(
			<Container>
				<Content padder>
					<Form>
		            	<Item stackedLabel>
		              	<Label>Item Name:</Label>
		              	<Input selectTextOnFocus={true} onChangeText={(item_name)=>this.setState({item_name})} placeholder="Enter item name">{this.state.item_name}</Input>
		            	</Item>
		            	
		            	<Item stackedLabel>
		              	<Label>Quantity:</Label>
		              	<Input selectTextOnFocus={true} onChangeText={(quantity)=>this.setState({quantity})} placeholder="Enter quantity">{this.state.quantity}</Input>
		            	</Item>
		          	
		            	<Item stackedLabel>
		              	<Label>Lender:</Label>
		              	<Input selectTextOnFocus={true} onChangeText={(borrower)=>this.setState({borrower})} placeholder="Enter name of lender">{this.state.borrower}</Input>
		            	</Item>

		            	<Item stackedLabel>
		              	<Label>Note:</Label>
		              	<Input selectTextOnFocus={true} multiline={true} maxNumberOfLines={4}  initHeight="auto" style={{textAlignVertical: "top"}} onChangeText={(note)=>this.setState({note})} placeholder="Enter additional note (Optional)">{this.state.note}</Input>
		            	</Item>

		            	<Button full success style={{marginTop: 25}} onPress={()=>this.addRecord()}>
				        	<Text style={{color:'white'}}>Save Record</Text>
				        </Button>
		          	</Form>	
				</Content>

			</Container>			

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

export default connect(mapStateToProps,mapDispatchToProps)(ReturnAddScreen);