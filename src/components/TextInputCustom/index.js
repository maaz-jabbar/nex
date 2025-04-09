import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, Fonts} from '../../config';
import Images from '../../assets';

const TextInputCustom = ({
  title = '',
  textInputProps = {},
  textInputStyle = {},
  containerStyle = {},
  hideLabel = false,
  isPassword = false,
  icon = null,
  iconStyles = {},
  error = '',
}) => {
  const [isSecureText, setIsSecureText] = React.useState(
    textInputProps.secureTextEntry,
  );
  return (
    <View style={[styles.container, containerStyle]}>
      {!hideLabel && <Text style={styles.title}>{title}</Text>}
      <TextInput
        style={[
          styles.input,
          error && {borderColor: Colors.red},
          (isPassword || icon) && {paddingRight: 50},
          textInputStyle,
        ]}
        {...textInputProps}
        secureTextEntry={isSecureText}
      />
      {isPassword && (
        <TouchableOpacity
          onPress={() => setIsSecureText(!isSecureText)}
          style={{position: 'absolute', right: 15, bottom: 22}}
          activeOpacity={0.8}>
          <Image
            source={isSecureText ? Images.eyeOff : Images.eye}
            style={{width: 24, height: 24, tintColor: Colors.lightGrey}}
          />
        </TouchableOpacity>
      )}
      {icon && (
        <Image
          source={icon}
          style={{
            position: 'absolute',
            right: 15,
            top: 37,
            width: 24,
            height: 24,
            tintColor: Colors.lightGrey,
            ...iconStyles,
          }}
        />
      )}
      {error && (
        <Text
          style={{
            color: Colors.red,
            marginBottom: 5,
            marginLeft: 10,
            fontSize: 12,
            fontFamily: Fonts.RobotoRegular,
          }}>
          {error}
        </Text>
      )}
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
