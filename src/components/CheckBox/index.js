import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, Fonts} from '../../config';
import LinearGradient from 'react-native-linear-gradient';
import Images from '../../assets';

const CheckBox = ({
  title,
  size = 26,
  rounded = false,
  isChecked = false,
  setIsChecked = () => {},
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={setIsChecked}
        style={[
          styles.checkbox,
          {
            width: size,
            height: size,
            borderRadius: rounded ? size / 2 : 5,
            borderWidth: isChecked ? 0 : 1,
            backgroundColor: isChecked ? Colors.lightGrey : Colors.white,
          },
        ]}>
        {isChecked && (
          <LinearGradient
            style={[styles.gradientBox, {width: size, height: size}]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={
              isChecked
                ? [Colors.primary, Colors.secondary]
                : [Colors.darkGrey, Colors.darkGrey]
            }>
            <Image
              resizeMode="contain"
              source={Images.delivered}
              style={styles.tick}
            />
          </LinearGradient>
        )}
      </TouchableOpacity>
      {title && <Text style={styles.title}>{title}</Text>}
    </View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10,
  },
  checkbox: {
    overflow: 'hidden',
    borderColor: Colors.lightGrey,
    marginRight: 10,
  },
  gradientBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tick: {
    width: 15,
    height: 20,
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  title: {
    color: Colors.black,
    fontFamily: Fonts.RobotoMedium,
  },
});
