import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import {

  View,
  Text,

  Image,
} from 'react-native';


import {Store} from '../../context/store';
import {LOADING_STOP, LOADING_START} from '../../context/actions/type';
import {uuid, smallDeviceHeight} from '../../utility/constants';

import {database} from '../../Setup';

export default ({navigation}) => {
  const globalState = useContext(Store);
  const {dispatchLoaderAction} = globalState;

  const [userDetail, setUserDetail] = useState({
    id: '',
    name: '',
    profileImg: '',
    mobile:''
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
  }, []);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 3,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 20,
          flexDirection:'row'
        }}>
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            borderColor: 'white',
            borderWidth: 0.2,
           
          }}
       >
          {profileImg ? (
            <Image
              source={{uri: profileImg}}
              style={{width: 60, height: 60, borderRadius: 30,resizeMode:'cover'}}
              resizeMode="cover"
            />
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 30, fontWeight: 'bold'}}>
                {name.charAt(0)}
              </Text>
            </View>
          )}
        </View>
        <View style={{alignItems:'center',paddingHorizontal:20}}>
        <Text
          style={{
            fontSize: 17,
            color: 'white',
            padding: 10,
            textShadowColor: 'black',
            textShadowOffset: {width: 0, height: 2},
          }}>
          {name}
          
        </Text>
        <Text style={{color:'white'}}>{mobile}</Text>
        </View>
       
      
      </View>
    </View>
  );
};
