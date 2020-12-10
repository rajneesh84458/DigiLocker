import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Button = ({backgroundColor, text, onPress, fullWidth, logo}) => {
  return (
    <LinearGradient colors={['#25CCF7', '#4834DF']} style={{justifyContent:'center',alignItems:'center', width: '100%',height:40}}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.5}
        style={{
         
         
          width: '100%',
          justifyContent:'center',
          alignItems:'center',
          height: 40,
          borderRadius: 20,
          shadowOffset: {width: 2, height: 4},
          shadowColor: '#000',
          shadowOpacity: 0.4,
          elevation: 3,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            color: 'white',
          }}>
          {text}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Button;
