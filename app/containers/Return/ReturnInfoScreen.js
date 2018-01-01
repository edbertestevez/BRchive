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

//Make global variable to access state on the navigationOptions (key sang borrow)
const del_key = '';
const del_uid = '';

class ReturnInfoScreen extends Component {

	/*NO REDUX FOR NOW*/
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	key:'',
	  	item_name:'',
	  	quantity: 0,
	  	borrower: '',
	  	note: '',
	  	isEditing: false
	  };
	}

	componentWillMount(){
		const {state} = this.props.navigation;
		this.setState({
			key: state.params.key,
			item_name: state.params.item_name,
			quantity: state.params.quantity,
			note: state.params.note,
			borrower: state.params.borrower
		});
		del_key = state.params.key;
		del_uid = this.props.state.account.uid;
	}

	//set functions for the static navigationOptions na mga function
	componentDidMount(){
		this.props.navigation.setParams({
            changeEditable: this.setEditable,
            deleteRecord: this.deleteRecord
        });
	}

	
	setEditable(){
    	this.setState({isEditing:true})
    }

    deleteRecord(navigation){
    	//console.log("ARI K", del_uid)
    	firebase.database().ref("/return/"+del_uid+"/"+del_key).remove();
    	ToastAndroid.show('Record successfully deleted', ToastAndroid.SHORT);
    	navigation.navigate("Return")
    }

	static navigationOptions = ({navigation}) =>{
		const {params = {}} = navigation.state;
		return{
        title: "Item Information",
      	headerRight:
      	<View style={{flexDirection:'row',justifyContent:'center'}}>
	        <Button transparent onPress={()=>params.deleteRecord(navigation)}>
	            <Icon style={{marginLeft: 12, marginRight: 10}} name='delete' size={32} />
	        </Button>
        </View>
        }        
    };

    saveChanges(){
    	this.setState({isEditing:false});
    	
    	let key = this.state.key;
    	firebase.database().ref("/return/"+del_uid+"/"+key).set({
            item_name: this.state.item_name,
			quantity: this.state.quantity,
			note: this.state.note,
			borrower: this.state.borrower
        })

        ToastAndroid.show('Record successfully updated', ToastAndroid.SHORT);
    }

	render(){
		return(
			<Container>
				<Content padder>
					<Form>
		            	<Item stackedLabel>
		              	<Label>Item Name:</Label>
		              	<Input editable = {this.state.isEditing} selectTextOnFocus={true} onChangeText={(item_name)=>this.setState({item_name})} placeholder="Enter item name">{this.state.item_name}</Input>
		            	</Item>
		            	
		            	<Item stackedLabel>
		              	<Label>Quantity:</Label>
		              	<Input editable = {this.state.isEditing} selectTextOnFocus={true} onChangeText={(quantity)=>this.setState({quantity})} placeholder="Enter quantity">{this.state.quantity}</Input>
		            	</Item>
		          	
		            	<Item stackedLabel>
		              	<Label>Borrower:</Label>
		              	<Input editable = {this.state.isEditing} selectTextOnFocus={true} onChangeText={(borrower)=>this.setState({borrower})} placeholder="Enter name of lender">{this.state.borrower}</Input>
		            	</Item>

		            	<Item stackedLabel>
		              	<Label>Note:</Label>
		              	<Input editable = {this.state.isEditing} selectTextOnFocus={true} multiline={true} maxNumberOfLines={4}  initHeight="auto" style={{textAlignVertical: "top"}} onChangeText={(note)=>this.setState({note})} placeholder="Enter additional note (Optional)">{this.state.note}</Input>
		            	</Item>

		            	{!this.state.isEditing &&
		            		<Button full primary style={{marginTop:25}} onPress={()=>this.setState({isEditing:true})}>
		            			<Text style={colorStyles.cWhite}>Edit Record</Text>
		            		</Button>	
		            	}

		            	{this.state.isEditing &&
		            		<View>
			            		<Button full success style={{marginTop:25}} onPress={()=>this.saveChanges()}>
			            			<Text style={colorStyles.cWhite}>Save Changes</Text>
			            		</Button>
			            		<Button full light style={{marginTop:5}} onPress={()=>this.setState({isEditing:false})}>
			            			<Text>Cancel</Text>
			            		</Button>
		            		</View>	
		            	}

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

export default connect(mapStateToProps,mapDispatchToProps)(ReturnInfoScreen);