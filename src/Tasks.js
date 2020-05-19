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
  TouchableOpacity, SafeAreaView
} from 'react-native';
import CheckBox from 'react-native-check-box';
import * as firebase from 'firebase'
import { Header } from 'react-native-elements'
import { Input } from 'react-native-elements'
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements'
import { Divider } from 'react-native-elements';
import SignOut from './signOut'


const uuid = require("uuid");

class Tasks extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      todos: {},
      presentToDo: '',
      email: '',
      displayName: ''
    };

    this.addNewTodo = this.addNewTodo.bind(this);
    this.clearTodos = this.clearTodos.bind(this);
  }

  componentDidMount() {
    const todoId = uuid();
    const user = firebase.auth().currentUser
    var uid;

    if (user != null) {
      uid = user.uid
    }

    firebase.database().ref(`/todos/${uid}`).on('value', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};

      let todoItems = { ...data };
      console.log(data);
      this.setState({
        todos: todoItems,
      });
    });
  }
  signOutUser() {
    firebase.database().auth().signOut();
  }

  addNewTodo() {
    const todoId = uuid();
    const user = firebase.auth().currentUser
    var uid;

    if (user != null) {
      uid = user.uid
    }
    firebase.database().ref('/todos/' + uid).push({
      done: false,
      todoItem: this.state.presentToDo,
      todoId: uid,
      userId: uid

    });

  }

  clearTodos() {
    firebase.database().ref('/todos').remove();
  }

  render() {
    let todosKeys = Object.keys(this.state.todos);

    return (


      <View
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}>
        < View >
          <Header
            backgroundColor='#272727'
            // leftComponent={{ icon: 'menu', color: '#fff',  }}
            centerComponent={{ text: 'TASKS', style: { color: '#fff' } }}
            rightComponent={<SignOut />}
          />

          <ScrollView>
            {todosKeys.length > 0 ? (
              todosKeys.map(key => (
                <ToDoItem
                  key={key}
                  id={key}
                  todoItem={this.state.todos[key]}
                  bottomDivider
                />
              ))
            ) : (
                <Text
                  h2
                  style={{ color: '#969595', margin: 20, fontSize: 15 }}>No todo item</Text>
              )}
          </ScrollView>
        </View >
        <View style={{ marginTop: 10 }}>
        </View>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
              style={{
                flex: 1, flexDirection: 'row', justifyContent: 'flex-start', width: '95 %'
              }}>
              <View
                style={{
                  flex: 1, flexDirection: 'row', justifyContent: 'flex-center', width: '90 %'
                  , position: 'absolute', bottom: 0
                }}>
                <Input
                  placeholder="New Task"
                  color='white'
                  placeholderTextColor="#969595"
                  value={this.state.presentToDo}
                  style={{ fontSize: 20, color: 'white', marginRight: 50 }}
                  onChangeText={e => {
                    this.setState({
                      presentToDo: e,
                    });
                  }}
                  onSubmitEditing={this.addNewTodo}
                />
                <Icon
                  name='sc-telegram'
                  type='evilicon'
                  color='yellow'
                  size='45'
                  onPress={this.addNewTodo}
                />

              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View >

    );
  }
}

const ToDoItem = ({ todoItem: { todoItem: name, done }, id }) => {
  const [doneState, setDone] = useState(done);

  const onCheck = () => {
    setDone(!doneState);
    firebase.database().ref('/todos').update({
      [id]: {
        todoItem: name,
        done: !doneState,
      },
    });
  };
  const deleteTodo = () => {
    const user = firebase.auth().currentUser
    var uid;

    if (user != null) {
      uid = user.uid
    }
    const itemId = id
    firebase.database().ref(`/todos/${uid}/${itemId}`).remove()
  };

  return (
    <View style={{
      flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: '', width: '90%', margin: 15
    }}>
      <View>
        <CheckBox
          checkBoxColor="yellow"
          onClick={onCheck}
          isChecked={doneState}
          disabled={doneState}
        />
      </View>
      <Text style={[styles.todoText, { opacity: doneState ? 0.2 : 1 }]}>
        {name}
      </Text>
      <View
        style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Icon
          onPress={deleteTodo}
          name='trash'
          type='font-awesome'
          color='yellow' />
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272727',
  },
  header: {
    backgroundColor: '#272727',
  },

  todoText: {
    color: 'white',
    paddingHorizontal: 5,
    paddingVertical: 7,
    marginRight: 0,
    minWidth: '50%',
    textAlign: 'left',
    fontSize: 12


  },

});

export default Tasks;