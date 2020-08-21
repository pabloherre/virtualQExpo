import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import styles from './RoundedButton.styles';

class RoundedButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { label, onPress, buttonStyle, textStyle, startIcon, endIcon, ...rest } = this.props;
    return (
      <TouchableOpacity style={{ ...styles.button, ...buttonStyle }} onPress={onPress} {...rest}>
        {startIcon}
        <Text style={{ ...styles.buttonText, ...textStyle }}>{label}</Text>
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
  onPress: PropTypes.func
};

export default RoundedButton;
