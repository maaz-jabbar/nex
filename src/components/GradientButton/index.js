import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, Fonts} from '../../config';
import LinearGradient from 'react-native-linear-gradient';
import Images from '../../assets';

const GradientButton = ({
  disabled = false,
  icon = null,
  title = '',
  onPress = () => {},
  buttonStyle = {},
  containerStyle = {},
  textStyle = {},
  iconStyle = {},
  indicator = false,
  noGradient = false,
  iconSize = 25,
  customComp = null,
  customIndicatorStyles = {},
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.button, buttonStyle]}>
      <LinearGradient
        colors={
          noGradient
            ? [Colors.transparent, Colors.transparent]
            : [Colors.primary, Colors.secondary]
        }
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={[
          styles.linearGradient,
          !icon && styles.justifyCenter,
          noGradient && styles.border,
          containerStyle,
        ]}>
        {customComp}
        {!!icon && (
          <Image
            source={icon}
            resizeMode="contain"
            style={[{width: iconSize, height: iconSize}, iconStyle]}
          />
        )}
        {!!title && (
          <Text
            numberOfLines={1}
            style={[
              styles.buttonText,
              !icon && styles.noIconTextMargin,
              textStyle,
            ]}>
            {title}
          </Text>
        )}
        {!!indicator && (
          <View style={[styles.indicator, customIndicatorStyles]}>
            <Text
              style={[
                styles.indicatorText,
                {color: noGradient ? Colors.darkerGrey : Colors.secondary},
              ]}>
              {indicator}
            </Text>
          </View>
        )}
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
    paddingHorizontal: 20,
    height: 48,
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: Fonts.RobotoBold,
    marginLeft: 20,
  },
  noIconTextMargin: {
    marginLeft: 0,
  },
  border: {
    borderWidth: 2,
    borderColor: Colors.secondary,
  },
  indicator: {
    backgroundColor: Colors.white,
    height: 20,
    width: 20,
    borderRadius: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorText: {
    fontSize: 16,
    fontFamily: Fonts.RobotoBold,
  },
});
