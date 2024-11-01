import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import ContactAvatar from '../ContactAvatar';
import {Colors, Fonts} from '../../config';
import {userId} from '../../dummyData';
import Images from '../../assets';
import LinearGradient from 'react-native-linear-gradient';

const ChatCard = ({chat}) => {
  const sentByMe = userId === chat.lastMessage.senderId;

  const lastMessageToShow = chat.isTyping ? 'Typing...' : chat.lastMessage.text;
  const lastMessageColor =
    sentByMe && !chat.isTyping ? Colors.darkerGrey : Colors.primary;

  return (
    <View style={styles.container}>
      <ContactAvatar contact={chat.user} size={50} displayName={false} />
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 5,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: Colors.black,
              fontFamily: Fonts.RobotoRegular,
            }}>
            {chat.user.name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Colors.lightGrey,
              fontFamily: Fonts.RobotoRegular,
            }}>
            {chat.lastMessage.time}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 14,
              color: lastMessageColor,
              fontFamily: Fonts.RobotoRegular,
            }}>
            {lastMessageToShow}
          </Text>
          {sentByMe ? (
            <Image
              style={styles.tick}
              source={chat.lastMessage?.isRead ? Images.read : Images.delivered}
            />
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 17,
                  color: lastMessageColor,
                  fontFamily: Fonts.RobotoRegular,
                  marginTop: -3,
                }}>
                {'@ '}
              </Text>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={[Colors.primary, Colors.secondary]}
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 20 / 2,
                  backgroundColor: Colors.primary,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: Colors.white,
                    fontFamily: Fonts.RobotoRegular,
                  }}>
                  {chat.unreadCount}
                </Text>
              </LinearGradient>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default ChatCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  tick: {
    width: 15,
    height: 20,
    resizeMode: 'contain',
    tintColor: Colors.primary,
  },
});
