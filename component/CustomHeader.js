import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, SafeAreaView,StyleSheet} from 'react-native';
import LocalImages from '../utility/localImages';
import Colors from '../utility/colors';
import {vh} from '../utility/dimensions';
import LinearGradient from 'react-native-linear-gradient';

export default class CustomHeader extends Component {
  render() {
    return (
      
      //<SafeAreaView style={{ flex:0.1,height: vh(50),backgroundColor:'#3498DB'}}>
       <View style={{flex:1,padding: 10,height:50}}>

      
        <View >
          {this.props.isHome ? (
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}>
              <Image
                source={LocalImages.MENU}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: 'contain',
                  tintColor: Colors.white,
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={{justifyContent: 'center', marginLeft: 5}}>
              <Image
                source={LocalImages.BACKARROW}
                style={{
                  width: 22,
                  height: 22,
                  resizeMode: 'contain',
                  tintColor: Colors.white,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 20,
          }}>
          <Text style={{fontSize: 20, color: Colors.white}}>
            {this.props.title}
          </Text>
        </View>
        </View>
     //</SafeAreaView>
      
    );
  }
}

const styles = StyleSheet.create({
  
  linearGradient: {
    flex: 1,
    
  },
})