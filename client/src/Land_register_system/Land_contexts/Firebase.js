import { initializeApp } from  'firebase/app'
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDjmk0nLrbwbHbLA6C_KQaQ3B5MEohO390",
    authDomain: "blockchain-land-register.firebaseapp.com",
    projectId: "blockchain-land-register",
    storageBucket: "blockchain-land-register.appspot.com",
    messagingSenderId: "854720000584",
    appId: "1:854720000584:web:552304e01777d26ced9e7d",
    measurementId: "G-6YP78B4G6K"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)


export {app,db}