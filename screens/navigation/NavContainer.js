import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Share,

} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

 
import LocalImages from '../../constants/localImages';
import Colors from '../../utility/colors';



import LinearGradient from 'react-native-linear-gradient';
import Profile from '../Drawer/Profile';
import MeetupSendScreen from '../Tabs/MeetupSendScreen';
import MeetupReceiveScreen from '../Tabs/MeetupReceiveScreen';

import MeetupScreen from '../Drawer/MeetupScreen';


import Settings from '../Drawer/Settings';
import Rate from '../Drawer/Rate';


import {
  Login,
  SignUp,
  Dashboard,
  Splash,
  ShowFullImg,
  Chat,
  ChatScreen,
} from '../../container';
import { AdminProfile } from '../../component';
import GroupScreen from '../GroupScreen';
import ForgotPasswordScreen from '../AuthStack/ForgotPassword';
import Register from '../../TestingFolder/Register';
import Home from '../../TestingFolder/Home';
import LoginScreen from '../../TestingFolder/LoginScreen';
import LoadingScreen from '../../TestingFolder/LoadingScreen'



const MeetUpTabs = createMaterialTopTabNavigator();

function MeetupTabsScreen() {
  return (
    <MeetUpTabs.Navigator
      tabBarOptions={{
        activeTintColor: 'grey',
        labelStyle: {fontSize: 17, textTransform: 'none'},
        style: {backgroundColor: '#fff'},
        showIcon: true,
        tabStyle: {
          flexDirection: 'row',
        },
      }}>
      <MeetUpTabs.Screen
        name="MeetupSend"
        component={MeetupSendScreen}
        options={{
          tabBarLabel: 'MeetUp Sent',
          tabBarIcon: () => (
            <Image source={LocalImages.UPLOAD} style={styles.iconStyle} />
          ),
        }}
      />
      <MeetUpTabs.Screen
        name="MeetUpReceive"
        component={MeetupReceiveScreen}
        options={{
          tabBarLabel: 'MeetUp Received',
          tabBarIcon: () => (
            <Image source={LocalImages.DOWNLOAD} style={styles.iconStyle} />
          ),
        }}
      />
    </MeetUpTabs.Navigator>
  );
}

const MeetStack = createStackNavigator();
function MeetStackScreen({navigation}) {
  return (
    <MeetStack.Navigator>
      <MeetStack.Screen
        name="MeetTabs"
        component={MeetupTabsScreen}
        options={{
          headerTitle: 'Meetups',
          headerTitleStyle: {
            color: 'black',
            //textAlign: 'center',
            elevation: 0,
          },

          headerStyle: {
            backgroundColor: '#25CCF7',
            //textAlign:'center'
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.replace('Dashboard')}
              style={{marginLeft: 10}}>
              <Image
                source={LocalImages.BACK}
                style={[
                  styles.iconStyle,
                  {tintColor: 'black', fontWeight: 'bold'},
                ]}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </MeetStack.Navigator>
  );
}

// const Tab = createMaterialTopTabNavigator();
// function MyTabs() {
//   return (
//     <Tab.Navigator
//       tabBarOptions={{
//         activeTintColor: 'grey',
//         labelStyle: {fontSize: 17},
//         style: {backgroundColor: 'white'},
//         showIcon: true,
//         tabStyle: {
//           flexDirection: 'row',
//         },
//       }}>
//       <Tab.Screen
//         name="OnFlincs"
//         component={OnFlincsScreen}
//         options={{
//           tabBarLabel: 'OnFlincs',
//           tabBarIcon: () => (
//             <Image source={LocalImages.DOWNLOAD} style={styles.iconStyle} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Invite"
//         component={InviteScreen}
//         options={{
//           tabBarLabel: 'Invite',
//           tabBarIcon: () => (
//             <Image source={LocalImages.UPLOAD} style={styles.iconStyle} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

// const FriendStack = createStackNavigator();
// function FriendStackScreen({navigation}) {
//   return (
//     <FriendStack.Navigator>
//       <FriendStack.Screen
//         name="Friends"
//         component={MyTabs}
//         options={{
//           swipeEnabled: false,
//           headerTitle: 'Friends',
//           headerTitleStyle: {
//             color: 'white',
//             //textAlign: 'center',
//             elevation: 0,
//           },

//           headerStyle: {
//             backgroundColor: '#25CCF7',
//             //textAlign:'center'
//           },
//           headerLeft: () => (
//             <TouchableOpacity
//               onPress={() => navigation.goBack()}
//               style={{marginLeft: 10}}>
//               <Image
//                 source={LocalImages.BACK}
//                 style={[styles.iconStyle, {tintColor: 'white'}]}
//               />
//             </TouchableOpacity>
//           ),
//         }}
//       />
//     </FriendStack.Navigator>
//   );
// }

const HomeStack = createStackNavigator();
function HomeStackScreen({navigation}) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: true,
          headerTitle: null,
          swipeEnabled: false,
          
          headerStyle: {backgroundColor: '#25CCF7',shadowColor:'#25CCF7',elevation:0},
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={LocalImages.MENU}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: 'contain',
                  tintColor: Colors.white,
                  left: 10,
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <HomeStack.Screen
        name="CreateMeetUp"
        component={MeetupScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Meetup"
        component={MeetStackScreen}
        options={{headerShown: false}}
      />
  
      <HomeStack.Screen
        name="Calender"
        component={Dashboard}
        options={{
          headerShown: true,
          headerBackTitleVisible: null,
          headerStyle: {backgroundColor: Colors.white},
        }}
      />
      {/* <HomeStack.Screen
        name="Friends"
        component={FriendStackScreen}
        options={{headerShown: false}}
      /> */}

      <HomeStack.Screen
        name="Settings"
        component={Settings}
        options={{headerBackTitleVisible: null}}
      />
      {/* <HomeStack.Screen
        name="Share"
        component={ShareScreen}
        options={{headerBackTitleVisible: null}}
      /> */}
      <HomeStack.Screen
        name="Rate"
        component={Rate}
        options={{headerBackTitleVisible: null}}
      />
      <HomeStack.Screen
        name="Group"
        component={GroupScreen}
        options={{headerBackTitleVisible: null}}
      />
    </HomeStack.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={['#25CCF7', '#4834DF']}
        style={{ flex:0.2,justifyContent: 'center', alignItems: 'center',paddingTop:40 }}>
         
          <AdminProfile/>
        
       
       
      </LinearGradient>

      <ScrollView style={{flex: 1, backgroundColor: '#fff', marginLeft: 5,marginTop:20}}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Profile')}
          style={styles.menuStyle}>
          <Image source={LocalImages.PROFILE} style={styles.iconStyle} />
          <Text style={styles.iconText}> Profile </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('Meetup')}
          style={styles.menuStyle}>
          <Image source={LocalImages.MEETUPS} style={styles.iconStyle} />
          <Text style={styles.iconText}> MeetUps </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => props.navigation.navigate('Friends')}
          style={styles.menuStyle}>
          <Image source={LocalImages.FRIEND} style={styles.iconStyle} />
          <Text style={styles.iconText}> Friends </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Calender')}
          style={styles.menuStyle}>
          <Image source={LocalImages.CALENDER} style={styles.iconStyle} />
          <Text style={styles.iconText}> Calendar </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Chat With friends')}
          style={styles.menuStyle}>
          <Image source={LocalImages.CHAT} style={styles.iconStyle} />
          <Text style={styles.iconText}> Chat </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Settings')}
          style={styles.menuStyle}>
          <Image source={LocalImages.SETTINGS} style={styles.iconStyle} />
          <Text style={styles.iconText}> Settings </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={myCustomShare} style={styles.menuStyle}>
          <Image source={LocalImages.SHARE} style={styles.iconStyle} />
          <Text style={styles.iconText}> Share the App </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Rate')}
          style={styles.menuStyle}>
          <Image source={LocalImages.RATE} style={styles.iconStyle} />
          <Text style={styles.iconText}> Rate the App </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const Drawer = createDrawerNavigator();
function DrawerScreen() {
  return (
    <Drawer.Navigator
      drawerType="slide"
      initialRouteName="Home"
      drawerContent={props => CustomDrawerContent(props)}>
      <Drawer.Screen name="home" component={HomeStackScreen} options ={{swipeEnabled: true}} />
    </Drawer.Navigator>
  );
}

const AuthStack = createStackNavigator();

function AuthStackScreen() {
  return (
    <AuthStack.Navigator
    initialRouteName="Splash"
      screenOptions={{
        swipeEnabled: false,
        // headerShown: true,
        headerStyle: {backgroundColor: Colors.GRADIENT_PRIMARY},
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
        headerTintColor: Colors.white,
        headerTitleAlign: 'center',
      }}>
      <AuthStack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
   
    <AuthStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="forgot"
        component={ForgotPasswordScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      /> 

      {/* <AuthStack.Screen
        name="loading"
        component={LoadingScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="register"
        component={Register}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="home"
        component={Home}
        options={{headerShown: false}}
      />
     */}

      
     
      <HomeStack.Screen
        name="Dashboard"
        component={DrawerScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Chat"
        component={Chat}
        options={{headerBackTitleVisible: null}}
      />
      <HomeStack.Screen
        name="Chat With friends"
        component={ChatScreen}
        options={{headerBackTitleVisible: null}}
      />
      <HomeStack.Screen
        name="ShowFullImg"
        component={ShowFullImg}
        options={{
          headerBackTitle: null,
        }}
      />
    </AuthStack.Navigator>
  );
}

export default function NavContainer() {
  return (
    <NavigationContainer>
      <AuthStackScreen />
    </NavigationContainer>
  );
}



const myCustomShare = async () => {
  try {
    const result = await Share.share({
      message: 'Hey, would like you join flincs \n https://flincsapplicationv1.page.link/rniX', 
  
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
}

const styles = StyleSheet.create({
  menuStyle: {
    flexDirection: 'row',
    padding: 20,
  },
  iconStyle: {
    width: 15,
    height: 15,
    resizeMode: 'cover',
    margin: 5,

  },
  iconText: {
    fontSize: 16,
    marginLeft: 20,
  },
});


