import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, Fonts} from '../../config';
const ContactAvatar = ({
  contact,
  size = 60,
  displayName = true,
  displayFullLastName,
  containerStyle = {},
  onPress = () => {},
}) => {
  const fisrtName = contact?.name?.split(' ')[0];
  const lastName = contact?.name?.split(' ')[1];
  const storyAvailable = contact?.storyAvailable;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[{alignItems: 'center', marginRight: size / 3}, containerStyle]}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={
          storyAvailable
            ? [Colors.primary, Colors.secondary]
            : [Colors.darkGrey, Colors.darkGrey]
        }
        style={{borderRadius: (size + 4) / 2, padding: 2}}>
        <Image
          source={{uri: contact?.imageLink}}
          resizeMode="cover"
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 2,
            borderColor: Colors.white,
          }}
        />
      </LinearGradient>
      {displayName && (
        <Text numberOfLines={1} style={styles.contactName}>{`${fisrtName} ${
          lastName ? (displayFullLastName ? lastName : lastName[0]) : ''
        }`}</Text>
      )}
    </TouchableOpacity>
  );
};

export default ContactAvatar;

const styles = StyleSheet.create({
  contactName: {
    color: Colors.black,
    fontSize: 13,
    fontFamily: Fonts.RobotoRegular,
    maxWidth: 60,
    textTransform: 'capitalize',
  },
});
