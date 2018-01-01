import {StyleSheet} from 'react-native';
module.exports = StyleSheet.create({
  homeButton:{
  	width: 280,
  	height: 65,
  	borderRadius: 10,
  	flexDirection: 'row',
  	alignItems: 'center',
  	padding: 8,
  	marginBottom: 10
  },
  homeText:{
  	color: "white",
  	marginLeft: 10,
  	fontSize: 22,
  	fontWeight: 'bold'
  },
  homeNum:{
  	color: "white",
  	marginLeft: 10,
  	fontSize: 22,
  	fontWeight: 'bold',
  	position: 'absolute',
  	right: 20
  },
  logoutButton:{
  	backgroundColor: "#d33434",
  	width: 150,
  	height: 55,
  	borderRadius: 10,
  	justifyContent: 'center',
  	alignItems: 'center',
  	marginBottom: 30
  },
  normalText:{
  	color: 'white',
  	fontSize: 18,
  	fontWeight: 'bold',
  },
});
