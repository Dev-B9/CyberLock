
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // servicios de fireStore
  // getFirestore permite configurar conexion a la bd
  // getDocs permitira traer los objetos
  import {getFirestore, collection, onSnapshot, setDoc,doc} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js"

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCCgIZnbDU8YrRmlc1_uOYygIZJIDcIWB8",
    authDomain: "carrito-compras-cyberlock.firebaseapp.com",
    projectId: "carrito-compras-cyberlock",
    storageBucket: "carrito-compras-cyberlock.appspot.com",
    messagingSenderId: "632415117013",
    appId: "1:632415117013:web:e3934e12e8c95316c3cc5c"
  };
  
  

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // conexion a la bd 

  const db = getFirestore(app);
  

  export const getProducts = (callback) => onSnapshot(collection(db,"products"), callback);


 
  export const sendProduct = async (product) => await setDoc(doc(db,'products','newproduct'),product);

  