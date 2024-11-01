import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import ContactAvatar from '../ContactAvatar';
import {Colors, Fonts} from '../../config';
import {userId} from '../../dummyData';
import Images from '../../assets';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

const BroadcastCard = ({chat}) => {
  const sentByMe = userId === chat.lastMessage.senderId;

  const lastMessageToShow = chat.isTyping ? 'Typing...' : chat.lastMessage.text;
  const lastMessageColor =
    sentByMe && !chat.isTyping ? Colors.darkerGrey : Colors.primary;

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 16,
          color: Colors.black,
          fontFamily: Fonts.RobotoRegular,
          marginBottom: 5,
        }}>
        {chat?.name}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Text
          numberOfLines={2}
          style={{
            flex: 1,
            paddingRight: 30,
            fontSize: 14,
            color: Colors.lightGrey,
            fontFamily: Fonts.RobotoRegular,
          }}>
          {chat.lastMessage?.text}
        </Text>
        <View>
          <Text
            style={{
              fontSize: 14,
              color: Colors.lightGrey,
              fontFamily: Fonts.RobotoRegular,
              textAlign: 'right',
            }}>
            {moment(chat.lastMessage.time).format('DD/MM/YYYY')}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Colors.lightGrey,
              fontFamily: Fonts.RobotoRegular,
              textAlign: 'right',
            }}>
            {moment(chat.lastMessage.time).format('hh:mm a')}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {chat.users?.slice(0, 3)?.map((user, index) => {
          const userTemp = {...user, storyAvailable: false};
          return (
            <ContactAvatar
              key={index}
              contact={userTemp}
              size={30}
              displayName={false}
              containerStyle={{marginRight: -7, zIndex: 99 - index}}
            />
          );
        })}
        {chat.users?.length > 3 && (
          <View
            style={{
              borderRadius: 34 / 2,
              backgroundColor: Colors.white,
              height: 34,
              width: 34,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: -7,
              borderWidth: 2,
              borderColor: Colors.darkGrey,
            }}>
            <Text
              style={{
                color: Colors.darkerGrey,
                fontFamily: Fonts.RobotoRegular,
              }}>
              {chat.users?.length - 3}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default BroadcastCard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  tick: {
    width: 15,
    height: 20,
    resizeMode: 'contain',
    tintColor: Colors.primary,
  },
});
