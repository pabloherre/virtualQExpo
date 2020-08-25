import React from 'react';
import { useTheme } from '@react-navigation/native';

export function withTheme(WrappedComponent) {
  return function (props) {
    const theme = useTheme();
    return <WrappedComponent {...props} theme={theme} />;
  };
}
