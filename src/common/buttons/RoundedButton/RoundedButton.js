import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import styles from './RoundedButton.styles';

class RoundedButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { label, onPress, buttonStyle, textStyle, startIcon, endIcon, isLoading, ...rest } = this.props;
    return (
      <TouchableOpacity style={{ ...styles.button, ...buttonStyle }} onPress={onPress} {...rest}>
        {startIcon}
        {isLoading ? <ActivityIndicator size="large" color="white" /> : <Text style={{ ...styles.buttonText, ...textStyle }}>{label}</Text>}
        {endIcon}
      </TouchableOpacity>
    );
  }
}

RoundedButton.defaultProps = {
  buttonStyle: {},
  textStyle: {}
};

RoundedButton.propTypes = {
  label: PropTypes.string.isRequired,
  buttonStyle: PropTypes.object,
  textStyle: PropTypes.object,
  startIcon: PropTypes.element,
  endIcon: PropTypes.element,
  onPress: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default RoundedButton;
