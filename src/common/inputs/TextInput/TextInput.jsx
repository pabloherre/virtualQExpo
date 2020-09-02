import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput as NativeTextInput } from 'react-native';
import styles from './TextInput.styles';

class TextInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { label, ...rest } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.label} {...setTestInfo('testTextInputLabel')}>
          {label}
        </Text>
        <NativeTextInput style={styles.input} {...rest} {...setTestInfo('testInputInput')} />
      </View>
    );
  }
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired
};

export default TextInput;
