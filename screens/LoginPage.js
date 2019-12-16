import React, { Component } from 'react'
import { Text, View,SafeAreaView,Dimensions,Image,TextInput,TouchableOpacity } from 'react-native';
import { Button,ListItem,CheckBox,Body,Icon } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Dialog from 'react-native-popup-dialog';

const {width,height} =Dimensions.get('window')
export default class LoginPage extends Component {

    state ={
          email:'',
          pass:'',
          visible:false
    }
 isValidateFields =()=>{
        const {email,pass} =this.state;
        if(email == "" && pass == "")
        {
          alert("Please entered valid fields");
          return false
         }
            else if(email ==""){
                alert("please entered email")
                return false
            }
             else if(pass == ""){
                 alert("please entered password")
                 return false
             }
               else if(!isNaN(pass)){
                  alert("please alphablet")
                  return false
              }
                
      return true
 }
    

    makeApiCall =() =>{
         if(this.isValidateFields()) {
          this.props.navigation.navigate('Home')
         }
    }
    render() {
        return (
            <SafeAreaView style ={{flex:1}}>
              <View style ={{width:width,height:80,backgroundColor: 'rgba(106, 137, 206, 0.5)',
                     justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:20,fontWeight:'bold'}}>LOGIN</Text>
            </View>
  
   <Image source ={require('../images/scanner.png')}
          style={{width:100,height:100,marginHorizontal:150,marginVertical:20}}/>
        <Text style={{padding:40,fontSize:20,left:50}}>Welcome To the Academy</Text>

<View style ={{borderColor:'blue',marginHorizontal:15,borderWidth:1,height:60,justifyContent:'center',alignItems:'center',marginVertical:20}}>
               <TextInput 
                    value ={this.state.email}
                    onChangeText={(email)=>this.setState({email})}
                   placeholder="Enter Employment No"
                   placeholderTextColor="#6A89CC"
                   autoCapitalize="none"
                  autoCorrect={false}
                   
                  style ={{fontSize:20}}>
                      </TextInput> 
            </View>
        <View style ={{borderColor:'blue',marginHorizontal:15,borderWidth:1,height:60,justifyContent:'center',alignItems:'center'}}>
            <TextInput 
              value ={this.state.pass}
             onChangeText ={(pass)=>this.setState({pass})}
                        placeholder="Enter  Password"
                        placeholderTextColor="#6A89CC"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        style ={{fontSize:20}}>
                      </TextInput> 
         </View>

               <View style ={{flexDirection:'row',justifyContent:'space-around',marginTop:10}}>
                        <View style={{flexDirection:'row',}}>
                        <CheckBox checked={true}
                                style={{left:-10}} />
                       <Text style ={{fontSize:18,color:'#6A89CC',paddingLeft:10}}>Stay logged in</Text>
                       </View>
                          <View>
                             <TouchableOpacity  onPress={() => {
                                            this.setState({ visible: true });
                                            }}>
                               <Text style ={{fontSize:18,color:'#6A89CC'}}>Forgot Password ?</Text>     
                           </TouchableOpacity>
                          </View>
                </View>
               
       {/* </View> */}
       <Button full  style={{marginTop:20,marginHorizontal:20,backgroundColor: 'rgba(106, 137, 206, 0.6)'}}
                  onPress ={this.makeApiCall}>
            <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>Login</Text>
          </Button>  
          <TouchableOpacity style ={{alignItems:'center',justifyContent:'center',marginTop:20}}
           onPress ={()=>this.props.navigation.navigate('Register')}>
              <Text style ={{color:'black',fontSize:20,}}>New to Signup?</Text>
          </TouchableOpacity>   
          <Dialog
        visible={this.state.visible}
        onTouchOutside={() => {this.setState({ visible: false }) }} >
          <View style={{width:380,height:250,}}>
          <View style={{width:380,height:60,backgroundColor:'#6A89CC',flexDirection:'row',justifyContent:'space-between',padding:15}}>
            <Text style ={{fontSize:22,color:'white',fontWeight:'bold'}}>Forgot Password</Text>
            <AntDesign name ="close" size ={32} color ="white"
              onPress ={()=>this.setState({visible:false})}/>
            </View> 

            <View style ={{borderColor:'blue',marginHorizontal:15,borderWidth:1,height:60,justifyContent:'center',marginVertical:20}}>
               <TextInput  onChangeText={this.onEmail}
               placeholder="Please Enter Email or Mobile no."
                  placeholderTextColor="#6A89CC"
                  style ={{fontSize:20,left:10}}>
                      </TextInput> 
            </View>
            <Button full  style={{width:100,marginTop:20,marginLeft:120,backgroundColor:'#6A89CC',borderRadius:20}}
                   onPress ={()=>this.props.navigation.navigate('Home')}>
            <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>Submit</Text>
          </Button>  
          </View>
          </Dialog>
            </SafeAreaView>
        )
    }
}
