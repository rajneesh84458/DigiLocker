import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ContactList from '../../component/ContactList';


//console.disableYellowBox = true;

export default class OnFlincsScreen extends Component {
  render() {
    return (
      <LinearGradient colors={['#25CCF7', '#4834DF']} style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={{padding: 10}}>People on Flincs :</Text>
          <ContactList navigation ={this.props.navigation}/>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
    marginBottom: 5,
    backgroundColor: '#fff',
    //marginTop:30,
  },
  phones: {
    fontSize: 15,
  },
  contact_details: {
    color: 'black',
  },
});
