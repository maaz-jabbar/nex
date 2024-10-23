import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, Fonts} from '../../config';
import LinearGradient from 'react-native-linear-gradient';
import Images from '../../assets';

const GradientButton = ({
  icon = null,
  title = '',
  onPress = () => {},
  buttonStyle = {},
  containerStyle = {},
  textStyle = {},
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.button, buttonStyle]}>
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={[styles.linearGradient, containerStyle]}>
        {icon && <Image source={icon} style={{width: 25, height: 25}} />}
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginBottom: 20,
  },
  linearGradient: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 100,
    padding: 20,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: Fonts.RobotoBold,
    marginLeft: 20,
  },
});
