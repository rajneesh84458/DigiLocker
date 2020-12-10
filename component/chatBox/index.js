import React from 'react';
import {View, Text, Image} from 'react-native';
import {Card, CardItem} from 'native-base';
import {deviceWidth} from '../../utility/styleHelper/appStyle';
import {uuid} from '../../utility/constants';
import styles from './styles';
import {color} from '../../utility';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Snackbar from 'react-native-snackbar';
import { database } from '../../Setup';


const ChatBox = ({userId, msg, img, onImgTap, createdAt}) => {
  let isCurrentUser = userId === uuid ? true : false;

 const  deleteUser = (userId) => {
    database()
      .ref('messages/' +userId)
      .remove()
      .then(() => {
        Snackbar.show({
                      text: 'deleted Successfully',
                      duration: Snackbar.LENGTH_SHORT,
                    });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Card
      transparent
      style={{
        maxWidth: deviceWidth / 2 + 10,
        alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
      }}>
      <View
        style={[
          styles.chatContainer,
          isCurrentUser && {
          //backgroundColor: color.DARK_GRAY,
          },
        ]}>
        {img ? (
          <CardItem cardBody>
            <View style={{height: 220, width: deviceWidth / 2,backgroundColor:'#fff'}}>
                <TouchableOpacity onPress={onImgTap}>
              <Image
                source={{uri: img}}
                resizeMode="cover"
                style={{height: 200, width: deviceWidth / 2}}
              />
            </TouchableOpacity>
            <Text style={{fontSize:10,color:'green',textAlign:'right'}}>{createdAt}</Text>
            </View>
          </CardItem>
        ) : (
          <TouchableOpacity onPress={()=>deleteUser(userId)}
          style={[styles.chatTxt, isCurrentUser && {color: color.WHITE}]}>
            <Text>{msg}</Text>
            <Text style={{fontSize:10,color:'green',textAlign:'right'}}>{createdAt}</Text>
          </TouchableOpacity>
        )}
      </View>
    </Card>
  );
};

export default ChatBox;
