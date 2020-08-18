import React, {Component} from 'react';
import {TouchableOpacity, Text} from 'react-native';

class RoundedButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity style={styles.button} {...this.props}>
        <Text style={styles.buttonText}>{this.props.label}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = {
  button: {
    backgroundColor: '#F77027',
    borderRadius: 30,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
};

export default RoundedButton;
