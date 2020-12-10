
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {firebase} from '../../Setup';

export default class ForgotPasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  onResetPasswordPress = () => {
      if(!this.state.email){
        Snackbar.show({
            text:"please enter your email",
            duration:Snackbar.LENGTH_SHORT
        })
      }
      else{
        firebase
        .auth()
        .sendPasswordResetEmail(this.state.email)
        .then(
          () => {
            // Alert.alert('Password reset email has been sent.');
            Snackbar.show({
                text:"Password reset email has been sent.",
                duration:Snackbar.LENGTH_SHORT
            })
          },
          error => {
            Alert.alert(error.message);
          },
        );
      }
    
  };

  onBackToLoginPress = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={{flex: 1,backgroundColor:'#fff'}}>
        <TouchableOpacity
          onPress={() => this.props.navigation.replace('Login')}
          style={styles.icon}>
          <Image
            source={require('../../assets/images/left.png')}
            style={styles.img}
          />
        </TouchableOpacity>

        <Text style={styles.heading}>welcome on flincs</Text>
        <Text style={styles.forgot}>Forgot Password ?</Text>
        <View
          style={{margin: 40, flexDirection: 'row', borderBottomWidth: 0.6}}>
          <Image
            source={require('../../assets/images/mail.png')}
            style={{width: 30, height: 30, resizeMode: 'cover', top: 5}}
          />
          <TextInput
            style={styles.input}
            value={this.state.email}
            onChangeText={text => {
              this.setState({email: text});
            }}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={this.onResetPasswordPress}>
          <Text style={{fontSize: 20, color: 'white'}}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  img: {
    width: 25,
    height: 25,
    resizeMode: 'cover',
  },
  heading: {
    paddingLeft: 28,
    fontSize: 17,
    color: 'black',
    fontWeight: '200',
    letterSpacing: 3,
    textTransform: 'uppercase',
  },

  forgot: {
    padding: 10,
    fontSize: 35,
    color: 'black',
    marginLeft: 10,
    fontWeight: '600',
  },
  icon: {
    padding: 30,
    paddingTop: 40,
  },
  passwordStyle: {
    fontSize: 35,
    color: 'black',
    marginLeft: 10,
    fontWeight: '600',
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: 'black',
    paddingVertical: 8,
    marginBottom: 10,
  },
  button: {
    marginHorizontal: 50,
    padding: 10,
    backgroundColor: '#1F6ED4',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
