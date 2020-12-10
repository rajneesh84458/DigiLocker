import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
const {width, height} = Dimensions.get('window');
import  firebase from '../../firebase/config';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
export default class MeetupSendScreen extends React.Component {
  state = {
    dataSource: [],
   
  };

  componentDidMount() {
    
  
      const mydata = firebase.database().ref('meetups');
      mydata.on('value', datasnap => {
        if(datasnap.val()){
          this.setState({dataSource: Object.values(datasnap.val())});
        }
       // console.log(Object.values(datasnap.val()));
     
      });}


  // removeIt(id) {
 
  //   const mydata = firebase.database().ref('meetups');
  //       mydata.remove()
  //       //this.setState({dataSource:[{title:"There is no meetup available"}]})
  //   alert('deleled')
  // }
  render() {


    return (
       
      <LinearGradient colors={['#25CCF7', '#4834DF']} style={{flex: 1}}>
        <ScrollView contentContainerStyle ={ styles.container  }>
           
        
          {this.state.dataSource.map(item => {
            return (
              <View
                style={{
                 
                   width:'90%',
                   margin:10,
                   backgroundColor:'#ffff',
                  
                  borderRadius: 10,
                  padding: 10,
                  shadowColor: '#ccc',
                  shadowOffset: {
                    width: 0,
                    height: 2
                  },
                  shadowRadius: 5,
                  shadowOpacity:0.2
                }}>
                <View style={{alignItems: 'flex-end'}}>
                  <TouchableWithoutFeedback onPress={()=>alert("added soon!!")}>
                    <Text style={{color: 'red'}}>Delete</Text>
                  </TouchableWithoutFeedback>
                </View>
                 <View style={{flex:1}}>
                 <Text style={styles.textStyle}>Title:   <Text style={[styles.textStyle,{color:'#000',fontWeight:'300',fontSize:12,letterSpacing:1}]}>{item.title}</Text></Text>
                <Text style={styles.textStyle}>Mobile:   <Text style={[styles.textStyle,{color:'#000',fontWeight:'300',fontSize:12,letterSpacing:1}]}>{item.num}</Text></Text>
                <Text style={styles.textStyle}> Date:   <Text style={[styles.textStyle,{color:'#000',fontWeight:'300',fontSize:12,letterSpacing:1}]}>{new Date(item.time).toDateString()}</Text></Text>
                <Text style={styles.textStyle}> Time:   <Text style={[styles.textStyle,{color:'#000',fontWeight:'300',fontSize:12,letterSpacing:1}]}>{new Date(item.time).toLocaleTimeString()}</Text></Text>
                <Text style={styles.textStyle}>Description:  <Text style={[styles.textStyle,{color:'#000',fontWeight:'300',fontSize:12,letterSpacing:1}]}>{item.description}</Text></Text>
               
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
 
    alignItems:'center',
    justifyContent:'center',
    
  },
  textStyle: {
    fontWeight:'bold',
    letterSpacing:0.2
  },
  
})
