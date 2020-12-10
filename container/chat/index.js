import React, { useLayoutEffect, useState, useEffect, Fragment } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,Image
} from "react-native";
import ImagePicker from "react-native-image-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { globalStyle, color, appStyle } from "../../utility";
import styles from "./styles";
import { InputField, ChatBox } from "../../component";
import OneSignal from 'react-native-onesignal';
import { senderMsg, recieverMsg } from "../../network";
import { deviceHeight } from "../../utility/styleHelper/appStyle";
import { smallDeviceHeight } from "../../utility/constants";
import { database } from "../../Setup";
import Snackbar from "react-native-snackbar";
import moment from 'moment'

const Chat = ({ route, navigation }) => {
  OneSignal.setLogLevel(6, 0);
    
  // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
  OneSignal.init("5a33cd61-312e-4b64-8940-752ab44781e1", {kOSSettingsKeyAutoPrompt : false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption:2});
  OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.
  
  // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
  // OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

   OneSignal.addEventListener('received', onReceived);
   OneSignal.addEventListener('opened', onOpened);
   OneSignal.addEventListener('ids', onIds);
  const { params } = route;
  const { name, img, imgText, guestUserId, currentUserId, } = params;
  const [msgValue, setMsgValue] = useState("");
  const [messeges, setMesseges] = useState([]);



  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: <Text>{name}</Text>,
    });
  }, [navigation]);




  const onReceived =(notification) =>{
    //alert("Notification received: ", notification.payload);
    // alert(notification.payload)
     Snackbar.show({
      text: notification.payload,
      duration: Snackbar.LENGTH_SHORT,
    });

   // OneSignal.(notification.payload);
  }

  const onOpened =(openResult) => {
    //alert('Message: ', openResult.notification.payload.body);
    console.log("Mesasage",openResult.notification.payload.body)
    //alert('Data: ', openResult.notification.payload.additionalData);
    console.log('Data: ', openResult.notification.payload.additionalData)
   // alert('isActive: ', openResult.notification.isAppInFocus);
    console.log('isActive: ', openResult.notification.isAppInFocus)
   // alert('openResult: ', openResult);
    console.log('openResult: ', openResult)
  }

 const  onIds=(device)=> {
    console.log('Device info: ', device);
  }

  

  useEffect(() => {
     
    try {
    
        database()
        .ref("messeges")
        .child(currentUserId)
        .child(guestUserId)
        .on("value", (dataSnapshot) => {
          let msgs = [];
          dataSnapshot.forEach((child) => {
            msgs.push({
              sendBy: child.val().messege.sender,
              recievedBy: child.val().messege.reciever,
              msg: child.val().messege.msg,
              img: child.val().messege.img,
              createdAt:child.val().messege.createdAt
            });
          });
          setMesseges(msgs.reverse());
          
        });
    } catch (error) {
      alert(error);
    }
    OneSignal.removeEventListener('received', onReceived);
      OneSignal.removeEventListener('opened', onOpened);
      OneSignal.removeEventListener('ids', onIds);
  }, []);

  const handleSend = () => {
    if(guestUserId){
      sendNotification(msgValue)
     }
    setMsgValue("");
    if (msgValue) {
      senderMsg(msgValue, currentUserId, guestUserId, "")
        .then(() => {})
        .catch((err) => alert(err));
         
      // * guest user

      recieverMsg(msgValue, currentUserId, guestUserId, "")
        .then(() => {
             
        })
        .catch((err) => alert(err));

        // notification send
          
        
    }
  };

  const sendNotification = msgValue => {
    let headers = {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Basic ZjBiZGY0ZTktNzM5YS00MWRjLThhNGYtZjQ4NTg0OTI5ZWI4 "
    };
  
    let endpoint = "https://onesignal.com/api/v1/notifications";
  
    let params = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        app_id: "5a33cd61-312e-4b64-8940-752ab44781e1",
        included_segments: ['All'],
        contents: { en: msgValue },
        ///msg:msgValue
      })
    };
    fetch(endpoint, params).then(res => console.log("myresponse =======>",res));
  };
  const handleCamera = () => {
    const option = {
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(option, (response) => {
      if (response.didCancel) {
        console.log("User cancel image picker");
      } else if (response.error) {
        console.log(" image picker error", response.error);
      } else {
        // Base 64
        let source = "data:image/jpeg;base64," + response.data;

        senderMsg(msgValue, currentUserId, guestUserId, source)
          .then(() => {})
          .catch((err) => alert(err));

        // * guest user

        recieverMsg(msgValue, currentUserId, guestUserId, source)
          .then(() => {})
          .catch((err) => alert(err));
      }
    });
  };

  const handleOnChange = (text) => {
    setMsgValue(text);
  };

  //   * On image tap
  const imgTap = (chatImg) => {
    navigation.navigate("ShowFullImg", { name, img: chatImg });
  };
  return (
    <SafeAreaView style={[globalStyle.flex1, { backgroundColor: color.BLACK }]}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={deviceHeight > smallDeviceHeight ? 100 : 70}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[globalStyle.flex1, { backgroundColor: color.BLACK }]}
      >
       {/* <Text>{moment().utcOffset('+05:30').format('YYYY-MM-DD hh:mm:ss a')}</Text>  */}
        <TouchableWithoutFeedback
          style={[globalStyle.flex1]}
          onPress={Keyboard.dismiss}
        >
          <Fragment>
  
            <FlatList
             style={{backgroundColor:'#ccc'}}
              inverted
              data={messeges}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                 
                <ChatBox
                  msg={item.msg}
                  userId={item.sendBy}
                  img={item.img}
                   createdAt={moment(item.createdAt).utcOffset('+05:30').format(' hh:mm a')}
                   //createdAt={moment(item.createdAt).utcOffset('+05:30').format('YYYY-MM-DD hh:mm:ss a')}
               
                  onImgTap={() => imgTap(item.img)}
                  
                />
        
              )}
            />

            {/* Send Message */}
            <View style={styles.sendMessageContainer}>
              <InputField
                placeholder="Type Here"
                numberOfLines={10}
                inputStyle={styles.input}
                value={msgValue}
                onChangeText={(text) => handleOnChange(text)}
              />
              <View style={styles.sendBtnContainer}>
                <MaterialCommunityIcons
                  name="camera"
                  color={color.WHITE}
                  size={appStyle.fieldHeight}
                  onPress={() => handleCamera()}
                />

        
                <MaterialCommunityIcons
                  name="send-circle"
                  color={color.WHITE}
                  size={appStyle.fieldHeight}
                  onPress={() => handleSend()}
                />
                
                
              </View>
            </View>
          </Fragment>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;



