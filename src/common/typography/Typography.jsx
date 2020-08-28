import React, { Component } from 'react';
import { Text } from 'react-native';
import { withTheme } from '../theme/Theme';

const size = {
  small: 14,
  medium: 18,
  large: 30
};

class Typography extends Component {
  constructor(props) {
    super(props);
  }

  getSize = () => {
    return Object.assign({}, { fontSize: size[this.props.size || 'medium'] });
  };

  getColor = () => {
    const { colors } = this.props.theme;
    return Object.assign({}, { color: colors[this.props.color || 'text'] });
  };

  getTextStyles = () => {
    return Object.assign({}, this.props.textStyles);
  };

  render() {
    return <Text style={Object.assign(this.getTextStyles(), this.getSize(), this.getColor())}>{this.props.children}</Text>;
  }
}

export default withTheme(Typography);
