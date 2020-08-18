import React, { Component } from 'react';
import { Text } from 'react-native';

const size = {
  small: 14,
  medium: 20,
  large: 30
};

const color = {
  default: '#a1a2a4',
  primary: '#f77027',
  secondary: '#0db4e4'
};

class Typography extends Component {
  constructor(props) {
    super(props);
  }

  getSize = () => {
    return Object.assign({}, { fontSize: size[this.props.size || 'medium'] });
  };

  getColor = () => {
    return Object.assign({}, { color: color[this.props.color || 'default'] });
  };

  getTextStyles = () => {
    return Object.assign({}, this.props.textStyles);
  };

  render() {
    return <Text style={Object.assign(this.getTextStyles(), this.getSize(), this.getColor())}>{this.props.children}</Text>;
  }
}

export default Typography;
