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


export default class SignOut extends React.Component {


  signOutUser = () => {
    firebase.auth().signOut();
  }

  render() {
    return (
      <View>
        <TouchableOpacity style={{ marginTop: 32 }} onPress={this.signOutUser}>
          <Text style={{ color: 'white' }}>SignOut</Text>

        </TouchableOpacity>

      </View>
    )
  }

}