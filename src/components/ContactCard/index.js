import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ContactAvatar from '../ContactAvatar';
import {Colors, Fonts} from '../../config';
import CheckBox from '../CheckBox';

const ContactCard = ({
  user,
  onPress,
  selectable = false,
  selected = false,
  onSelect = () => {},
  customComp = null
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.container}>
      <ContactAvatar
        onPress={onPress}
        contact={user}
        size={50}
        displayName={false}
      />
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
            flex: 1,
            fontFamily: Fonts.RobotoRegular,
          }}>
          {user?.name}
        </Text>
        {selectable && (
          <CheckBox isChecked={selected} setIsChecked={onSelect} rounded />
        )}
        {customComp}
      </View>
    </TouchableOpacity>
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
