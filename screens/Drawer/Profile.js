import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import {
  SafeAreaView,
  Alert,
  Text,
  View,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
} from 'react-native';
import LocalImages from '../../constants/localImages';
import {vw, vh} from '../../constants/dimensions';
import Colors from '../../constants/colors';
import ImagePicker from 'react-native-image-picker';
import {Profile, ShowUsers, StickyHeader} from '../../component';

import {color, globalStyle} from '../../utility';
import {Store} from '../../context/store';
import {LOADING_STOP, LOADING_START} from '../../context/actions/type';
import {uuid, smallDeviceHeight} from '../../utility/constants';
import {clearAsyncStorage} from '../../asyncStorage';
import {deviceHeight} from '../../utility/styleHelper/appStyle';
import {UpdateUser, LogOutUser} from '../../network';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from '../../component/profile/styles';
import LinearGradient from 'react-native-linear-gradient';
import { database } from '../../Setup';

const {width, height} = Dimensions.get('window');
export default ({navigation}) => {
  const globalState = useContext(Store);
  const {dispatchLoaderAction} = globalState;
 const [dataSource,setDataSource]=useState([])
  const [userDetail, setUserDetail] = useState({
    id: '',
    name: '',
    profileImg: '',
    mobile:'',
    
  });

  const [allUsers, setAllUsers] = useState([]);
  const {profileImg, name,mobile} = userDetail;
  

  useEffect(() => {
  
    dispatchLoaderAction({
      type: LOADING_START,
    });
    try {

        database()
        .ref('users')
        .on('value', dataSnapshot => {
          let users = [];
          let currentUser = {
            id: '',
            name: '',
            profileImg: '',
            mobile:''
          };
          dataSnapshot.forEach(child => {
            if (uuid === child.val().uuid) {
              currentUser.id = uuid;
              currentUser.name = child.val().name;
              currentUser.profileImg = child.val().profileImg;
              currentUser.mobile = child.val().mobile;
            } else {
              users.push({
                id: child.val().uuid,
                name: child.val().name,
                profileImg: child.val().profileImg,
                mobile: child.val().mobile,
              });
            }
          });
          setUserDetail(currentUser);
          setAllUsers(users);
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
        });
    } catch (error) {
      alert(error);
      dispatchLoaderAction({
        type: LOADING_STOP,
      });
    }
   
  }, 
  
 
[]);

 


  const selectPhotoTapped = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // Base 64 image:
        let source = 'data:image/jpeg;base64,' + response.data;
        dispatchLoaderAction({
          type: LOADING_START,
        });
        UpdateUser(uuid, source)
          .then(() => {
            setUserDetail({
              ...userDetail,
              profileImg: source,
            });
            dispatchLoaderAction({
              type: LOADING_STOP,
            });
          })
          .catch(() => {
            alert(err);
            dispatchLoaderAction({
              type: LOADING_STOP,
            });
          });
      }
    });
  };

  const logout = () => {
    LogOutUser()
      .then(() => {
        clearAsyncStorage()
          .then(() => {
            navigation.replace('Login');
          })
          .catch(err => console.log(err));
      })
      .catch(err => alert(err));
  };

  return (
    <LinearGradient colors={['#25CCF7', '#4834DF']} style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          marginVertical: 30,
          padding: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={LocalImages.BACKARROW}
            style={{
              width: 20,
              height: 20,
              resizeMode: 'contain',
              tintColor: 'white',
            }}
          />
        </TouchableOpacity>

        <Text style={{color: 'white', fontSize: 20, paddingHorizontal: 20}}>
          Profile
        </Text>
      </View>
      <View style={[globalStyle.sectionCentered, styles.container]}>
        <View style={styles.imgContainer}>
          {profileImg ? (
            <Image
              source={{uri: profileImg}}
              style={styles.img}
              resizeMode="cover"
            />
          ) : (
            <View
              style={[
                globalStyle.sectionCentered,
                styles.img,
                {backgroundColor: color.DARK_GRAY},
              ]}>
              <Text style={styles.name}>{name.charAt(0)}</Text>
            </View>
          )}

          <View style={[globalStyle.sectionCentered, styles.editImgContainer]}>
            <FontAwesome5
              name="user-edit"
              size={20}
              onPress={() => selectPhotoTapped()}
              color="white"
            />
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: width,
          borderBottomColor: 'white',
          borderBottomWidth: StyleSheet.hairlineWidth,
          height: vh(60),
        }}>
        <Text
          style={{
            fontSize: 16,
            color: Colors.white,
            paddingTop: 15,
            marginLeft: 10,
          }}>
          {name}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: width,
          borderBottomColor: 'white',
          borderBottomWidth: StyleSheet.hairlineWidth,
          height: vh(60),
        }}>
        <Text
          style={{
            fontSize: 16,
            color: Colors.white,
            paddingTop: 15,
            marginLeft: 10,
          }}>
          {mobile}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: width,
          borderBottomColor: 'white',
          borderBottomWidth: StyleSheet.hairlineWidth,
          height: vh(60),
        }}>
        <Text
          style={{
            fontSize: 16,
            color: Colors.white,
            paddingTop: 15,
            marginLeft: 10,
          }}>
          MeetUp Requested
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: width,
          borderBottomColor: 'white',
          borderBottomWidth: StyleSheet.hairlineWidth,
          height: vh(60),
        }}>
        <Text
          style={{
            fontSize: 16,
            color: Colors.white,
            paddingTop: 15,
            marginLeft: 10,
          }}>
          MeetUp Accepted
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: width,
          borderBottomColor: 'white',
          borderBottomWidth: StyleSheet.hairlineWidth,
          height: vh(60),
        }}>
        <Text
          style={{
            fontSize: 16,
            color: Colors.white,
            paddingTop: 15,
            marginLeft: 10,
          }}>
          Upcoming MeetUps
        </Text>
      </View>

      <TouchableWithoutFeedback
        onPress={logout}
        style={{
          flexDirection: 'row',
          width: width,
          borderBottomColor: 'white',
          borderBottomWidth: StyleSheet.hairlineWidth,
          height: vh(60),
        }}>
        <Text
          style={{
            fontSize: 16,
            color: Colors.white,
            paddingTop: 15,
            marginLeft: 10,
          }}>
          Logout
        </Text>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
};
