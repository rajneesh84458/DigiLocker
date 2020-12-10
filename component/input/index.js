import React from "react";
import { TextInput, Text } from "react-native";
import styles from "./styles";
import { color } from "../../utility";
import { ScrollView } from "react-native-gesture-handler";
import ShowPassword from "../../screens/AuthStack/ShowPassword";

export default ({
  placeholder,
  inputStyle,
  placeholderTextColor,
  secureTextEntry,
  onChangeText,
  value,
  onSubmitEditing,
  onBlur,
  onFocus,
  numberOfLines,
  autoCaptailize,
  showPassword
  
}) => (

  <TextInput
    style={[styles.input, inputStyle]}
    value={value}
    numberOfLines={numberOfLines}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
    placeholder={placeholder}
    placeholderTextColor={
      placeholderTextColor ? placeholderTextColor : color.GREY
    }
    onSubmitEditing={onSubmitEditing}
    onBlur={onBlur}
    onFocus={onFocus}
    autoCapitalize = {autoCaptailize}
    // showPassword= {placeholder? <ShowPassword/>:null}
  />

);
