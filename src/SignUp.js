// Login.js
import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Image, StatusBar } from 'react-native'
import * as firebase from 'firebase'
import { Input } from 'react-native-elements';



const uuid = require("uuid");

export default class SignUp extends React.Component {


  static navigationOptions = {
    header: null
  }

  state = {
    name: '',
    email: '',
    password: '',
    errorMessage: null
  }

  handleSignUp = () => {
    const userId = uuid();
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(userCredentials => {
        return userCredentials.user.updateProfile({
          displayName: this.state.name
        })
      })

      .catch(error => this.setState * { errorMessage: error.message })
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content'></StatusBar>
        <Image
          source={require('../assets/bkg.png')}
          style={{ marginTop: -280, marginLeft: -15, width: 500, height: 500 }}
        ></Image>
        <Image
          source={require('../assets/authFooter.png')}
          style={{ position: 'absolute', bottom: -575, right: -490 }}
        ></Image>
        <Text style={styles.greeting}>{`Sign Up to Get Started`}</Text>
        <View style={styles.errorMessage}>
          {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
        </View>
        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Name</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={name => this.setState({ name })}
              value={this.state.name}
            ></TextInput>
          </View>
          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            ></TextInput>
          </View>
          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              secureTextEntry
              style={styles.input}
              autoCapitalize="none"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            ></TextInput>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
          <Text style={{ color: '#8A8F9E', fontWeight: '500' }}>SIGN UP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignSelf: 'center', marginTop: 32 }}
          onPress={() => this.props.navigation.navigate("Login")}>
          <Text style-={{ color: '#4149559', fontSize: 13 }}>
            Already a Member? <Text style={{ fontWeight: '500', color: '#E9446A' }}>Log In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    color: '#8A8F9E'
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: 'center',
    marginHorizontal: 30
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30
  },
  inputTitle: {
    color: '#8A8F9E',
    fontSize: 10,
    textTransform: 'uppercase'
  },
  input: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#161F3D'
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "yellow",
    borderRadius: 4,
    borderColor: 'black',
    height: 52,
    alignItems: 'center',
    justifyContent: 'center'
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center'
  }

}) 