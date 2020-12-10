

import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import {
  SafeAreaView,
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {Profile, ShowUsers, StickyHeader} from '../../component';


import {Store} from '../../context/store';
import {LOADING_STOP, LOADING_START} from '../../context/actions/type';
import {uuid, smallDeviceHeight} from '../../utility/constants';
import {clearAsyncStorage} from '../../asyncStorage';
import {deviceHeight} from '../../utility/styleHelper/appStyle';
import {UpdateUser, LogOutUser} from '../../network';
import LinearGradient from 'react-native-linear-gradient';
import {vh, vw} from '../../utility/dimensions';
import Colors from '../../utility/colors';
import CalendarScreen from '../../component/CalendarScreen';
import LocalImages from '../../utility/localImages';
import {database} from '../../Setup';
export default ({navigation}) => {
  const globalState = useContext(Store);
  const {dispatchLoaderAction} = globalState;

  const [userDetail, setUserDetail] = useState({
    id: '',
    name: '',
    profileImg: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [getScrollPosition, setScrollPosition] = useState(0);
  const [allUsers, setAllUsers] = useState([]);
  const {profileImg, name} = userDetail;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SimpleLineIcons
          name="logout"
          size={26}
          color={Colors.white}
          style={{right: 10}}
          onPress={() =>
            Alert.alert(
              'Logout',
              'Are you sure to log out',
              [
                {
                  text: 'Yes',
                  onPress: () => logout(),
                },
                {
                  text: 'No',
                },
              ],
              {cancelable: false},
            )
          }
        />
      ),
    });
  }, [navigation]);

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
          };
          dataSnapshot.forEach(child => {
            if (uuid === child.val().uuid) {
              currentUser.id = uuid;
              currentUser.name = child.val().name;
              currentUser.profileImg = child.val().profileImg;
            } else {
              users.push({
                id: child.val().uuid,
                name: child.val().name,
                profileImg: child.val().profileImg,
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
  }, []);



  
  // * LOG OUT
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

  // * ON IMAGE TAP
  const imgTap = (profileImg, name) => {
    if (!profileImg) {
      navigation.navigate('ShowFullImg', {
        name,
        imgText: name.charAt(0),
      });
    } else {
      navigation.navigate('Profile', {name, img: profileImg});
    }
  };


  const getOpacity = () => {
    if (deviceHeight < smallDeviceHeight) {
      return deviceHeight / 4;
    } else {
      return deviceHeight / 6;
    }
  };

  const onNavigate = () => {
    setModalVisible(false, navigation.navigate('CreateMeetUp'));
  };

  const onNavigateGroup = () => {
    setModalVisible(false, navigation.navigate('Group'));
  };
  return (
    <View style={{flex: 1, elevation: 0}}>
      <LinearGradient
        colors={['#25CCF7', '#4834DF']}
        style={styles.linearGradient}>
        {getScrollPosition > getOpacity() && (
          <StickyHeader
            name={name}
            img={profileImg}
            onImgTap={() => imgTap(profileImg, name)}
          />
        )}
        <View
          style={{
            flex: 3,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 60,
          
       
          }}>
          <TouchableOpacity
            style={{width: 150, height: 150, borderRadius: 75,borderColor:'white',borderWidth:0.5}}
            onPress={() => navigation.navigate('Profile')}>
              {profileImg ? (
            <Image
              source={{uri: profileImg}}
              style={{width:150,height:150,borderRadius:75}}
              resizeMode="cover"
            />
          ) : (
            <View
              style={{flex:1,justifyContent: 'center',alignItems:'center'}}>
              <Text style={{fontSize:50,fontWeight:'bold'}}>{name.charAt(0)}</Text>
              
            </View>
          )}
           </TouchableOpacity>
           <Text style={{fontSize: 17, color: 'white', padding: 10,textShadowColor:'black',textShadowOffset:{width:0,height:2}}}>
              {name}
            </Text>
        </View>

        <View style={{flex: 1, alignItems: 'flex-end', paddingEnd: 20}}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.fab}>
            <Text style={styles.fabStyle}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={{height: vh(450), marginHorizontal: 2,}}>
          <CalendarScreen navigation={navigation} />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.modalView}>
            <View style={styles.headerStyle}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  color: Colors.white,
                  paddingHorizontal: 80,
                }}>
                Select an Option
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Image style={styles.closeStyle} source={LocalImages.CLOSE} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalButtonView}>
              <TouchableOpacity onPress={onNavigate} style={{paddingHorizontal: 15,}}>
                <Image
                  source={LocalImages.BAG}
                  style={{
                    width: 25,
                    height: 25,
                    resizeMode: 'contain',
                    tintColor: Colors.lightBlue,
                    marginLeft: 30,
                  }}
                />
                <Text style={{color: Colors.lightBlue, fontSize: 16}}>
                  Create Meet Up
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={onNavigateGroup} style={{paddingHorizontal: 15,}}>
                <Image
                  source={LocalImages.FRIEND}
                  style={{
                    width: 25,
                    height: 25,
                    resizeMode: 'contain',
                    tintColor: Colors.lightBlue,
                    marginLeft: 30,
                  }}
                />
                <Text style={{color: Colors.lightBlue, fontSize: 16}}>
                  Create Group
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // backgroundColor: Colors.white,
  },
  linearGradient: {
    flex: 1,
  },
  textStyle: {
    fontSize: vh(25),
    padding: vw(10),
    color: 'white',
  },
  fab: {
    //margin: 16,
    right: 0,
    bottom: 60,
    backgroundColor: '#2475B0',
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabStyle: {
    fontSize: 30,
    color: 'white',
  },
  modalView: {
    
    position: 'absolute',
    width: '100%',
    height: '22%',
    bottom: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    
  },

  modalButtonView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  headerStyle: {
    width: '100%',
    height: vh(50),
    backgroundColor: Colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },

  closeStyle: {
    width: vw(18),
    height: vh(18),
    resizeMode: 'contain',
    tintColor: 'white',
  },

  ButtonStyle: {
    width: vw(250),
    height: vh(50),
    backgroundColor: Colors.lightBlue,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginLeft: vw(25),
    marginBottom: 20,
    borderRadius: 8,
  },
});
