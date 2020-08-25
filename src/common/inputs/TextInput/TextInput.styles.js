import { StyleSheet } from 'react-native';
import { colors } from '../../../../theme';

export default StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10
  },
  input: {
    height: 40,
    fontSize: 20,
    borderBottomColor: colors.secondary,
    borderBottomWidth: 1
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.secondary
  }
});
