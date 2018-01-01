import {StyleSheet} from 'react-native';
module.exports = StyleSheet.create({
  containerLogin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop:-50
  },
  footerText:{
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  footerContainer:{
    position: 'absolute',
    bottom: 20,
    alignItems:'center',
  },
  brown:{
    color: 'brown'
  },
  loginButton:{
    shadowColor: '#cacaca',
    shadowOpacity: 0.5,
    borderColor: '#ddd',
    borderWidth: 0.5,
    elevation:2,
    flexDirection: 'row', 
    width: '70%', 
    marginTop: -40, 
    height: 60, 
    alignItems: 'center', 
    borderRadius: 10, 
    backgroundColor: "#ffffff"
  },
  userText:{
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  mTop5:{
    marginTop: 5
  },
  itemName:{
    fontWeight: 'bold',
    fontSize: 16,
    color:"#5F3B1D"
  }
});
