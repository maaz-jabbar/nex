import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, Fonts} from '../../config';
import {userId} from '../../dummyData';
import ContactAvatar from '../ContactAvatar';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {baseURL} from '../../config/api';
import ReactNativeModal from 'react-native-modal';

const ChatBubble = ({nextChatBySameUser, message, sender}) => {
  const user = useSelector(state => state.user?.user);
  const sentByMe = user?.userId === message?.senderId;
  const accessToken = useSelector(state => state.user?.user?.accessToken);

  const [attachmentModal, setAttachmentModal] = React.useState('');

  return (
    <View
      style={[
        styles.container,
        {
          alignItems: 'flex-end',
          flexDirection: !sentByMe ? 'row' : 'row-reverse',
        },
      ]}>
      <ReactNativeModal
        onBackButtonPress={() => setAttachmentModal('')}
        onBackdropPress={() => setAttachmentModal('')}
        isVisible={!!attachmentModal}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setAttachmentModal('')}
          style={styles.modalCont}>
          <Image
            source={{
              uri: attachmentModal,
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }}
            resizeMode="contain"
            style={styles.attachment1}
          />
        </TouchableOpacity>
      </ReactNativeModal>
      {nextChatBySameUser ? (
        <View style={{width: 44}} />
      ) : (
        <ContactAvatar
          containerStyle={sentByMe && {marginRight: 0, marginLeft: 10}}
          size={30}
          displayName={false}
          contact={sentByMe ? user : sender}
        />
      )}
      <View
        style={[
          styles.innerCont,
          {
            alignItems: !sentByMe ? 'flex-start' : 'flex-end',
          },
        ]}>
        <View>
          {!!message?.attachments?.length &&
            message?.attachments?.map(asset => {
              const uri = `${baseURL}/images/upload/${asset}`;
              return (
                <TouchableOpacity
                  key={asset}
                  onPress={() => setAttachmentModal(uri)}
                  activeOpacity={0.8}>
                  <Image
                    source={{
                      uri,
                      headers: {Authorization: `Bearer ${accessToken}`},
                    }}
                    style={styles.attachment}
                  />
                </TouchableOpacity>
              );
            })}
          {!!message?.content && <View
            style={{
              backgroundColor: !sentByMe
                ? Colors.primaryOpacity
                : Colors.secondaryOpacity,
              padding: 10,
              paddingHorizontal: 20,
              borderRadius: 20,
              borderBottomLeftRadius: !sentByMe ? 0 : 20,
              borderBottomRightRadius: !sentByMe ? 20 : 0,
              maxWidth: '80%',
            }}>
            <Text style={styles.text}>{message?.content}</Text>
          </View>}
        </View>
        {!nextChatBySameUser && (
          <Text style={styles.time}>
            {moment(message?.timestamp).fromNow()}
          </Text>
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
  attachment: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  attachment1: {
    width: '100%',
    height: '100%',
  },
});
