import React, {useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, Fonts} from '../../config';
import Images from '../../assets';
import {ChatBubble, ContactAvatar, GradientButton} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {getMessages, sendMessageAsync} from '../../redux/middlewares/chat';

const Chat = ({route: {params}, navigation}) => {
  const dispatch = useDispatch();
  const _goBack = () => {
    navigation.goBack();
  };
  const [loader, setLoader] = React.useState(true);
  const [sending, setSending] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [chatMessages, setChatMessages] = React.useState([]);

  const user = useSelector(state => state.user?.user);
  const conversation = params?.conversation;
  const broadcast = params?.broadcast;
  const isBroadcast = params?.isBroadcast;
  const chatWith = conversation?.user?.filter(
    sender => sender.userId !== user?.userId,
  )[0];
  const {top} = useSafeAreaInsets();

  const getAll = () => {
    setLoader(false);
    dispatch(
      getMessages(
        conversation?.conversationId,
        chatMessages.length,
        messages => {
          setChatMessages(messages);
          setLoader(false);
        },
      ),
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      getAll();
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const sendMessage = () => {
    if (message === '') return;
    const messageObj = {
      conversationId: conversation?.conversationId,
      content: message,
      senderId: user?.userId,
    };
    setSending(true);
    setMessage('');
    dispatch(sendMessageAsync(messageObj, () => setSending(false)));
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
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {broadcast?.users?.slice(0, 3)?.map((user, index) => {
              return (
                <ContactAvatar
                  key={index}
                  contact={user}
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
          <ContactAvatar contact={chatWith} size={50} displayName={false} />
        )}
        <View
          style={{
            flex: 1,
            paddingLeft: isBroadcast ? 25 : 0,
            paddingRight: 10,
          }}>
          <Text style={styles.username} numberOfLines={1}>
            {isBroadcast ? broadcast?.name : chatWith?.fullName}
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

      {loader ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <FlatList
          inverted
          data={chatMessages}
          extraData={chatMessages}
          keyExtractor={item =>
            item?.messageId?.toString() || item?.timestamp?.toString()
          }
          contentContainerStyle={{
            paddingHorizontal: 20,
            flexDirection: 'column-reverse',
          }}
          style={styles.chat}
          renderItem={({item, index}) => {
            const nextChatBySameUser =
              chatMessages[index + 1]?.senderId === item?.senderId;
            return (
              <ChatBubble
                sender={chatWith}
                message={item}
                nextChatBySameUser={nextChatBySameUser}
              />
            );
          }}
        />
      )}

      <View style={styles.sendMessCont}>
        <Image
          source={Images.attachment}
          resizeMode="contain"
          style={styles.backIcon}
        />
        <TextInput
          value={message}
          onChangeText={setMessage}
          style={styles.textInput}
          placeholderTextColor={Colors.darkerGrey}
          placeholder="Type your message here..."
        />
        <GradientButton
          icon={sending ? null : Images.send}
          customComp={
            sending ? <ActivityIndicator color={Colors.white} /> : null
          }
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
  textInput: {
    flex: 1,
    color: Colors.black,
    height: 48,
    fontFamily: Fonts.RobotoRegular,
    paddingHorizontal: 10,
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
