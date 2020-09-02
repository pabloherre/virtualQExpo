import React from 'react';
import background from '../../../assets/images/background.png';
import { ImageBackground } from 'react-native';
import { setTestInfo } from '../../utils/test.utils';

export default function withBackground(WrappedComponent) {
  return class WithBackground extends React.Component {
    render() {
      return (
        <ImageBackground {...setTestInfo('testImageBackground')} source={background} style={{ flex: 1, alignSelf: 'stretch' }}>
          <WrappedComponent {...this.props} />
        </ImageBackground>
      );
    }
  };
}
