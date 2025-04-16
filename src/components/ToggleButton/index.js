import React from 'react';
import {
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../config';

const ToggleButton = ({on = false, onToggle = () => {}}) => {
  const onPress = () => {
    LayoutAnimation.spring();
    onToggle(!on);
  };

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
          {alignItems: on ? 'flex-end' : 'flex-start'},
        ]}>
        <View style={styles.toggleCircle} />
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
    padding: 2,
    justifyContent: 'center',
  },
  toggleCircle: {
    width: 26,
    height: 26,
    borderRadius: 13, // Using a single radius instead of dividing by 2
    backgroundColor: Colors.white,
  },
});
