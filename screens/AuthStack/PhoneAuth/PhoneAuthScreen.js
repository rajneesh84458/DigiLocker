import React, { Component } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  TextInput,Image, StatusBar,KeyboardAvoidingView, 
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'
import LocalImages from '../../../constants/localImages'
import Snackbar from 'react-native-snackbar';
import { Auth } from '../../../Setup';


class PhoneAuthScreen extends Component {
  state = {
    phone: '+91 ',
    confirmResult: null,
    verificationCode: '',
    userId: '',
    displayName:''
  }
  validatePhoneNumber = () => {
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
    return regexp.test(this.state.phone)
  }

  handleSendCode = () => {
    Auth().appVerificationDisabledForTesting= true
    // Request to send OTP
    if (this.validatePhoneNumber()) {
      Auth()
        .signInWithPhoneNumber(this.state.phone)
        .then(confirmResult => {
          this.setState({ confirmResult })
        })
        .catch(error => {
          alert(error.message)

          console.log(error)
        })
    } else {
      alert('Invalid Phone Number')
    }
  }

  changePhoneNumber = () => {
    this.setState({ confirmResult: null, verificationCode: '' })
  }

  handleVerifyCode = () => {
    // Request for OTP verification
    const { confirmResult, verificationCode } = this.state
    if (verificationCode.length == 6) {
      confirmResult
        .confirm(verificationCode)
        .then(user => {
          Snackbar.show({
            text: 'Login Successfully',
            duration: Snackbar.LENGTH_SHORT,
          });
          console.log(user)
          this.setState({ userId: user.uid })

          this.props.navigation.navigate('Dashboard')
          //alert(`Verified! ${user.uid}`)
        })
        .catch(error => {
          alert(error.message)
          console.log(error)
        })
    } else {
      alert('Please enter a 6 digit OTP code.')
    }
  }

  renderConfirmationCodeView = () => {
    return (

      <View style={styles.verificationView}>
        <TextInput
          style={styles.textInput}
          placeholder='Verification code'
          placeholderTextColor='#eee'
          value={this.state.verificationCode}
          keyboardType='numeric'
          onChangeText={verificationCode => {
            this.setState({ verificationCode })
          }}
          maxLength={6}
        />
        <TouchableOpacity
          style={[styles.themeButton, { marginTop: 20 }]}
          onPress={this.handleVerifyCode}>
          <Text style={styles.themeButtonTitle}>Verify Code</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
         <KeyboardAvoidingView  
         behavior={Platform.OS == "ios" ? "padding" : "height"} 
         style={styles.container}>
<LinearGradient colors={['#25CCF7', '#4834DF']} style={{flex: 1}}>
            <View style ={{flexDirection:'row',padding:15,alignItems:'flex-end'}}>
             <TouchableOpacity style={{width:25,height:25,justifyContent:'flex-end'}}
             onPress ={()=>this.props.navigation.goBack()}>
             <Image source ={LocalImages.BACKARROW} style ={{width:20,height:20,resizeMode:'contain',tintColor:'white',marginTop:20}}/>
             </TouchableOpacity>
            
             <Text style={{color:'white',fontSize:15,paddingHorizontal:20,marginTop:30}}>back</Text>
           </View>
        <View style={styles.page}>
          <TextInput
            style={styles.textInput}
            placeholder='Phone Number with country code'
            placeholderTextColor='#eee'
            keyboardType='phone-pad'
            value={this.state.phone}
            onChangeText={phone => {
              this.setState({ phone })
            }}
            maxLength={15}
            editable={this.state.confirmResult ? false : true}
          />

          <TouchableOpacity
            style={[styles.themeButton, { marginTop: 20 }]}
            onPress={
              this.state.confirmResult
                ? this.changePhoneNumber
                : this.handleSendCode
            }>
            <Text style={styles.themeButtonTitle}>
              {this.state.confirmResult ? 'Change Phone Number' : 'Send Code'}
            </Text>
          </TouchableOpacity>

          {this.state.confirmResult ? this.renderConfirmationCodeView() : null}
        </View>
        </LinearGradient>
      
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#aaa'
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    marginTop: 20,
    width: '90%',
    height: 50,
    // borderColor: '#555',
    // borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    color: '#000',
    fontSize: 20,
    backgroundColor:'#fff'
  },
  themeButton: {
    width: '90%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#888',
    //borderColor: '#555',
   // borderWidth: 2,
    borderRadius: 5
  },
  themeButtonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  verificationView: {
    width: '100%',
    alignItems: 'center',
    marginTop: 50,
   backgroundColor:'transparent'
  }
})

export default PhoneAuthScreen






// import React, { Component } from 'react';
// import { View, Button, Text, TextInput, Image } from 'react-native';
// import { Auth } from '../../../Setup';


// const successImageUri = 'https://cdn.pixabay.com/photo/2015/06/09/16/12/icon-803718_1280.png';

// export default class PhoneAuthScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.unsubscribe = null;
//     this.state = {
//       user: null,
//       message: '',
//       codeInput: '',
//       phoneNumber: '+91 ',
//       confirmResult: null,
//     };
//   }

//   componentDidMount() {
//       this.unsubscribe = Auth().onAuthStateChanged((user) => {
//         if (user) {
//           this.setState({ user: user.toJSON() });
//         } else {
//           // User has been signed out, reset the state
//           this.setState({
//             user: null,
//             message: '',
//             codeInput: '',
//             phoneNumber: '+91 ',
//             confirmResult: null,
//           });
//         }
//       });
    
//   }

//   componentWillUnmount() {
//     if (this.unsubscribe) this.unsubscribe();
//   }

//   signIn = () => {
//     const { phoneNumber } = this.state;
//     this.setState({ message: 'Sending code ...' });

//     Auth().signInWithPhoneNumber(phoneNumber)
//       .then(confirmResult => this.setState({ confirmResult, message: 'Code has been sent!' }))
//       .catch(error => {
//         console.log(error)
//         this.setState({ message: `Sign In With Phone Number Error: ${error.message}` })
//       });

//   };

//   confirmCode = () => {
//     const { codeInput, confirmResult } = this.state;

//     if (confirmResult && codeInput.length) {
//       confirmResult.confirm(codeInput)
//         .then((user) => {
//           this.setState({ message: 'Code Confirmed!' });
//         })
//         .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` }));
//     }
//   };

//   signOut = () => {
//     firebase.auth().signOut();
//   }

//   renderPhoneNumberInput() {
//     const { phoneNumber } = this.state;

//     return (
//       <View style={{flex:1,justifyContent:'center',alignItems:'center' }}>
      
//         <TextInput
//           autoFocus
//            placeholder ="Enter your Mobile Number"
//            placeholderTextColor ="#cccc"
//           style={{ height: 40, marginTop: 15, marginBottom: 15,width:'90%',borderWidth:1 }}
//           onChangeText={value => this.setState({ phoneNumber: value })}
//            keyboardType="number-pad"
//           value={phoneNumber}
//         />
//         <Button title="Sign In" color="green" onPress={this.signIn} />
//       </View>
//     );
//   }

//   renderMessage() {
//     const { message } = this.state;

//     if (!message.length) return null;

//     return (
//       <Text style={{ padding: 5, backgroundColor: '#000', color: '#fff' }}>{message}</Text>
//     );
//   }

//   renderVerificationCodeInput() {
//     const { codeInput } = this.state;

//     return (
//       <View style={{ marginTop: 25, padding: 25 }}>
//         <Text>Enter verification code below:</Text>
//         <TextInput
//           autoFocus
//           style={{ height: 40, marginTop: 15, marginBottom: 15 }}
//           onChangeText={value => this.setState({ codeInput: value })}
//           placeholder={'Code ... '}
//           value={codeInput}
//         />
//         <Button title="Confirm Code" color="#841584" onPress={this.confirmCode} />
//       </View>
//     );
//   }

//   render() {
//     const { user, confirmResult } = this.state;
//     return (
      
//       <View style={{ flex: 1 }}>

//         {!user && !confirmResult && this.renderPhoneNumberInput()}

//         {this.renderMessage()}

//         {!user && confirmResult && this.renderVerificationCodeInput()}

//         {user && (
//           <View
//             style={{
//               padding: 15,
//               justifyContent: 'center',
//               alignItems: 'center',
//               backgroundColor: '#77dd77',
//               flex: 1,
//             }}
//           >
//             <Image source={{ uri: successImageUri }} style={{ width: 100, height: 100, marginBottom: 25 }} />
//             <Text style={{ fontSize: 25 }}>Signed In!</Text>
//             <Text>{JSON.stringify(user)}</Text>
//             <Button title="Sign Out" color="red" onPress={this.signOut} />
//           </View>
//         )}
//       </View>
//     );
//   }
// }

