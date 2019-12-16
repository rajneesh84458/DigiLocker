import React, { Component } from 'react'
import { Text, View,SafeAreaView,Image,TextInput,StyleSheet} from 'react-native'
import { Container, Header, Content, Item, Input,Icon,Button } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class MyProfile extends Component {

    
    state ={
          name :'',
           mobile:'',
          department:'',
        
    }

    onName = (name) =>{
          this.setState({name:name})
          console.log(name)
    }
   
    onMobile= (mobile) =>{
          this.setState({ mobile: mobile})
    }
    onDepartment = (designation) =>{
          this.setState({designation:designation})
    }
   
    render() {
        return (
    <SafeAreaView style={{flex:1}}>
              
         <Image source ={require('../../images/scanner.png')} 
                 style={{width:100,height:100,marginHorizontal:150,marginVertical:20}}/>
       <View style ={{marginTop:80,width:330,borderBottomColor:'blue',marginHorizontal:40,borderWidth:1,height:30,marginVertical:20,borderLeftColor:'transparent',borderRightColor:'transparent',borderTopColor:'transparent'}}>
               <TextInput  onChangeText ={this.onName} 
                  placeholder="Name"
                  placeholderTextColor="grey"
                  style ={{fontSize:20}}>
                      </TextInput> 
            </View>
       
       <View style ={{width:330,borderBottomColor:'blue',marginHorizontal:40,borderWidth:1,height:30,marginVertical:20,borderLeftColor:'transparent',borderRightColor:'transparent',borderTopColor:'transparent'}}>
               <TextInput  onChangeText={this.onMobile}
               placeholder="Mobile number"
                  placeholderTextColor="grey"
                  style ={{fontSize:20}}>
                      </TextInput> 
            </View>
       <View style ={{width:330,borderBottomColor:'blue',marginHorizontal:40,borderWidth:1,height:30,marginVertical:20,borderLeftColor:'transparent',borderRightColor:'transparent',borderTopColor:'transparent'}}>
               <TextInput  onChangeText={this.onDepartment}
               placeholder="Department"
                  placeholderTextColor="grey"
                  style ={{fontSize:20}}>
                      </TextInput> 
            </View>
       
       
             <TouchableOpacity onPress ={()=>alert("Updating....")}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#ffff', '#277ccb', '#ffff']} style={styles.linearGradient}>
                <Text style={styles.buttonText}>
                   UPDATE
                </Text>
                    </LinearGradient>
            </TouchableOpacity>
               
            </SafeAreaView>
        )
    }
}
var styles = StyleSheet.create({
    linearGradient: {
    
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5,
      marginHorizontal:50,marginVertical:30
    },
    buttonText: {
      fontSize: 18,
      fontFamily: 'Gill Sans',
      textAlign: 'center',
      margin: 10,
      color: '#ffffff',
      backgroundColor: 'transparent',
    },
  });