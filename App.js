

import React, { useState } from 'react';
import {
  StyleSheet,
  Alert,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';


import firebase from 'firebase'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Loading from './src/Loading'
import SignUp from './src/SignUp'
import Login from './src/Login'
import Main from './src/Main'
import Tasks from './src/Tasks'



const config = {
  apiKey: "AIzaSyBL4bCUX_GspNYN_vPnlkyROhD5iAMIt4I",
  authDomain: "todoapp-8fb4b.firebaseapp.com",
  databaseURL: "https://todoapp-8fb4b.firebaseio.com",
  projectId: "todoapp-8fb4b",
  storageBucket: "todoapp-8fb4b.appspot.com",
  messagingSenderId: "1087421786495",
  appId: "1:1087421786495:web:7cea326393a4a7815c124a",
  measurementId: "G-S8M9YPKQBS"
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}


const AppStack = createStackNavigator({
  Tasks: Tasks

});

const AuthStack = createStackNavigator({

  Login: Login,
  SignUp: SignUp,


});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: Loading,
      App: AppStack,
      Auth: AuthStack
    },
    {
      intialRouteName: 'Loading'
    }
  )
)