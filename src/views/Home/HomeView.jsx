import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './HomeView.styles';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

export default HomeScreen;
