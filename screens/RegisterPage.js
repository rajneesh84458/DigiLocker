import React, { Component } from 'react'
import {  View,SafeAreaView,Image,TextInput,Button } from 'react-native'
export default class RegisterPage extends Component {


    state ={
          name :'',
          password:'',
          mobile:'',
          designation:'',
          employment:'',
          email:''   
    }

    isValidation =() =>{
          const {name,password,mobile,designation,employment,email} =this.state;
          if(name =="" && password == "" && mobile == "" && designation == "",employment == "",email == "")
          {
                alert("Please Enter all the fields !!")
                return false

          }

            if(!isNaN(name) && name == "") {
                  alert("Enter valid name")
                  return false
            }
             
              else if(name.length <=2 || name.length >=20)
              {
                alert("enter valid length ");
                 return false
              }


                   else if(mobile.length!=10){
                              alert("please entered valid mobile number");
                              return false
                    }

                        else if(email.indexOf('@')<=0 && email.charAt(email.length-4)!='.' && email.charAt(email.length-3)!='.') {
                              alert("Enter valid email address !!")
                              return false
                        }

           
                        
                 return true

    }

    makeApiCall =() =>{
      if(this.isValidation()) {
       this.props.navigation.navigate('Login')
      }
 }
    render() {
        return (
    <SafeAreaView style={{flex:1}}>
              
   <Image source ={require('../images/scanner.png')}
          style={{width:80,height:80,marginLeft:150,marginTop:80}}/>

       <View style ={{marginTop:80,width:330,borderBottomColor:'blue',marginHorizontal:40,borderWidth:1,height:30,marginVertical:20,borderLeftColor:'transparent',borderRightColor:'transparent',borderTopColor:'transparent'}}>
               <TextInput  
                  value={this.state.name}
                  
                  onChangeText ={(name)=>this.setState({name},console.log(name)) } 
                  placeholder="Name"
                  placeholderTextColor="grey"
                  style ={{fontSize:20}}>
                      </TextInput> 
            </View>
       <View style ={{width:330,borderBottomColor:'blue',marginHorizontal:40,borderWidth:1,height:30,marginVertical:20,borderLeftColor:'transparent',borderRightColor:'transparent',borderTopColor:'transparent'}}>
               <TextInput  value ={this.state.password}
                           onChangeText ={(password)=>this.setState({password},console.log(password))}
                           placeholder="Password"
                           placeholderTextColor="grey"
                           secureTextEntry={true}
                           style ={{fontSize:20}}>
                      </TextInput> 
            </View>
       <View style ={{width:330,borderBottomColor:'blue',marginHorizontal:40,borderWidth:1,height:30,marginVertical:20,borderLeftColor:'transparent',borderRightColor:'transparent',borderTopColor:'transparent'}}>
               <TextInput  value ={this.state.mobile}
                           onChangeText={(mobile)=>this.setState({mobile})}
                          placeholder="Mobile number"
                          placeholderTextColor="grey"
                        style ={{fontSize:20}}>
                      </TextInput> 
            </View>
       <View style ={{width:330,borderBottomColor:'blue',marginHorizontal:40,borderWidth:1,height:30,marginVertical:20,borderLeftColor:'transparent',borderRightColor:'transparent',borderTopColor:'transparent'}}>
               <TextInput  value ={this.state.designation}
                           onChangeText={(designation)=>this.setState({designation})}
                           placeholder="Designation"
                           placeholderTextColor="grey"
                           style ={{fontSize:20}}>
                      </TextInput> 
            </View>
       <View style ={{width:330,borderBottomColor:'blue',marginHorizontal:40,borderWidth:1,height:30,marginVertical:20,borderLeftColor:'transparent',borderRightColor:'transparent',borderTopColor:'transparent'}}>
               <TextInput value ={this.state.employment}
                          onChangeText ={(employment)=>this.setState({employment})}
                          placeholder="Employment No"
                           placeholderTextColor="grey"
                           style ={{fontSize:20}}>
                      </TextInput> 
            </View>
       <View style ={{width:330,borderBottomColor:'blue',marginHorizontal:40,borderWidth:1,height:30,marginVertical:20,borderLeftColor:'transparent',borderRightColor:'transparent',borderTopColor:'transparent'}}>
               <TextInput value ={this.state.email}
                          onChangeText={(email)=>this.setState({email})}
                          placeholder="Email"
                        placeholderTextColor="grey"
                  style ={{fontSize:20}}>
                      </TextInput> 
            </View>
          <View   style ={{width:100,height:60,borderWidth:1,justifyContent:'center',marginHorizontal:150,marginTop:20}}>
          <Button title ="REGISTER"
                   onPress ={this.makeApiCall}
                  />
          </View>
           
               
               
            </SafeAreaView>
        )
    }
}
