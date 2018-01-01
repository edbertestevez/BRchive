import React, { Component } from 'react';
import {View, Text, TouchableOpacity} from "react-native";
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
import {Container, Header, Content, Footer, StyleProvider, Icon, Left, Right, Button, Body, Title, Card, CardItem} from 'native-base';

const { navigateTo } = "";

class BorrowScreen extends Component {

	/*ADDED*/
	constructor(props) {
	  super(props);
		let ds = new ListView.DataSource({rowHasChanged:(r1, r2)=>r1!==r2});
	  this.state = {
	  	itemDataSource: ds
	  };

	  this.pressRow = this.pressRow.bind(this)
	  this.renderRow = this.renderRow.bind(this)
	  
	}

	getItems(accountState){
		//let items=[{title:'Item One'}, {title: 'Item Two'}];
		firebase.database().ref("/borrow/"+accountState.uid).on('value', (snapshot) => {
			let items = [];
			console.log("Firebase")
			if(snapshot.exists()){
				snapshot.forEach((child)=>{
					items.push({
						key: child.key,
						item_name: child.child("item_name").val(),
						quantity: child.child("quantity").val(),
						note: child.child("note").val(),
						borrower: child.child("borrower").val()
					});
					console.log(child.child("item_name").val() + " - " + child.child("borrower").val() + " - " + child.child("quantity").val() + " - " + child.child("note").val());
				});
			}
			this.setState({
				itemDataSource: this.state.itemDataSource.cloneWithRows(items)
			});
		});


		
	}

	componentWillMount(){
		this.getItems(this.props.state.account);
	}

	componentDidMount(){
		this.props.navigation.setParams({
			addBorrow: this.addBorrow,
		})
	}


	renderRow(item){
		const { navigate } = this.props.navigation;
		return(
				<TouchableOpacity onPress={()=>navigate("BorrowInfo",{key:item.key, item_name:item.item_name,quantity:item.quantity,borrower:item.borrower,note:item.note})}>
					<CardItem style={{marginBottom:5}} >
			          <ResponsiveImage source={require('../../img/logo.png')} initWidth="80" initHeight="80" style={{marginLeft:-10}}/>
				
						<View style={{flexDirection:'column', marginRight:50}}>
				          <Text style={styles.itemName}>{item.item_name}</Text>
				          <Text>Quantity: {item.quantity}</Text>
				          <Text>Borrower: {item.borrower}</Text>
				          <Text>Note: {item.note}</Text>
			      		</View>
			      	</CardItem>
			     </TouchableOpacity>
		);
	}

	pressRow(item){
		alert(JSON.stringify(item));
	}

	//**//

	static navigationOptions = ({navigation}) => {
		const {params = {}} = navigation.state;
        return{
	        title: "Borrowed Items",
	      	headerRight:
	      	//get lng ang navigation parameter to navigate
	        <Button transparent onPress={()=>navigation.navigate("BorrowAdd")}>
	            <Title style={{color:'#000'}}>New </Title>
	            <Icon style={{marginLeft: 0}} name='md-add-circle' />
	        </Button>
        }    
    };

	render(){
		
		//const styles = this.props.style;
		console.log(this.props)
		return(
			<Container>
				<Content padder>
			      	<ListView
			      		dataSource={this.state.itemDataSource}
			      		renderRow={this.renderRow}
			      	/>

				
				</Content>
				<Footer style={colorStyles.bgPrimary}>
					<View>
						<Text style={[styles.footerText, colorStyles.cWhite, styles.mTop5]}> &#9400; All Rights Reserved</Text>
		          		<Text style={[styles.footerText, colorStyles.cSubPrimary]}> DecypherApps</Text>
					</View>
				</Footer>
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

export default connect(mapStateToProps,mapDispatchToProps)(BorrowScreen);