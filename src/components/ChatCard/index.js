import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import ContactAvatar from '../ContactAvatar';
import {Colors, Fonts} from '../../config';
import {userId} from '../../dummyData';
import Images from '../../assets';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {baseURL} from '../../config/api';
import moment from 'moment';

const ChatCard = ({chat, onPress}) => {
  const user = useSelector(state => state.user?.user);
  console.log("🚀 ~ ChatCard ~ user:", user)
  const chatWith = chat?.user?.filter(sender => sender.userId !== user?.userId)[0];
  const lastMessageSentByMe = user?.userId === chat?.lastMessage?.senderId;

  const lastMessageToShow = chat?.isTyping
    ? 'Typing...'
    : chat?.lastMessage?.content;
  const lastMessageColor =
    lastMessageSentByMe && !chat?.isTyping ? Colors.darkerGrey : Colors.primary;

  const contact = {
    name: chatWith?.fullName,
    storyAvailable: false,
    imageLink: baseURL + '/' + chatWith?.imageId + '.png',
  };
  console.log("🚀 ~ ChatCard ~ contact.imageLink:", contact.imageLink)

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.container}>
      <ContactAvatar contact={contact} size={50} displayName={false} />
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
            {chatWith?.fullName}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Colors.lightGrey,
              fontFamily: Fonts.RobotoRegular,
            }}>
            {moment(chat?.lastMessage?.timestamp).fromNow()}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 14,
              flex: 1,
              paddingRight: 10,
              color: lastMessageColor,
              fontFamily: Fonts.RobotoRegular,
            }}>
            {lastMessageToShow}
          </Text>
          {lastMessageSentByMe ? (
            <Image
              style={styles.tick}
              source={
                chat?.lastMessage?.isRead ? Images.read : Images.delivered
              }
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
                  {chat?.unReadCount}
                </Text>
              </LinearGradient>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
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
