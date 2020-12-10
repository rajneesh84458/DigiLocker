import React, { Component } from 'react'
import { Text,Modal,View,TouchableOpacity,StyleSheet ,Image} from 'react-native'
import Colors from '../constants/colors';
import LocalImages from '../constants/localImages';
import { vh, vw } from '../constants/dimensions';

export default class MeetupModal extends Component {
    state = {
        modalVisible: false,
      };
    
      onNavigate = () => {
        this.setState({modalVisible: false}, () => this.props.navigation.navigate('createMeet')
        )}
    render() {
        return (
            <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.modalView}>
            <View style={styles.headerStyle}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  color: Colors.white,
                  paddingHorizontal: 80,
                }}>
                Select an Option
              </Text>
              <TouchableOpacity
                onPress={() => this.setState({modalVisible: false})}>
                <Image style={styles.closeStyle} source={LocalImages.CLOSE} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalButtonView}>
              <TouchableOpacity onPress={this.onNavigate} style={{padding: 5}}>
                <Image
                  source={LocalImages.BAG}
                  style={{
                    width: 25,
                    height: 25,
                    resizeMode: 'contain',
                    tintColor: Colors.lightBlue,
                    marginLeft: 30,
                  }}
                />
                <Text style={{color: Colors.lightBlue, fontSize: 16}}>
                  Create Meet Up
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={{padding: 5}}>
                <Image
                  source={LocalImages.FRIEND}
                  style={{
                    width: 25,
                    height: 25,
                    resizeMode: 'contain',
                    tintColor: Colors.lightBlue,
                    marginLeft: 30,
                  }}
                />
                <Text style={{color: Colors.lightBlue, fontSize: 16}}>
                  Create Group
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
 
        )
    }
}

const styles = StyleSheet.create({
    
    textStyle: {
      fontSize: vh(25),
      padding: vw(10),
      color: 'white',
    },
    
    
    modalView: {
      position: 'absolute',
      width: '100%',
      height: '22%',
      bottom: 10,
      backgroundColor: 'white',
      //margin:10
    },
  
    modalButtonView: {
      flex: 0.5,
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 20,
    },
    headerStyle: {
      width: '100%',
      height: vh(50),
      backgroundColor: Colors.lightBlue,
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'row',
    },
  
    closeStyle: {
      width: vw(18),
      height: vh(18),
      resizeMode: 'contain',
      tintColor: 'white',
    },
  
    ButtonStyle: {
      width: vw(250),
      height: vh(50),
      backgroundColor: Colors.lightBlue,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginLeft: vw(25),
      marginBottom: 20,
      borderRadius: 8,
    },
  });
  