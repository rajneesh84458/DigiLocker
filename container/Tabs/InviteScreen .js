import React from 'react';
import {
  StyleSheet,
 
  View,
 
  SafeAreaView,
} from 'react-native';
import Colors from '../../utility/colors';
import LinearGradient from 'react-native-linear-gradient';
import ListItem from '../../components/ListItem';

export default function InviteScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
