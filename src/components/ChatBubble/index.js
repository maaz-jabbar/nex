import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts} from '../../config';
import {userId} from '../../dummyData';
import ContactAvatar from '../ContactAvatar';

const ChatBubble = ({nextChatBySameUser, message}) => {
  const sentByMe = userId === message?.sender?.id;
  return (
    <View
      style={[
        styles.container,
        {
          alignItems: 'flex-end',
          flexDirection: !sentByMe ? 'row' : 'row-reverse',
        },
      ]}>
      {nextChatBySameUser ? (
        <View style={{width: 44}} />
      ) : (
        <ContactAvatar
          containerStyle={sentByMe && {marginRight: 0, marginLeft: 10}}
          size={30}
          displayName={false}
          contact={message?.sender}
        />
      )}
      <View
        style={[
          styles.innerCont,
          {
            alignItems: !sentByMe ? 'flex-start' : 'flex-end',
          },
        ]}>
        <View
          style={{
            backgroundColor: !sentByMe ? Colors.primary : Colors.secondary,
            padding: 10,
            paddingHorizontal: 20,
            borderRadius: 20,
            borderBottomLeftRadius: !sentByMe ? 0 : 20,
            borderBottomRightRadius: !sentByMe ? 20 : 0,
            maxWidth: '80%',
          }}>
          <Text style={styles.text}>{message?.text}</Text>
        </View>
        {!nextChatBySameUser && (
          <Text style={styles.time}>{message?.time}</Text>
        )}
      </View>
    </View>
  );
};

export default ChatBubble;

const styles = StyleSheet.create({
  container: {
    padding: 3,
  },
  innerCont: {flex: 1},
  text: {
    fontFamily: Fonts.RobotoMedium,
    fontSize: 14,
    color: Colors.white,
  },
  time: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 14,
    color: Colors.darkGrey,
    marginTop: 5,
  },
});
