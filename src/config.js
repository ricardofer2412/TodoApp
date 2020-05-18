import Firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBL4bCUX_GspNYN_vPnlkyROhD5iAMIt4I",
  authDomain: "todoapp-8fb4b.firebaseapp.com",
  databaseURL: "https://todoapp-8fb4b.firebaseio.com",
  projectId: "todoapp-8fb4b",
  storageBucket: "todoapp-8fb4b.appspot.com",
  messagingSenderId: "1087421786495",
  appId: "1:1087421786495:web:7cea326393a4a7815c124a",
  measurementId: "G-S8M9YPKQBS"
};
const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();
export const signOut = app.auth();