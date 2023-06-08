import firebase from 'firebase';
  
const firebaseConfig = {
    apiKey: "AIzaSyDClKei46R5ZNOOpzXrPWgPL-C3MOEuOwk",
    authDomain: "gps-device-embarked.firebaseapp.com",
    projectId: "gps-device-embarked",
    storageBucket: "gps-device-embarked.appspot.com",
    messagingSenderId: "418063967192",
    appId: "1:418063967192:web:5c907500a69b578a5c48ad",
    measurementId: "G-B372NHRKL7"
  };
    
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
  
export default database;