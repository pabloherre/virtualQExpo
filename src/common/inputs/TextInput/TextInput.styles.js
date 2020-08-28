import { StyleSheet } from 'react-native';
import { colors } from '../../../../theme';

export default StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10
  },
  input: {
    height: 40,
    fontSize: 18,
    borderBottomColor: colors.secondary,
    borderBottomWidth: 1,
    marginBottom: 10
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.secondary
  }
});
