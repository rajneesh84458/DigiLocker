import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import LocalImages from '../utility/localImages';
import {vw, vh} from '../utility/dimensions';
import Colors from '../utility/colors';

export default class DateTimePickerScreen extends Component {
  constructor() {
    super();
    this.state = {
      isVisible: false,
      chosenDate: '',
    };
  }

  handlePicker = datetime => {
    this.setState({
      isVisible: false,
      chosenDate: moment(datetime).format('MMM D Y HH:mm'),
    });
  };
  hidePicker = () => {
    this.setState({
      isVisible: false,
    });
  };

  showPicker = () => {
    this.setState({
      isVisible: true,
    });
  };
  render() {
    const {chosenDate} = this.state;
    return (
      <View style={{flex:0.2}}>
        <TouchableOpacity onPress={this.showPicker} style={styles.rowStyle}>
          <Image
            source={LocalImages.CALENDER}
            style={{
              width: 20,
              height: 20,
              resizeMode: 'contain',
              tintColor: Colors.lightBlue,
            }}
          />
          <Text style={{width: vw(240), fontSize: 15, color: Colors.grey}}>
            {chosenDate ? this.state.chosenDate : this.props.name}
          </Text>
         
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={this.state.isVisible}
          onConfirm={this.handlePicker}
          onCancel={this.hidePicker}
          mode={this.props.value ? 'date' :'time'}
          is24Hour={true}
          //datePickerModeAndroid = {'spinner'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: vh(60),
    alignItems: 'center',
    padding: 15,
  },
});
