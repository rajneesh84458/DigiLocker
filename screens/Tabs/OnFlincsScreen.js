

import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {database} from '../../Setup';

export default class OnFlincsScreen extends React.Component {
  state = {
    dataSource: [],
  };

  componentDidMount() {
    const mydata = database().ref('meetups');
    mydata.on('value', datasnap => {
      if (datasnap.val()) {
        this.setState({dataSource: Object.values(datasnap.val())});
      }
    
    });
  }

  render() {
    return (
      <LinearGradient colors={['#25CCF7', '#4834DF']} style={{flex: 1}}>
        <View style={styles.heading}>
          <Text style={{fontSize: 16, color: 'white'}}>People on Flincs</Text>
        </View>
        <ScrollView contentContainerStyle={styles.container}>
          {this.state.dataSource.map(item => {
            return (
              <View
                style={{
                  width: '90%',
                  margin: 10,
                  backgroundColor: '#ffff',

                  borderRadius: 10,
                  padding: 10,
                  shadowColor: '#ccc',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowRadius: 5,
                  shadowOpacity: 0.2,
                }}>
                <View style={{alignItems: 'flex-end'}} />
                <View style={{flex: 1, padding: 10}}>
                  <Text style={styles.textStyle}>
                    {' '}
                    <Text
                      style={[
                        styles.textStyle,
                        {
                          color: '#000',
                          fontWeight: '300',
                          fontSize: 12,
                          letterSpacing: 1,
                        },
                      ]}>
                      {item.title}
                    </Text>
                  </Text>
                  <Text style={styles.textStyle}>
                    {' '}
                    <Text
                      style={[
                        styles.textStyle,
                        {
                          color: '#000',
                          fontWeight: '300',
                          fontSize: 18,
                          letterSpacing: 1,
                          marginTop: 15,
                        },
                      ]}>
                      {item.num}
                    </Text>
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontWeight: 'bold',
    letterSpacing: 0.2,
    marginVertical: 5,
  },
  heading: {
    margin: 10,
    backgroundColor: '#2C3335',
    width: '40%',
    padding: 15,
    borderTopStartRadius: 20,
    borderBottomEndRadius: 20,
  },
});
