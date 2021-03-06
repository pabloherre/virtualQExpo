import { StyleSheet } from 'react-native';
import { colors } from '../../../../theme';

export default StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 60
  },

  buttonText: {
    paddingHorizontal: 10,
    fontSize: 20,
    color: 'white'
  }
});
