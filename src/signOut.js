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
  Keyboard,
  TouchableOpacity
} from 'react-native';
import * as firebase from 'firebase'
import { Icon } from 'react-native-elements'


export default class SignOut extends React.Component {


  signOutUser = () => {
    firebase.auth().signOut();
  }

  render() {
    return (
      <View>
        <TouchableOpacity style={{}} onPress={this.signOutUser}>
          <Icon

            name='sign-out'
            type='font-awesome'
            color='yellow' />
        </TouchableOpacity>

      </View>
    )
  }

}