import React, { Component } from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import { NavigationActions } from 'react-navigation';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../actions'
import { BackHandler, ListView } from "react-native";
//FIREBASE
import firebaseApp from '../config/firebase';
import * as firebase from 'firebase';
import ResponsiveImage from 'react-native-responsive-image';
import HomeSelection from '../components/HomeSelection';
import styles from '../styles/style_main';
import btnStyles from '../styles/style_buttons';
import colorStyles from '../styles/style_colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Container, Header, Content, Form, Input, Item, Label, Footer, StyleProvider, Left, Right, Button, Body, Title, Card, CardItem} from 'native-base';

class BorrowInfoScreen extends Component {

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

	  this.setEditable = this.setEditable.bind(this)
	  
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
	}

	componentDidMount(){
		this.props.navigation.setParams({
            changeEditable: this.setEditable
        });
	}

	//make it static to make header action work and add classname sa onpress
	setEditable(){
    	this.setState({isEditing:true})
    }

	static navigationOptions = ({navigation}) =>{
		const {params = {}} = navigation.state;
		return{
        title: "Item Information",
      	headerRight:
      	<View style={{flexDirection:'row',justifyContent:'center'}}>
	        <Button transparent onPress={()=>params.changeEditable()}>
	            <Icon style={{marginLeft: 0}} name='edit' size={32} />
	        </Button>

	        <Button transparent onPress={()=>alert("hello")}>
	            <Icon style={{marginLeft: 12, marginRight: 10}} name='delete' size={32} />
	        </Button>
        </View>
        }        
    };

    saveChanges(){
    	this.setState({isEditing:false});
    	
    	let key = this.state.key;
    	alert(key)
    	firebase.database().ref("/borrow/iH0q89QPSCU04kcNcrGwLVXiCw53/"+key).set({
            item_name: this.state.item_name,
			quantity: this.state.quantity,
			note: this.state.note,
			borrower: this.state.borrower
        })
    }

	render(){
		console.log(this.state)
		return(
			<Container>
				<Content padder>
					<Form>
		            	<Item stackedLabel>
		              	<Label>Item Name:</Label>
		              	<Input editable = {this.state.isEditing} selectTextOnFocus={true} onChangeText={(item)=>this.setState({item})} placeholder="Enter item name">{this.state.item_name}</Input>
		            	</Item>
		            	
		            	<Item stackedLabel>
		              	<Label>Quantity:</Label>
		              	<Input editable = {this.state.isEditing} selectTextOnFocus={true} oonChangeText={(qty)=>this.setState({qty})} placeholder="Enter quantity">{this.state.quantity}</Input>
		            	</Item>
		          	
		            	<Item stackedLabel>
		              	<Label>Borrower:</Label>
		              	<Input editable = {this.state.isEditing} selectTextOnFocus={true} oonChangeText={(borrower)=>this.setState({borrower})} placeholder="Enter name of borrower">{this.state.borrower}</Input>
		            	</Item>

		            	<Item stackedLabel>
		              	<Label>Note:</Label>
		              	<Input editable = {this.state.isEditing} selectTextOnFocus={true} omultiline={true} maxNumberOfLines={4}  initHeight="auto" style={{textAlignVertical: "top"}} onChangeText={(note)=>this.setState({note})} placeholder="Enter additional note (Optional)">{this.state.note}</Input>
		            	</Item>
		          	</Form>	
				</Content>

				{!this.state.isEditing &&
					<TouchableOpacity onPress={()=>console.log(this.state)}>
					<Footer style={colorStyles.bgPrimary} >
						<Title style={{marginTop:15, fontSize: 16}}>Press edit button to make changes</Title>
					</Footer>
					</TouchableOpacity>
				}
				{this.state.isEditing &&
					<TouchableOpacity onPress={()=>this.saveChanges()}>
					<Footer style={colorStyles.bgPrimary} >
						<Title style={{marginTop:15, fontSize: 16}}>Save Changes</Title>
					</Footer>
					</TouchableOpacity>
				}

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

export default connect(mapStateToProps,mapDispatchToProps)(BorrowInfoScreen);