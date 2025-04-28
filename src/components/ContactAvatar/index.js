import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, Fonts} from '../../config';
import {useSelector} from 'react-redux';
import {baseURL} from '../../config/api';
import FastImage from 'react-native-fast-image';

const ContactAvatar = ({
  contact,
  size = 60,
  displayName = true,
  displayFullLastName,
  containerStyle = {},
  onPress = () => {},
  useImageCache = true,
}) => {
  const jwt = useSelector(state => state.user?.user?.jwt);

  const firstName = contact?.name?.split(' ')[0] ?? '';
  const lastName = contact?.name?.split(' ')[1] ?? '';
  const storyAvailable = contact?.storyAvailable;

  const imageUrl = contact?.userId
    ? `${baseURL}/images/upload/${contact.userId}`
    : 'https://thumbs.dreamstime.com/b/person-gray-photo-placeholder-man-shirt-white-background-person-gray-photo-placeholder-man-136701243.jpg';

  const borderRadiusWithPadding = (size + 4) / 2;

  const displayLabel = `${firstName} ${
    lastName ? (displayFullLastName ? lastName : lastName[0]) : ''
  }`;

  const Component = useImageCache ? FastImage : Image;
  const imageSource = {
    uri: imageUrl + (useImageCache ? '' : `?v=${new Date().getTime()}`),
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };
  if (!useImageCache) {
    imageSource.cache = 'reload';
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.container, {marginRight: size / 3}, containerStyle]}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={
          storyAvailable
            ? [Colors.primary, Colors.secondary]
            : [Colors.darkGrey, Colors.darkGrey]
        }
        style={{borderRadius: borderRadiusWithPadding, padding: 2}}>
        <Component
          source={imageSource}
          resizeMode="cover"
          style={[
            styles.avatar,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
            },
          ]}
        />
      </LinearGradient>
      {displayName && (
        <Text numberOfLines={1} style={styles.contactName}>
          {displayLabel}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default ContactAvatar;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  avatar: {
    borderWidth: 2,
    borderColor: Colors.white,
  },
  contactName: {
    color: Colors.black,
    fontSize: 13,
    fontFamily: Fonts.RobotoRegular,
    maxWidth: 60,
    textTransform: 'capitalize',
  },
});
