import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';
import styles from './RoundedButton.styles';

class RoundedButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { label, onPress, ...rest } = this.props;
    return (
      <TouchableOpacity style={styles.button} onPress={onPress} {...rest}>
        <Text style={styles.buttonText}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

RoundedButton.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func
};

export default RoundedButton;
