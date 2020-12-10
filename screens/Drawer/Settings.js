// import React, { Component } from 'react'
// import { Text, View } from 'react-native'
// import OneSignal from 'react-native-onesignal'; // Import package from node modules

// export default class Settings extends Component {

//   constructor(props) {
//     super(props);
//     //Remove this method to stop OneSignal Debugging
//     OneSignal.setLogLevel(6, 0);

//     // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
//     OneSignal.init("5a33cd61-312e-4b64-8940-752ab44781e1", {kOSSettingsKeyAutoPrompt : false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption:2});
//     OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.

//     // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
//     // OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

//      OneSignal.addEventListener('received', this.onReceived);
//      OneSignal.addEventListener('opened', this.onOpened);
//      OneSignal.addEventListener('ids', this.onIds);
//   }
//     componentWillUnmount() {
//       OneSignal.removeEventListener('received', this.onReceived);
//       OneSignal.removeEventListener('opened', this.onOpened);
//       OneSignal.removeEventListener('ids', this.onIds);
//     }

//     onReceived(notification) {
//       alert("Notification received: ", notification.payload);
//     }

//     onOpened(openResult) {
//       alert('Message: ', openResult.notification.payload.body);
//       console.log("Mesasage",openResult.notification.payload.body)
//       alert('Data: ', openResult.notification.payload.additionalData);
//       console.log('Data: ', openResult.notification.payload.additionalData)
//       alert('isActive: ', openResult.notification.isAppInFocus);
//       console.log('isActive: ', openResult.notification.isAppInFocus)
//       alert('openResult: ', openResult);
//       console.log('openResult: ', openResult)
//     }

//     onIds(device) {
//       console.log('Device info: ', device);
//     }

//   componentDidMount(){
//     this.sendNotification('My Name is Rajneesh kumar')
//   }

//     sendNotification = data => {
//       let headers = {
//         "Content-Type": "application/json; charset=utf-8",
//         Authorization: "Basic ZjBiZGY0ZTktNzM5YS00MWRjLThhNGYtZjQ4NTg0OTI5ZWI4 "
//       };

//       let endpoint = "https://onesignal.com/api/v1/notifications";

//       let params = {
//         method: "POST",
//         headers: headers,
//         body: JSON.stringify({
//           app_id: "5a33cd61-312e-4b64-8940-752ab44781e1",
//           included_segments: ["All"],
//           contents: { en: data }
//         })
//       };
//       fetch(endpoint, params).then(res => console.log("myresponse =======>",res));
//     };

//   render() {
//     return (
//       <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
//         <Text> Notification</Text>
//       </View>
//     )
//   }
// }

// import {Item} from 'native-base';
// import React, {Component} from 'react';
// import {Text, View} from 'react-native';

// import {SwipeListView} from 'react-native-swipe-list-view';

// export default class Settings extends Component {
//   state = {
//     data: [],
//   };

//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then(res => res.json())
//       .then(result => {
//         this.setState({data: result});
//       });
//   }

//   render() {
//     return (
//       <View>
//         <SwipeListView
//           data={this.state.data}
//           renderItem={({item}) => {
//             return (
//               <View style={{margin: 10, backgroundColor: '#ccc', padding: 10}}>
//                 <Text>{item.name}</Text>
//               </View>
//             );
//           }}
//           renderHiddenItem={({item, index}) => (
//             <View style={{margin: 10, backgroundColor: '#ccc', padding: 10}}>
//               <Text>{item.name}</Text>
//             </View>
//           )}
//           rightOpenValue={75}
//         />
//       </View>
//     );
//   }
// }


import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class Settings extends Component {
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}
