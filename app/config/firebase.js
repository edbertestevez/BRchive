//FIREBASE
import * as firebase from 'firebase';

const firebaseConfig = {
	apiKey: "AIzaSyCNcwaCx10U6HzY-9sU0auq5TsI7908YA4",
    authDomain: "brchive-a4eca.firebaseapp.com",
    databaseURL: "https://brchive-a4eca.firebaseio.com",
    projectId: "brchive-a4eca",
    storageBucket: "brchive-a4eca.appspot.com",
    messagingSenderId: "539651046642"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;