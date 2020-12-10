import React, { useState, useContext } from "react";
import {
  Text,
  SafeAreaView,
  View,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,StyleSheet,TextInput,Image,TouchableOpacity,ImageBackground
} from "react-native";

import { InputField, RoundCornerButton, Logo } from "../../component";
import { globalStyle, color, appStyle } from "../../utility";
import { Store } from "../../context/store";
import { LOADING_START, LOADING_STOP } from "../../context/actions/type";
import { setAsyncStorage, keys } from "../../asyncStorage";
import {
  setUniqueValue,
  keyboardVerticalOffset,
} from "../../utility/constants";
import { SignUpRequest, AddUser } from "../../network";
import Colors from "../../utility/colors";
import { Auth } from "../../Setup";

export default ({ navigation }) => {
  const globalState = useContext(Store);
  const { dispatchLoaderAction } = globalState;
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile:""
  });
  const [logo, toggleLogo] = useState(true);
  const { email, password, confirmPassword, name,mobile } = credential;

  const [hidePassword, setHidePass] = useState(true);
  const [hideConPassword, setConHidePass] = useState(true);
  const setInitialState = () => {
    setCredential({ email: "", password: "", confirmPassword: "",mobile:"" });
  };

  //   * ON SIGN UP PRESS
  const onSignUpPress = () => {
    Keyboard.dismiss();
    if (!name) {
      alert("Name is required");
    }
    else if (!email) {
      alert("Email is required");
    } 
    else if (!mobile) {
      alert("Mobile number is required");
    } 
    
    else if (!password) {
      alert("Password is required");
    } 
    else if (password != confirmPassword) {
      alert("Password do not match");
    } 
     else {
      dispatchLoaderAction({
        type: LOADING_START,
      });
      SignUpRequest(email, password)
        .then((res) => {
          if (!res.additionalUserInfo) {
            dispatchLoaderAction({
              type: LOADING_STOP,
            });
            alert(res);
            return;
          }
          let uid = Auth().currentUser.uid;
          let profileImg = "";
          AddUser(name, email, uid, profileImg,mobile)
            .then(() => {
              setAsyncStorage(keys.uuid, uid);
              setUniqueValue(uid);
              dispatchLoaderAction({
                type: LOADING_STOP,
              });
              navigation.replace("Dashboard");
            })
            .catch((err) => {
              dispatchLoaderAction({
                type: LOADING_STOP,
              });
              alert(err);
            });
        })
        .catch((err) => {
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          alert(err);
        });
    }
  };
  // * HANDLE ON CHANGE
  const handleOnChange = (name, value) => {
    setCredential({
      ...credential,
      [name]: value,
    });
  };
  // * ON INPUT FOCUS

  const handleFocus = () => {
    setTimeout(() => {
      toggleLogo(false);
    }, 200);
  };
  // * ON INPUT BLUR

  const handleBlur = () => {
    setTimeout(() => {
      toggleLogo(true);
    }, 200);
  };

  const setPasswordVisibility = () => {
    setHidePass(!hidePassword);
  };
  const setPasswordConVisibility = () => {
    setConHidePass(!hideConPassword);
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={keyboardVerticalOffset}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={[globalStyle.flex1, { backgroundColor: color.BLACK }]}
    >
     
         <ImageBackground style={{flex:1}} source ={require('../../assets/images/rainfall1.gif')}>
        
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ flex: 1, backgroundColor: color.BLACK }}>
         

          <View style={[globalStyle.flex2, globalStyle.sectionCentered]}>
            <InputField
              placeholder="Enter name"
              value={name}
              onChangeText={(text) => handleOnChange("name", text)}
              onFocus={() => handleFocus()}
              onBlur={() => handleBlur()}
              autoCaptailize="none"
            />
            <InputField
              placeholder="Enter email"
              value={email}
              onChangeText={(text) => handleOnChange("email", text)}
              onFocus={() => handleFocus()}
              onBlur={() => handleBlur()}
              autoCaptailize="none"
            />
            <InputField
              placeholder="Enter Mobile"
              value={mobile}
              onChangeText={(text) => handleOnChange("mobile", text)}
              onFocus={() => handleFocus()}
              onBlur={() => handleBlur()}
              autoCaptailize="none"
              keyboardType="number-pad"
            />
            {/* <InputField
              placeholder="Enter password"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => handleOnChange("password", text)}
              onFocus={() => handleFocus()}
              onBlur={() => handleBlur()}
              autoCaptailize="none"
            /> */}

          <View style={styles.textBoxContainer}>
              <TextInput
                placeholder="Enter Password"
                underlineColorAndroid="transparent"
                secureTextEntry={hidePassword}
                value={password}
                autoCaptailize ="none"
                onChangeText={text => handleOnChange('password', text)}
                style={styles.textBox}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.touachableButton}
                onPress={() => setPasswordVisibility()}>
                <Image
                  source={
                    hidePassword
                      ? require('../../assets/images/hide.png')
                      : require('../../assets/images/eye.png')
                  }
                  style={styles.buttonImage}
                />
              </TouchableOpacity>
            </View>
          <View style={styles.textBoxContainer}>
              <TextInput
                placeholder="Enter Confirm Password"
                underlineColorAndroid="transparent"
                secureTextEntry={hideConPassword}
                value={confirmPassword}
                autoCaptailize ="none"
                onChangeText={text => handleOnChange('confirmPassword', text)}
                style={styles.textBox}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.touachableButton}
                onPress={() => setPasswordConVisibility()}>
                <Image
                  source={
                    hideConPassword
                      ? require('../../assets/images/hide.png')
                      : require('../../assets/images/eye.png')
                  }
                  style={styles.buttonImage}
                />
              </TouchableOpacity>
            </View>
    

            <RoundCornerButton
              title="Sign Up"
              onPress={() => onSignUpPress()}
            />
             <RoundCornerButton
              title="Login"
              onPress={() => {
                setInitialState();
                navigation.navigate("Login");
              }}
            />
            
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
     
      </ImageBackground>
      {/* </LinearGradient> */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  
  linearGradient: {
    flex: 1,
    padding:10
  },
  textBoxContainer: {
    position: 'relative',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  textBox: {
    paddingLeft: 16,
    backgroundColor: 'white',
    width: '90%',
    color: '#005792',
    height: appStyle.fieldHeight,
    alignSelf: 'center',
    marginVertical: appStyle.fieldMarginVertical,
    fontSize: 16,
  },
  touachableButton: {
    position: 'absolute',
    right: 22,
    height: 25,
    width: 25,
    padding: 2,
  },
  buttonImage: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },
  
});




