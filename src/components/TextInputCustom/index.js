import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Colors, Fonts} from '../../config';

const TextInputCustom = ({title = '', textInputProps = {}}) => {
  return (
    <View style={{marginBottom: 10}}>
      <Text
        style={{
          marginLeft: 10,
          color: Colors.lightGrey,
          fontFamily: Fonts.RobotoMedium,
        }}>
        {title}
      </Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: Colors.lightGrey,
          height: 48,
          marginVertical: 10,
          paddingHorizontal: 15,
          borderRadius: 48 / 2,
          color: Colors.black,
          fontFamily: Fonts.RobotoMedium,
        }}
        {...textInputProps}
      />
    </View>
  );
};

export default TextInputCustom;

const styles = StyleSheet.create({});
