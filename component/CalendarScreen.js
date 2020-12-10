import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,ActivityIndicator,Modal
} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import moment from 'moment';

import {vh, vw} from '../utility/dimensions';
import Colors from '../utility/colors';
import LocalImages from '../utility/localImages';
import { database } from '../Setup';


const _format = 'YYYY-MM-DD';
const _today = moment(new Date().dateString).format(_format);

export default class CalendarScreen extends React.Component {
  initialState = {
    [_today]: {disabled: false},
  };

  state = {
    _markedDates: this.initialState,
    visible: false,
    modalVisible:false,
    //isDisabledThree: false,
    selectedDay: [],
    loading:true,
    mydates:[]
   
  };

  onNavigate = () => {
    this.setState({modalVisible: false}, () =>
      this.props.navigation.navigate('CreateMeetUp'),
    );
  };
  onNavigateGroup = () => {
    this.setState({modalVisible: false}, () =>
      this.props.navigation.navigate('Group'),
    );
  };
  

  onDaySelect = day => {
    const _selectedDay = moment(day.dateString).format(_format);
     this.setState({
      selectedDay: _selectedDay,
      modalVisible: true,
      
    });
    
    
    
    
  };

 async componentDidMount() {
    const my = await database().ref('blockdates');
    my.on('value', datasnap => {
      if (datasnap.val()) {
        this.setState({mydates: Object.values(datasnap.val())});
       
       // console.log("groupscreen data===>",this.state.mydates)
      
      }
  
    });
  
  }
  saveDay = () => {
    const dots = [];
    let selected = true;
    const {_markedDates, selectedDay,mydates} = this.state;

    if (_markedDates[selectedDay]) {
       
      selected = !_markedDates[selectedDay].selected;
        //  alert("Unblock date")
    }

    const clone = {..._markedDates};
    
    clone[selectedDay] = {dots, selected, selectedColor: 'red'};

    this.setState({
      modalVisible: false,
      _markedDates: clone,
      
      
    });
 
    //  alert("Block date")
    // const mydata = database().ref('blockdates')
    // mydata.push({
    //      blockedDates:selectedDay
    // })

  };


  
  render() {
     //console.log("blocked dates ====>",this.state.mydates)
    return (
      <View style={styles.container}>
      
        
      <Calendar
          markedDates={this.state._markedDates}
          markingType={'multi-dot'}
          onDayPress={this.onDaySelect}
          disabledDates={this.state.mydates}
          style={styles.calendar}
        />
        
        

<View style={styles.centeredView}>
     <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
        
             

              <TouchableOpacity
                style={{ position:'absolute', right:10,top:10}}
                onPress={() => {
                  this.setState({modalVisible:!this.state.modalVisible});
                }}>
                <Image style={styles.closeStyle} source={LocalImages.CLOSE} />
              </TouchableOpacity>
        

            <View
              style={{
                padding:30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={this.onNavigate}
                style={styles.ButtonStyle}>
                <Image
                  source={LocalImages.BAG}
                  style={{
                    width: 16,
                    height: 16,
                    resizeMode: 'contain',
                    tintColor: 'white',
                  }}
                />
                <Text style={{fontSize: 15, color: 'white'}}>
                  Create Meet Up
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={this.onNavigateGroup}
                style={styles.ButtonStyle}>
                <Image
                  source={LocalImages.FRIEND}
                  style={{
                    width: 16,
                    height: 16,
                    resizeMode: 'contain',
                    tintColor: 'white',
                  }}
                />
                <Text style={{fontSize: 15, color: Colors.white}}>
                  Create Group
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                
                onPress={this.saveDay}
                style={[
                  styles.ButtonStyle,
                  {
                    backgroundColor: Colors.white,
                    borderColor: Colors.black,
                    borderWidth: 0.5,
                    marginBottom: 10,
                  },
                ]}>
                <Image
                  source={LocalImages.BLOCK}
                  style={{
                    width: 16,
                    height: 16,
                    resizeMode: 'contain',
                    tintColor: Colors.lightBlue,
                  }}
                />
             
                <Text style={{fontSize: 15}}>
                  
              
                  {this.state.selectedDay ? "Block" : 'unblock'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
           
          </View>
   
      </Modal>
  
     
    </View>
    {/* {
                  this.state.selectedDay.map(item=>{
                    return (
                      <View>
  <Text style={{fontWeight:'bold'}}>{item.selectedDay}</Text>
                      </View>
                    )
                
                  })
                } */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  calendar: {
    margin: 2,
    height: vh(440),
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16,
  },
  container: {
    flex: 1,
  },
  headerStyle: {
    flexDirection: 'row',
    width: vw(320),
    height: vh(70),
    backgroundColor: Colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeStyle: {
    width: vw(14),
    height: vh(14),
    resizeMode: 'contain',
    tintColor: 'white',
    // fontWeight:'bold'

  },


  centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 70
      },
      modalView: {
        width:300,
       
        marginTop: 40,
        backgroundColor: "white",
        borderRadius: 10,
       
        alignItems: "center",
        justifyContent:'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
  
    
      closeStyle: {
        width: vw(18),
        height: vh(18),
        resizeMode: 'contain',
        tintColor: 'red',
        alignItems:'flex-end'
      },
    
      ButtonStyle: {
        flexDirection: 'row',
        width: vw(180),
        height: vh(40),
        backgroundColor: Colors.lightBlue,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    
        marginBottom: 15,
        borderRadius: 8,
      }
});
