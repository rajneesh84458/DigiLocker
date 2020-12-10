import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  
} from 'react-native';
import Colors from '../../constants/colors';
import LinearGradient from 'react-native-linear-gradient';

import ListItem from '../../components/ListItem';



export default function InviteScreen({navigation}) {
  return (
  
      <LinearGradient colors={['#25CCF7', '#4834DF']} style={{flex: 1}}>
        <View
          style={{
            backgroundColor: Colors.white,
            flex: 1,
            marginHorizontal:5,
            marginBottom:5,
            
          }}>
         <ListItem  navigation ={navigation}/>
        </View>
      </LinearGradient>
    
  );
}

const styles = StyleSheet.create({});
