import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  StatusBar,
} from 'react-native';
import {globalStyle, appStyle, color} from '../../utility';
import {getAsyncStorage, keys} from '../../asyncStorage';
import {setUniqueValue} from '../../utility/constants';
import * as Animatable from 'react-native-animatable';

const {width, height} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../utility/colors';

export default ({navigation}) => {
  useEffect(() => {
    const redirect = setTimeout(() => {
      getAsyncStorage(keys.uuid)
        .then((uuid) => {
          if (uuid) {
            setUniqueValue(uuid);
            navigation.replace('Dashboard');
          } else {
            navigation.replace('Login');
          }
        })
        .catch((err) => {
          console.log(err);
          navigation.replace('Login');
        });
    }, 4000);
    return () => clearTimeout(redirect);
  }, [navigation]);


  const fadeIn = {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  };
  const zoomOut = {
    0: {
      opacity: 1,
      scale: 0,
    },
    0.5: {
      opacity: 1,
      scale: 1,
    },
   
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <LinearGradient
        colors={['#25CCF7', '#4834DF']}
        style={styles.linearGradient}>
        <Animatable.Text
          animation={zoomOut}
          style={{fontSize: 40, color: Colors.white,textTransform:'uppercase',letterSpacing:5}}>
          Flincs
        </Animatable.Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splash: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});