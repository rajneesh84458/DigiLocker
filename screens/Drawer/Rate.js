import React, { Component } from 'react';
//Import React
import {
  Platform,
  StyleSheet,
  View,
  Linking,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
//Import basic react native components

const GOOGLE_PACKAGE_NAME = 'agrawal.trial.yourfeedback';
const APPLE_STORE_ID = 'id284882215';

export default class RateScreen extends Component {
  constructor() {
    super();
    //Alert will be visible after 5 seconds
    this.state = { count: 5 };
  }

  componentDidMount() {
    //Start counter for the rating
    this.startRatingCounter();
  }

  startRatingCounter = () => {
    //Initialize count by 5 to start counter for 5 sec
    this.setState({ count: 5 });
    let t = setInterval(() => {
      this.setState({ count: this.state.count - 1 });
      if (this.state.count == 0) {
        clearInterval(t);
        //After 5 second ask for the rate this app
        Alert.alert(
          'Rate us',
          'Would you like to share your review with us? This will help and motivate us a lot.',
          [
            { text: 'Sure', onPress: () => this.openStore() },
            {
              text: 'No Thanks!',
              onPress: () => console.log('No Thanks Pressed'),
              style: 'cancel',
            },
          ],
          { cancelable: false }
        );
      }
    }, 1000);
  };

  openStore = () => {
    //This is the main trick
    if (Platform.OS != 'ios') {
      Linking.openURL(`market://details?id=${GOOGLE_PACKAGE_NAME}`).catch(err =>
        alert('Please check for the Google Play Store')
      );
    } else {
      Linking.openURL(
        `itms://itunes.apple.com/in/app/apple-store/${APPLE_STORE_ID}`
      ).catch(err => alert('Please check for the App Store'));
    }
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={{ fontSize: 25, textAlign: 'center' }}>
  Add Rating
        </Text>
        <Text style={{ fontSize: 15, marginTop: 30 }}>
          Rate this App alert will be in {this.state.count} second
        </Text>
        <TouchableOpacity
          onPress={this.startRatingCounter}
          activeOpacity={0.6}
          style={styles.button}>
          <Text style={styles.TextStyle}>Restart Reating Counter</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 20,
  },
  button: {
    width: '80%',
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#00BCD4',
    borderRadius: 7,
    marginTop: 20,
  },
  TextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
});