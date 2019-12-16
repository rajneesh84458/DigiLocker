import React from 'react';
//import react in our code. 
import { Switch, Text, View, StyleSheet,Dimensions,Image } from 'react-native';
const {width,height} =Dimensions.get('window')
export default class Settings extends React.Component {
  //Initial state false for the switch. You can change it to true just to see.
  state = {
      switchValue1:false,
      switchValue2:false
    }
  toggleSwitch1= (value) => {
     
      this.setState({switchValue1: value})
     
   }
  toggleSwitch2= (value) => {
     
      this.setState({switchValue2: value})
     
   }
  render() {
    return (
      <View style={styles.container}>
     
        
        <View style ={{flex:0.5,}}>
         
        <View style ={{flexDirection:'row',paddingHorizontal:20,width:width,height:70,padding:10}}>
                <Image source ={require('../../images/lock.png')}
                        style ={{width:40,height:40}}/>
                <Text style ={{fontSize:18,padding:10}}>Enable Lock app ?</Text>
                
                <Switch style={{marginLeft:120}}
                onValueChange = {this.toggleSwitch1}
                value = {this.state.switchValue1}
                trackColor={{true: '#277ccb', false: 'grey'}} />
          {/* <Text>{this.state.switchValue?'Switch is ON':'Switch is OFF'}</Text> */}
        </View>
        <View style={{marginHorizontal:20,width:width,height:0.3,borderWidth:1,elevation:2,borderColor:'grey'}}></View>
       
        <View style ={{flexDirection:'row',paddingHorizontal:20,width:width,height:70,padding:10}}>
                <Image source ={require('../../images/smartphone.png')}
                        style ={{width:40,height:40}}/>
                <Text style ={{fontSize:18,padding:10}}>Enable Find Mobile ?</Text>
                
                <Switch style={{marginLeft:100,}}
                onValueChange = {this.toggleSwitch2}
                value = {this.state.switchValue2}
                trackColor={{true: '#277ccb', false: 'grey'}} 
                   
                 />
          {/* <Text>{this.state.switchValue?'Switch is ON':'Switch is OFF'}</Text> */}
        </View>


      </View>
        
      </View>
    );  
  } 
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  }
});