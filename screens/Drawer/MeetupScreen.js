import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  FlatList,
  PermissionsAndroid,
  
  LayoutAnimation,
  KeyboardAvoidingView,
  SafeAreaView,

} from 'react-native';

import Contacts from 'react-native-contacts';
import {vw, vh} from '../../utility/dimensions';

import {Container, Header, Content, Tab, Tabs, TabHeading} from 'native-base';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import LocalImages from '../../utility/localImages';

import Colors from '../../utility/colors';

import LinearGradient from 'react-native-linear-gradient';

import {LogOutUser} from '../../network';
import {clearAsyncStorage} from '../../asyncStorage';
import {submitUser} from '../../ApiServices';
import SendSMS from 'react-native-sms';
import {database, dynamicLinks} from '../../Setup';

export default class MeetupScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      Id: null,
      title: '',
      modalVisible: false,
      isDateVisible: false,
      isTimeVisible: false,
      choseStartDate: '',
      contactModal: false,
      contactName: '',
      description: '',
      num: '',
      fakeContact: [],
      dataSource: [],
      users: [],
      text: 'Invite',
      search: '',
      contacts: null,
      filterContacts: null,
    };
  }

  // Contact Modal
  setcontactModal = visible => {
    this.setState({contactModal: visible});
  };

  // Lifecycle of Contacts

  // date picker
  handleDatePicker = date => {
    this.setState({
      isDateVisible: false,
      choseStartDate: moment(date).format('MMM D Y'),
    });
  };

  hideDatePicker = () => {
    this.setState({
      isDateVisible: false,
    });
  };

  showDatePicker = () => {
    this.setState({
      isDateVisible: true,
    });
  };

  //time Picker
  handleTimePicker = time => {
    this.setState({
      isTimeVisible: false,
      chosetime: moment(time).format('h: mm a'),
    });
  };

  hideTimePicker = () => {
    this.setState({
      isTimeVisible: false,
    });
  };

  showTimePicker = () => {
    this.setState({
      isTimeVisible: true,
    });
  };
  // clear the text through functions

  clearTitle = e => {
    if (e === this.state.title) {
    }

    this.setState({title: ''});
  };

  handleBackPress() {
    Alert.alert(
      'Meetup',
      'Are you sure want to cancel your meet-up ?',
      [
        {
          text: 'Yes',
          onPress: () => this.handleCancel(),

          style: 'cancel',
        },
        {text: 'No'},
      ],
      // {cancelable: false},
    );
  }
  // logout function
  handleCancel() {
    this.props.navigation.navigate('Dashboard');
  }

  logout = () => {
    LogOutUser()
      .then(() => {
        clearAsyncStorage()
          .then(() => {
            this.props.navigation.replace('Login');
          })
          .catch(err => console.log(err));
      })
      .catch(err => alert(err));
  };

  // save data into the firebase databse

  saveData() {
    const {
      Id,
      title,
      choseStartDate,
      chosetime,
      contactName,
      description,
    } = this.state;
    if (
      !this.state.title ||
      !this.state.choseStartDate ||
      !this.state.chosetime
    ) {
      alert('please filled details');
      return false;
    } else {
      this.setState({
        modalVisible: true,
      });
      setTimeout(() => {
        this.setState({
          modalVisible: false,
        });
      }, 2000);

      submitUser(Id, title, choseStartDate, chosetime, contactName, description)
        .then(result => {
          this.props.navigation.navigate('Meetup');
          this.setState({
            Id: null,
            title: '',
            choseStartDate: '',
            chosetime: '',
            contactName: '',
            description: '',
            num: '',
            expanded: false,
          });
        })
        .catch(err => console.log(err));
    }
  }

  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    this.setState({expanded: !this.state.expanded});
  };

  initiateSMS = item => {
    const url =`Hey ${item.givenName} ${item.familyName}  \n https://flincsapplicationv1.page.link/rniX`
    SendSMS.send(
      {
        // Message body
        body: url,
        // `Hey  
        // would like you to join flincs!  + ${url}`,
        // Recipients Number
        recipients: [item.phoneNumbers[0].number],
        // An array of types
        // "completed" response when using android
        successTypes: ['sent', 'queued'],
      },
      (completed, cancelled, error) => {
        if (completed) {
          console.log('SMS Sent Completed');
        } else if (cancelled) {
          console.log('SMS Sent Cancelled');
        } else if (error) {
          console.log('Some error occured');
        }
      },
    );
  };
  showAlert = item => {
    this.initiateSMS(item);

    //console.log('mytitme', item);
  };

  getUsers = async () => {
    const mydata = await database().ref('users');
    mydata.on('value', datasnap => {
      if (datasnap.val()) {
        this.setState({users: Object.values(datasnap.val())});
      }
    });
  };
  getValue = item => {
    this.setState({contactName: item.name});
    this.setcontactModal(false);
  };

  componentDidMount() {
    this.shareLinkHandle()
    this.getUsers();
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
      }).then(() => {
        this.loadContacts();
      });
    } else {
      this.loadContacts();
    }
  }

  loadContacts = () => {
    Contacts.getAll((err, contacts) => {
      contacts.sort(
        (a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase(),
      );
      //console.log('contacts -> ', contacts);
      if (err === 'denied') {
        alert('Permission to access contacts was denied');
        console.warn('Permission to access contacts was denied');
      } else {
        this.setState({contacts});
        //console.log('contacts', contacts);
      }
    });
  };

  search = text => {
    const phoneNumberRegex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    if (text === '' || text === null) {
      this.loadContacts();
    } else if (phoneNumberRegex.test(text)) {
      Contacts.getContactsByPhoneNumber(text, (err, contacts) => {
        contacts.sort(
          (a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase(),
        );
        this.setState({contacts});
        //console.log('contacts', contacts);
      });
    } else {
      Contacts.getContactsMatchingString(text, (err, contacts) => {
        contacts.sort(
          (a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase(),
        );
        this.setState({contacts});
        //console.log('contacts', contacts);
      });
    }
  };

  renderList = item => {
    return (
      <TouchableOpacity
        onPress={() => this.getValue(item)}
        style={{
          flex: 1,
          borderBottomWidth: 1,
          borderStyle: 'solid',
          borderColor: '#ecf0f1',
          padding: 10,
          marginBottom: 5,
          marginTop: 10,
        }}>
        <Text style={{fontWeight: 'bold', color: '#3399FF'}}>{item.name}</Text>
      </TouchableOpacity>
    );
  };



   shareLinkHandle = async() => {
        try {
          const initialLink = await dynamicLinks().getInitialLink();
          console.log('initialLink', initialLink);
    
          if (initialLink.url !== null) {
            if (initialLink.url === 'https://flincsapplicationv1.page.link/rniX') {
              return alert(initialLink);
            }
          }
        } catch (error) {}
      }
  render() {
    const {choseStartDate, contactModal, chosetime, contactName} = this.state;

    return (
      <LinearGradient colors={['#3399FF', '#4834DF']} style={{flex: 1}}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 0}
          style={styles.container}>
          <View
            style={{
              height: 70,
              flexDirection: 'row',

              paddingTop: 35,
              paddingHorizontal: 5,
            }}>
            <TouchableOpacity onPress={() => this.handleBackPress()}>
              <Image
                source={LocalImages.BACKARROW}
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: 'contain',
                  tintColor: 'black',
                  fontWeight: 'bold',
                  marginLeft: 10,
                  marginTop: 13,
                }}
              />
            </TouchableOpacity>

            <Text
              style={{
                color: '#fff',
                fontSize: 20,
                paddingHorizontal: 20,
                fontWeight: 'bold',
                paddingTop: 10,
              }}>
              Create Meetup
            </Text>
          </View>

          <ScrollView
            style={{
              flex: 1,
              backgroundColor: Colors.white,
              margin: 8,
            }}>
            <View style={styles.rowStyle}>
              <Image
                source={LocalImages.BOOK}
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: 'cover',
                  tintColor: '#3399FF',
                }}
              />
              <TextInput
                maxLength={30}
                placeholder="Add Title"
                placeholderTextColor="#000"
                style={{fontSize: 15, width: vw(200), height: 50}}
                underlineColorAndroid={'transparent'}
                value={this.state.title}
                onChangeText={title => this.setState({title})}
                keyboardType="default"
              />
              <TouchableOpacity onPress={this.clearTitle}>
                <Image
                  source={LocalImages.CLOSE}
                  style={{
                    width: 15,
                    height: 15,
                    resizeMode: 'contain',
                    tintColor: '#3399FF',
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={{flex: 0.2}}>
              <View
                style={{
                  marginHorizontal: 10,
                  borderBottomColor: 'grey',
                  borderBottomWidth: 0.4,
                }}>
                <TouchableOpacity
                  onPress={() => this.setcontactModal(true)}
                  style={{
                    padding: 20,

                    flexDirection: 'row',
                  }}>
                  <Image
                    source={LocalImages.PROFILE}
                    style={{
                      width: 20,
                      height: 20,
                      resizeMode: 'contain',
                      tintColor: '#3399FF',
                    }}
                  />
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: 16,
                      paddingHorizontal: 25,
                    }}>
                    {contactName ? contactName : 'Tap on Contacts'}
                  </Text>
                </TouchableOpacity>
              </View>
              <Modal
                animationType="slide"
                transparent={false}
                visible={contactModal}
                onRequestClose={() => {
                  this.setcontactModal(false);
                }}>
                <View style={styles.centeredViewContact}>
                  <View style={styles.modalViewContact}>
                    <Text
                      onPress={() => {
                        this.setcontactModal(false);
                      }}
                      style={{
                        
                        textAlign: 'right',
                        fontSize: 20,
                        color: 'red',
                        fontWeight: 'bold',
                         paddingVertical:20
                       
                    
                      }}>
                      X
                    </Text>

                    <Container style={{flex: 1}}>
                      <Tabs>
                        <Tab
                          heading={
                            <TabHeading style={{backgroundColor: 'white'}}>
                              <Text style={{color: '#000', fontWeight: 'bold'}}>
                                People on Flincs
                              </Text>
                            </TabHeading>
                          }>
                          <View
                            style={{
                              flex: 0.7,
                              marginBottom: 10,
                              marginVertical: 10,
                            }}>
                            <FlatList
                             showsVerticalScrollIndicator={false}
                              data={this.state.users}
                              renderItem={({item}) => this.renderList(item)}
                              keyExtractor={(item, index) => index}
                            />
                          </View>
                        </Tab>
                        <Tab
                          heading={
                            <TabHeading style={{backgroundColor: 'white'}}>
                              <Text style={{color: '#000', fontWeight: 'bold'}}>
                                Add Contacts
                              </Text>
                            </TabHeading>
                          }>
                          <SafeAreaView style={styles.container}>
                            <View style={styles.container}>
                              <TextInput
                                onChangeText={this.search}
                                placeholder="Search"
                                style={styles.searchStyle}
                              />
                              <FlatList
                                showsVerticalScrollIndicator={false}
                                data={this.state.contacts}
                                renderItem={({item}) => {
                                  return (
                                    <View style={{flex: 1, margin: 10}}>
                                      <View style={styles.divider}>
                                        <View
                                          style={{
                                            flex: 1,
                                            alignItems: 'flex-start',
                                            justifyContent: 'center',
                                          }}>
                                          <Text>{`${item.givenName} ${
                                            item.familyName
                                          }`}</Text>
                                        </View>

                                        <TouchableOpacity
                                          style={styles.heading}
                                           onPress={() => this.showAlert(item)}
                                        >
                                          <Text
                                            style={{
                                              fontSize: 16,
                                              color: 'white',
                                            }}>
                                            {item.givenName
                                              ? 'invite'
                                              : 'Added'}
                                          </Text>
                                        </TouchableOpacity>
                                      </View>
                                    </View>
                                  );
                                }}
                                keyExtractor={item => item.recordID}
                              />
                            </View>
                          </SafeAreaView>
                        </Tab>
                      </Tabs>
                    </Container>
                  </View>
                </View>
              </Modal>
            </View>
            <TouchableOpacity
              onPress={this.showDatePicker}
              style={styles.rowStyle}>
              <Image
                source={LocalImages.CALENDER}
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: 'contain',
                  tintColor: '#3399FF',
                }}
              />
              <Text style={{width: vw(240), fontSize: 15, color: Colors.black}}>
                {choseStartDate ? choseStartDate : 'Pick Date'}
              </Text>
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={this.state.isDateVisible}
              onConfirm={this.handleDatePicker}
              onCancel={this.hideDatePicker}
              minimumDate={new Date()}
              mode={'date'}
              is24Hour={true}
            />
            <View style={{flex: 0.2}}>
              <TouchableOpacity
                onPress={this.showTimePicker}
                style={styles.rowStyle}>
                <Image
                  source={LocalImages.CLOCk}
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: 'contain',
                    tintColor: '#3399FF',
                  }}
                />
                <Text
                  style={{width: vw(240), fontSize: 15, color: Colors.black}}>
                  {chosetime ? chosetime : 'Pick Time'}
                </Text>
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={this.state.isTimeVisible}
                onConfirm={this.handleTimePicker}
                onCancel={this.hideTimePicker}
                mode={'time'}
                is24Hour={true}
              />
            </View>

            <View style={styles.btnTextHolder}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={this.changeLayout}
                style={styles.Btn}>
                <Text style={{color: '#ddd'}}>Add your description</Text>
                {this.state.expanded ? (
                  <Image
                    style={styles.iconStyle}
                    source={require('../../assets/images/up-arrow.png')}
                  />
                ) : (
                  <Image
                    style={styles.iconStyle}
                    source={require('../../assets/images/down-arrow.png')}
                  />
                )}
              </TouchableOpacity>
              <View
                style={{
                  height: this.state.expanded ? null : 0,
                  overflow: 'hidden',
                }}>
                <View
                  style={{
                    width: 350,
                    height: 80,
                    backgroundColor: '#F4F5F6',
                    padding: 5,
                  }}>
                  <TextInput
                    placeholder="Write your description..."
                    multiline
                    numberOfLines={3}
                    underlineColorAndroid={'transparent'}
                    value={this.state.description}
                    onChangeText={description => this.setState({description})}
                    keyboardType="default"
                    autoFocus={true}
                    style={{width: 300, marginHorizontal: 5}}
                  />
                </View>
              </View>
            </View>

            <View style={{flex: 0.2, padding: 10}} />

            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => this.saveData()}
                style={{
                  width: vw(120),
                  height: vh(60),
                  backgroundColor: '#3399FF',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: vh(10),
                  marginBottom: 5,
                  borderRadius: 8,
                }}>
                <Text style={{fontSize: 16, color: Colors.white}}>
                  LET'S MEET
                </Text>
              </TouchableOpacity>
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  this.setcontactModal(false);
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Image
                      source={LocalImages.TICK}
                      style={{width: 45, height: 45, resizeMode: 'contain'}}
                    />
                    <Text style={{paddingTop: 5}}>
                      {' '}
                      Meetup Created Successfully
                    </Text>
                  </View>
                </View>
              </Modal>
             
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
  },

  heading: {
    margin: 15,
    backgroundColor: '#43BE31',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    //height:50,
    marginHorizontal: 0,
    padding: 10,
    borderTopStartRadius: 20,
    borderBottomEndRadius: 20,
  },
  searchStyle: {
    height: 40,
    paddingLeft: 15,
    marginVertical: 20,
    borderRadius: 5,
    width:350,
   
    backgroundColor: '#f4f5f6',
  },
  divider: {
    flex: 1,
    //height:200,
    flexDirection: 'row',
    //padding: 10,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ecf0f1',
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: vh(60),
    alignItems: 'center',
    padding: 15,
    margin: 10,
  },
  dividerStyle: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'grey',
    height: vh(60),
    marginHorizontal: 10,
  },
  centeredView: {
    flex: 1,
   justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    marginTop: 30,
  
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  

  centeredViewContact: {
    flex: 1,
  },
  modalViewContact: {
    flex: 1,

    backgroundColor: '#fff',
    // borderRadius: 10,
    padding:30,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
 



  

  btnTextHolder: {
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 10,
    //marginHorizontal: 18,
    padding: 10,
  },
  iconStyle: {
    width: 16,
    height: 16,
    tintColor: '#3399FF',
  },
  Btn: {
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  heading: {
    margin: 15,
    backgroundColor: '#43BE31',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    //height:50,
    marginHorizontal: 0,
    padding: 10,
    borderTopStartRadius: 20,
    borderBottomEndRadius: 20,
  },


});
