import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ContactAvatar from '../ContactAvatar';
import {Colors, Fonts} from '../../config';

const ContactCard = ({chat}) => {
  return (
    <View style={styles.container}>
      <ContactAvatar contact={chat.user} size={50} displayName={false} />
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 16,
            color: Colors.black,
            fontFamily: Fonts.RobotoRegular,
          }}>
          {chat.user.name}
        </Text>
      </View>
    </View>
  );
};

export default ContactCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
});
