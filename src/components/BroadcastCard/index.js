import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import ContactAvatar from '../ContactAvatar';
import {Colors, Fonts} from '../../config';
import Images from '../../assets';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {useSelector} from 'react-redux';
import ReactNativeModal from 'react-native-modal';
import {baseURL} from '../../config/api';
const {width, height} = Dimensions.get('window');

const BroadcastCard = ({chat, onPress}) => {
  const [attachmentModal, setAttachmentModal] = React.useState('');
  const accessToken = useSelector(state => state.user?.user?.accessToken);

  return (
    <>
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
              uri: `${baseURL}/images/upload/${attachmentModal}`,
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }}
            resizeMode="contain"
            style={styles.attachment1}
          />
        </TouchableOpacity>
      </ReactNativeModal>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={styles.container}>
        <Text style={styles.title}>{chat?.title}</Text>
        <View style={styles.chatContentCont}>
          <Text numberOfLines={2} style={styles.chat}>
            {chat?.content}
          </Text>
          <View>
            <Text style={styles.time}>
              {moment(chat?.createdAt).format('MM/DD/YYYY')}
            </Text>
            <Text style={styles.createdAt}>
              {moment(chat?.createdAt).format('hh:mm a')}
            </Text>
          </View>
        </View>
        <View style={styles.peopleCont}>
          {!!chat?.attachmentId?.length &&
            chat?.attachmentId?.map(data => {
              return (
                <TouchableOpacity
                  onPress={() => setAttachmentModal(data)}
                  activeOpacity={0.8}
                  style={styles.attachment}>
                  <Text style={styles.attachmentTextName}>{data}</Text>
                </TouchableOpacity>
              );
            })}
        </View>
        <View style={styles.peopleCont}>
          {chat?.receiverIds?.slice(0, 3)?.map((user, index) => {
            const userTemp = {userId: user};
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
          {chat?.receiverIds?.length > 3 && (
            <View style={styles.remainingCont}>
              <Text style={styles.remainingText}>
                {chat?.receiverIds?.length - 3}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};

export default BroadcastCard;

const styles = StyleSheet.create({
  remainingText: {
    color: Colors.darkerGrey,
    fontFamily: Fonts.RobotoRegular,
  },
  remainingCont: {
    borderRadius: 34 / 2,
    backgroundColor: Colors.white,
    height: 34,
    width: 34,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: -7,
    borderWidth: 2,
    borderColor: Colors.darkGrey,
  },
  peopleCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  createdAt: {
    fontSize: 14,
    color: Colors.lightGrey,
    fontFamily: Fonts.RobotoRegular,
    textAlign: 'right',
  },
  time: {
    fontSize: 14,
    color: Colors.lightGrey,
    fontFamily: Fonts.RobotoRegular,
    textAlign: 'right',
  },
  chat: {
    flex: 1,
    paddingRight: 30,
    fontSize: 14,
    color: Colors.lightGrey,
    fontFamily: Fonts.RobotoRegular,
  },
  chatContentCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    color: Colors.black,
    fontFamily: Fonts.RobotoRegular,
    marginBottom: 5,
  },
  attachment1: {
    width: '100%',
    height: '100%',
  },
  modalCont: {
    flex: 1,
  },
  container: {
    padding: 10,
  },
  tick: {
    width: 15,
    height: 20,
    resizeMode: 'contain',
    tintColor: Colors.primary,
  },
  attachmentTextName: {
    fontFamily: Fonts.RobotoMedium,
    fontSize: 14,
    color: Colors.black,
  },
  attachment: {
    backgroundColor: '#EAEAEA',
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 20,
    marginBottom: 15,
  },
});
