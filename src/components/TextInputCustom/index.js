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
            source={Images.eye}
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
            bottom: 22,
            width: 24,
            height: 24,
            tintColor: Colors.lightGrey,
            ...iconStyles,
          }}
        />
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
