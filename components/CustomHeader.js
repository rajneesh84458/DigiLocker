import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import LocalImages from '../constants/localImages';
import Colors from '../constants/colors';
import {vh} from '../constants/dimensions';

export default class CustomHeader extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex:0.1,height: vh(50)}}>
        <View style={{padding: 10}}>
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
      </SafeAreaView>
    );
  }
}
