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
  const chatWith = chat?.user?.filter(
    sender => sender.userId !== user?.userId,
  )[0];
  const lastMessageSentByMe = user?.userId === chat?.lastMessage?.senderId;

  const lastMessageToShow = chat?.isTyping
    ? 'Typing...'
    : chat?.lastMessage?.content;
  const lastMessageColor =
    lastMessageSentByMe && !chat?.isTyping ? Colors.darkerGrey : Colors.primary;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.container}>
      <ContactAvatar contact={chatWith} size={50} displayName={false} />
      <View style={styles.flex1}>
        <View style={styles.innerCard}>
          <Text style={styles.name}>{chatWith?.fullName}</Text>
          <Text style={styles.time}>
            {moment(chat?.lastMessage?.timestamp).fromNow()}
          </Text>
        </View>
        <View style={styles.right}>
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
            <View style={styles.row}>
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
                style={styles.unreadCont}>
                <Text style={styles.unReadCount}>{chat?.unReadCount}</Text>
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
  unReadCount: {
    fontSize: 12,
    color: Colors.white,
    fontFamily: Fonts.RobotoRegular,
  },
  unreadCont: {
    height: 20,
    width: 20,
    borderRadius: 20 / 2,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    fontSize: 14,
    color: Colors.lightGrey,
    fontFamily: Fonts.RobotoRegular,
  },
  name: {
    fontSize: 16,
    color: Colors.black,
    fontFamily: Fonts.RobotoRegular,
  },
  innerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  flex1: {
    flex: 1,
  },
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
