import React, { Component } from 'react'
import { Text, View,SafeAreaView,Picker,TouchableOpacity,Image } from 'react-native';
export default class HomeScreen extends Component {
   state={
           user:''
   }
   updateUser = (user) => {
    this.setState({ user: user })
 }
    render() {
        return (
           <SafeAreaView style={{flex:1}}>
 <Picker selectedValue = {this.state.user} onValueChange = {this.updateUser}
            style ={{width:'80%',marginHorizontal:40,height:"100%"}}>
               <Picker.Item label = "Administration" value = "1000" />
               <Picker.Item label = "Library" value = "2000" />
               <Picker.Item label = "Accounts" value = "3000" />
               <Picker.Item label = "Students" value = "4000" />
               <Picker.Item label = "Admission" value = "5000" />
               <Picker.Item label = "Third Party" value = "6000" />
               <Picker.Item label = "Agreement" value = "7000" />
               <Picker.Item label = "Contracts" value = "8000" />
               <Picker.Item label = "Others" value = "9000" />
               
            </Picker>
      <View style ={{position:'absolute',top:590,left:330}}>
      <TouchableOpacity onPress={()=>this.props.navigation.navigate("Scanning")}>
            <Image source ={require('../images/plus.png')}
                   style={{width:40,height:40,overlayColor:'white'}} />    
      </TouchableOpacity>

         </View>

      </SafeAreaView>
        )
    }
}
