

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


import * as firebase from 'firebase'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Loading from './src/Loading'
import SignUp from './src/SignUp'
import Login from './src/Login'
import Main from './src/Main'
import Tasks from './src/Tasks'
import { db } from './src/config'

const AppStack = createStackNavigator({
  Tasks: Tasks

});

const AuthStack = createStackNavigator({
  Login: Login,
  SignUp: SignUp
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