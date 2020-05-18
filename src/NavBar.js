import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements'


const NavBar = () => {
  return (
    <Header style={styles.header}
      leftComponent={{ icon: 'menu', color: '#fff' }}
      centerComponent={{ text: 'TODO APP', style: { color: '#fff' } }}
      rightComponent={{ icon: 'home', color: '#fff' }}
    />

  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#000000'
  }
});
