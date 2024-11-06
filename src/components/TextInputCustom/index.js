import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Colors, Fonts} from '../../config';

const TextInputCustom = ({
  title = '',
  textInputProps = {},
  textInputStyle = {},
  containerStyle = {},
  hideLabel = false,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {!hideLabel && <Text style={styles.title}>{title}</Text>}
      <TextInput
        style={[styles.input, textInputStyle]}
        placeholder={title}
        {...textInputProps}
      />
    </View>
  );
};

export default TextInputCustom;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    height: 48,
    marginVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 48 / 2,
    color: Colors.black,
    fontFamily: Fonts.RobotoMedium,
  },
  title: {
    marginLeft: 10,
    color: Colors.lightGrey,
    fontFamily: Fonts.RobotoMedium,
  },
  container: {marginBottom: 10},
});
