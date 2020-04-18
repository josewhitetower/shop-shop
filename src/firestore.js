import firebase from 'firebase';
import 'firebase/firestore';
const config = {
  apiKey: 'AIzaSyCshP9H3silkIT_jlEy6R87n-KvZtiwfu4',
  authDomain: 'jt-shop-shop.firebaseapp.com',
  databaseURL: 'https://jt-shop-shop.firebaseio.com',
  projectId: 'jt-shop-shop',
  storageBucket: 'jt-shop-shop.appspot.com',
  messagingSenderId: '607679255136',
  appId: '1:607679255136:web:1a27a3265fb6a814ca6905',
  measurementId: 'G-W3WW1RYFGP',
};

firebase.initializeApp(config);
const db = firebase.firestore();
export default db;
