import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
import {Color} from '../../common';

export default StyleSheet.create({
  container: {
    marginBottom: 2,
  },
  fullName: {
    fontWeight: '600',
    color: Color.blackTextPrimary,
    backgroundColor: 'transparent',
    fontSize: 20,
    marginBottom: 6,
  },
  address: {
    backgroundColor: 'transparent',
    fontSize: 15,
    color: '#9B9B9B',
    fontWeight: '600',
  },
  textContainer: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    padding: 20,
  },
  avatar: {
    height: width / 4,
    width: width / 4,
    borderRadius: 4,
  },
  loginText: {
    color: '#666',
  },
});
