import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors, Fonts} from '../../config';
import LinearGradient from 'react-native-linear-gradient';

const SelectionPill = ({title, isSelected, onPress}) => {
  const colors = isSelected
    ? [Colors.primary, Colors.secondary]
    : [Colors.white, Colors.white];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.container}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={colors}
        style={[styles.gradient, isSelected && styles.selected]}>
        <Text style={[styles.title, isSelected && {color: Colors.white}]}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default SelectionPill;

const styles = StyleSheet.create({
  selected: {
    borderWidth: 0,
    paddingHorizontal: 22,
    paddingVertical: 12,
  },
  container: {
    borderRadius: 20,
    marginRight: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  gradient: {
    borderWidth: 2,
    borderColor: Colors.secondary,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 14,
    color: Colors.black,
  },
});
