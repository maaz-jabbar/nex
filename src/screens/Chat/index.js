import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, Fonts} from '../../config';
import Images from '../../assets';
import {ChatBubble, ContactAvatar, GradientButton} from '../../components';
import {chat, myUser} from '../../dummyData';

const Chat = ({route: {params}, navigation}) => {
  const _goBack = () => {
    navigation.goBack();
  };

  const user = params?.user;
  const broadcast = params?.broadcast;
  const isBroadcast = params?.isBroadcast;
  const {top} = useSafeAreaInsets();

  const [message, setMessage] = React.useState('');
  const [chatMessages, setChatMessages] = React.useState(chat);

  const sendMessage = () => {
    if (message === '') return;
    setChatMessages([
      ...chatMessages,
      {
        sender: myUser,
        text: message,
        time: 'Just Now',
        isRead: true,
      },
    ]);
    setMessage('');
  };
  return (
    <View style={[styles.container, {paddingTop: top}]}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.8} onPress={_goBack}>
          <Image
            source={Images.back}
            resizeMode="contain"
            style={styles.backIcon}
          />
        </TouchableOpacity>
        {isBroadcast ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {broadcast?.users?.slice(0, 3)?.map((user, index) => {
              const userTemp = {...user, storyAvailable: false};
              return (
                <ContactAvatar
                  key={index}
                  contact={userTemp}
                  size={30}
                  displayName={false}
                  containerStyle={{marginRight: -15, zIndex: 99 - index}}
                />
              );
            })}
            {broadcast?.users?.length > 3 && (
              <View
                style={{
                  borderRadius: 34 / 2,
                  backgroundColor: Colors.white,
                  height: 34,
                  width: 34,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: -15,
                  borderWidth: 2,
                  borderColor: Colors.darkGrey,
                }}>
                <Text
                  style={{
                    color: Colors.darkerGrey,
                    fontFamily: Fonts.RobotoRegular,
                  }}>
                  {broadcast?.users?.length - 3}
                </Text>
              </View>
            )}
          </View>
        ) : (
          <ContactAvatar contact={user} size={50} displayName={false} />
        )}
        <View
          style={{
            flex: 1,
            paddingLeft: isBroadcast ? 25 : 0,
            paddingRight: 10,
          }}>
          <Text style={styles.username} numberOfLines={1}>
            {isBroadcast ? broadcast?.name : user?.name}
          </Text>
          <Text style={styles.onlineStatus}>Online</Text>
        </View>
        <TouchableOpacity activeOpacity={0.8}>
          <Image
            source={Images.dots}
            resizeMode="contain"
            style={styles.backIcon}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        inverted
        data={chatMessages}
        contentContainerStyle={{
          paddingHorizontal: 20,
          flexDirection: 'column-reverse',
        }}
        style={styles.chat}
        renderItem={({item, index}) => {
          const nextChatBySameUser =
            chat[index + 1]?.sender?.id === item?.sender?.id;
          return (
            <ChatBubble
              message={item}
              nextChatBySameUser={nextChatBySameUser}
              key={index}
            />
          );
        }}
      />
      <View style={styles.sendMessCont}>
        <Image
          source={Images.attachment}
          resizeMode="contain"
          style={styles.backIcon}
        />
        <TextInput
          value={message}
          onChangeText={setMessage}
          style={{
            flex: 1,
            color: Colors.black,
            height: 48,
            fontFamily: Fonts.RobotoRegular,
            paddingHorizontal: 10,
          }}
          placeholder="Type your message here..."
        />
        <GradientButton
          icon={Images.send}
          onPress={sendMessage}
          containerStyle={styles.sendButtonCont}
          buttonStyle={styles.sendButton}
          iconSize={24}
        />
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingVertical: 10,
  },
  backIcon: {
    width: 25,
    height: 25,
    marginRight: 5,
    tintColor: Colors.secondary,
  },
  username: {
    fontSize: 16,
    fontFamily: Fonts.RobotoRegular,
    color: Colors.black,
    marginBottom: 3,
  },
  onlineStatus: {
    fontSize: 14,
    fontFamily: Fonts.RobotoRegular,
    color: Colors.primary,
  },
  chat: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  sendMessCont: {
    padding: 10,
    paddingVertical: 5,
    margin: 10,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  sendButton: {
    marginBottom: 0,
    width: undefined,
  },
  sendButtonCont: {
    height: 40,
    width: 40,
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});
