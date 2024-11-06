import React from 'react';
import {LayoutAnimation, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../config';

const ToggleButton = ({on = false, onToggle = () => {}}) => {

    const onPress = () => {
        LayoutAnimation.spring();
        onToggle(!on)
    }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={
          on
            ? [Colors.primary, Colors.secondary]
            : [Colors.darkGrey, Colors.darkGrey]
        }
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={[
          styles.container,
          {
            alignItems: on ? 'flex-end' : 'flex-start',
            justifyContent: 'center',
          },
        ]}>
        <View
          style={{
            width: 26,
            height: 26,
            borderRadius: 26 / 2,
            backgroundColor: Colors.white,
          }}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ToggleButton;

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 50,
    borderRadius: 30,
    padding: 2
  },
});
