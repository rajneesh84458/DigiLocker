import React, { Component } from 'react';
import { AppRegistry, View, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { appStyle } from '../../utility';


export default class ShowPassword extends Component {

  constructor() {
    super();

    this.state = { hidePassword: true }
  }

  setPasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textBoxContainer}>
          <TextInput placeholder ="Enter Password" underlineColorAndroid="transparent" secureTextEntry={this.state.hidePassword} style={styles.textBox} />
          <TouchableOpacity activeOpacity={0.8} style={styles.touachableButton} onPress={this.setPasswordVisibility}>
            <Image source={(this.state.hidePassword) ? require('../../assets/images/hide.png') : require('../../assets/images/eye.png')} style={styles.buttonImage} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      

    },
    headerText: {
      fontSize: 25,
      textAlign: "center",
      margin: 10,
      color: 'black',
      fontWeight: "bold"
    },
    textBoxContainer: {
      position: 'relative',
      alignSelf: 'stretch',
      justifyContent: 'center'
    },
    textBox: {
        paddingLeft: 16,
        backgroundColor:'white',
        width: "90%",
        color: appStyle.fieldTextColor,
        height: appStyle.fieldHeight,
        alignSelf: "center",
        marginVertical: appStyle.fieldMarginVertical,
        fontSize: 16,
    },
    touachableButton: {
      position: 'absolute',
      right: 22,
      height: 30,
      width: 30,
      padding: 2
    },
    buttonImage: {
      resizeMode: 'contain',
      height: '100%',
      width: '100%',
    }

  });