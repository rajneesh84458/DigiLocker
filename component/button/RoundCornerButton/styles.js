import {StyleSheet} from 'react-native';
import {appStyle} from '../../../utility';
import Colors from '../../../utility/colors';

export default StyleSheet.create({
  btn: {
    backgroundColor:'rgba(0, 73, 141,0.7)',
    width: '90%',
    height: appStyle.btnHeight,
    borderRadius: appStyle.btnBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical:10,
  },
  text: {fontSize: 20, fontWeight: 'bold', color:'white'},
});
