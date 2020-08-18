import React, {Component} from 'react';
import {View, Text, TextInput as NativeTextInput} from 'react-native';

class TextInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{this.props.label}</Text>
        <NativeTextInput style={styles.input} {...this.props} />
      </View>
    );
  }
}

const styles = {
  container: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    height: 40,
    fontSize: 20,
    borderBottomColor: '#7DD7F1',
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7DD7F1',
  },
};

export default TextInput;
