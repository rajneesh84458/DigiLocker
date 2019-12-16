import React from 'react';
import 'react-native-gesture-handler'
import { SafeAreaView, StyleSheet, View,Text, StatusBar,TouchableOpacity,Dimensions,Image,ScrollView,Alert,AsyncStorage} from 'react-native';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createStackNavigator,} from 'react-navigation-stack';
import {createDrawerNavigator,DrawerItems} from 'react-navigation-drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LoginPage from './screens/LoginPage';
import RegisterPage from './screens/RegisterPage';
import HomeScreen from './screens/HomeScreen';
import MyProfile from './screens/DrawerNavigator/MyProfile';
import ScanStudent from './screens/DrawerNavigator/ScanStudent';
import Settings from './screens/DrawerNavigator/Settings';

import { Container, Header, Content } from 'native-base';
const DEVICE_WIDTH = Dimensions.get('window').width;

export default class App extends React.Component{

  
  render(){
      return(
         <SafeAreaView style={{flex:1}}>
           <StatusBar barStyle ="dark-content"/>
          <MyApp/>
         </SafeAreaView>
      )
  }
}
const MyStack1 =createStackNavigator({
  defaultHome:HomeScreen
},{
  defaultNavigationOptions: ({navigation})=> {
  return {
      headerStyle: {
        backgroundColor: '#277ccb',
      },headerLeft: () => (
         <View style={{flexDirection:'row',paddingHorizontal:20,paddingBottom:20}}>
         <TouchableOpacity onPress ={()=>navigation.toggleDrawer()} >
         <Ionicons name ="ios-menu" size={32} color ="white" style={{bottom:5}}/>
      
         </TouchableOpacity>
         <Text style={{marginLeft:20,fontSize:20,fontWeight:'bold',color:'white'}}>My Files</Text>
         </View>
      ),
    }},
})
const MyStack2 =createStackNavigator({
  defaultHome:MyProfile
},
{
  defaultNavigationOptions: ({navigation})=> {
  return {
      headerStyle: {
        backgroundColor: '#277ccb',
      },headerLeft: () => (
         <View style={{flexDirection:'row',paddingHorizontal:20,paddingBottom:20}}>
         <TouchableOpacity onPress ={()=>navigation.toggleDrawer()} >
         <Ionicons name ="ios-menu" size={32} color ="white" style={{bottom:5}}/>
      
         </TouchableOpacity>
         <Text style={{marginLeft:20,fontSize:20,fontWeight:'bold',color:'white'}}>MyProfile</Text>
         </View>
      ),
    }},
}
)
const MyStack3 =createStackNavigator({
  defaultHome:ScanStudent
},
{
  defaultNavigationOptions: ({navigation})=> {
  return {
      headerStyle: {
        backgroundColor: '#277ccb',
      },headerLeft: () => (
         <View style={{flexDirection:'row',paddingHorizontal:20,paddingBottom:20}}>
         <TouchableOpacity onPress ={()=>navigation.toggleDrawer()} >
         <Ionicons name ="ios-menu" size={32} color ="white" style={{bottom:5}}/>
        </TouchableOpacity>
         <Text style={{marginLeft:20,fontSize:20,fontWeight:'bold',color:'white'}}>ScanStudent</Text>
         </View>
      ),
    }},
})
const MyStack4 =createStackNavigator({
  defaultHome:Settings
},
{
  defaultNavigationOptions: ({navigation})=> {
  return {
      headerStyle: {
        backgroundColor: '#277ccb',
      },headerLeft: () => (
       
         <View style={{flexDirection:'row',paddingHorizontal:20,paddingBottom:20}}>
         <TouchableOpacity onPress ={()=>navigation.toggleDrawer()} >
         <Ionicons name ="ios-menu" size={32} color ="white" style={{bottom:5}}/>
      </TouchableOpacity>
      
      <Text style={{marginLeft:20,fontSize:20,fontWeight:'bold',color:'white'}}>Settings</Text>
                  
        
         </View>
         
      ),
    }},
})

// Drawer Navigator

const CustomContentDrawerComponent =(props) =>  (

  <Container style={{flex:1}}>
      <ScrollView style={{flex:1}}>
 <View style={{width:DEVICE_WIDTH,height:200,marginVertical:10}}>
        <View style={{width:300,height:180,borderWidth:1,borderColor:'transparent',marginTop:10,justifyContent:'center',alignItems:'center'}}>
           <TouchableOpacity style={{width:100,height:100,borderColor:'white',borderRadius:100,justifyContent:'center',alignItems:'center'}}>
           <Image source ={require('./images/scanner.png')} style={{width:100,height:100,borderRadius:100}}/>
           </TouchableOpacity> 
           <View style={{padding:20,justifyContent:'center',alignItems:'center'}}>
        <Text style ={{color:'blue'}}>Rajneesh</Text>
        <Text style ={{color:'blue'}}>rajneesh@gmail.com</Text>
        <Text style ={{color:'blue'}}>Noida</Text>
        </View>
        </View>
      </View>
        
        <View style={{width:'100%',height:0.5,borderColor:'white',borderWidth:0.5}}></View>

         <Content style={{width:'100%',marginVertical:30}}>
            <DrawerItems {...props}/>
            <TouchableOpacity onPress={()=>Alert.alert('Log out', 'Do you want to logout?',
                [
                  {text: 'Cancel', onPress: () => {return null}},
                  {text: 'Confirm', onPress: () => {
                    // AsyncStorage.clear();
                    props.navigation.navigate('Login')
                  }},
                ],
                { cancelable: false }
              )  
            }>  
            <View style ={{flexDirection:'row',padding:15}}>
           <Image source ={require('./images/exit.png')} style={{width:30,height:30,overlayColor:'white'}} />
              <Text style={{fontSize:17,color: "black",paddingLeft:25}}>Logout</Text>
              </View>
           
              </TouchableOpacity>
         </Content>
      
      </ScrollView>
  </Container>
  
)


const MyDrawer =createDrawerNavigator({
  Screen1: {
    screen: MyStack1,
    navigationOptions: {
      drawerLabel: 'My Files',
      fontSize:20,
      drawerIcon:(  
      <Image source ={require('./images/folder.png')} style={{width:30,height:30,overlayColor:'white'}} />
      )
    },
  },

  Screen2: {
    //Title
    screen:MyStack2 ,
    navigationOptions: {
      drawerLabel: 'My Profiles',
      drawerIcon:(
        <Image source ={require('./images/user.png')} style={{width:30,height:30,overlayColor:'white'}} />
      )
    },
  },
  Screen3: {
    //Title
    screen: MyStack3,
    navigationOptions: {
      drawerLabel: 'Scan Student',
      drawerIcon:(
        <Image source ={require('./images/student.png')} style={{width:30,height:30,overlayColor:'white'}} />
      )
    },
  },
  Screen4: {
    //Title
    screen: MyStack4,
    navigationOptions: {
      drawerLabel: 'Settings',
      drawerIcon:(
        <Image source ={require('./images/development.png')} style={{width:30,height:30,overlayColor:'white'}} />
     
      )
    },
  },
 },
{
  
  initialRouteName:'Screen1',
  drawerPosition:'left',
  contentComponent:CustomContentDrawerComponent,
  drawerOpenRoute:'DrawerOpen',
  drawerCloseRoute:'DrawerClose',
  drawerToggleRoute:'DrawerToggle',
  drawerWidth: DEVICE_WIDTH - 120,

})
const MyAuth =createSwitchNavigator({

  Login:LoginPage,
  Register:RegisterPage,
  Home:MyDrawer
})
const MyApp =createAppContainer(MyAuth);

