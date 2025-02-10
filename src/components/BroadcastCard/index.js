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
  const userId = useSelector(state => state.user?.user?.userId);
  const sentByMe = userId === chat?.senderId;
  const [attachmentModal, setAttachmentModal] = React.useState('');
  const jwt = useSelector(state => state.user?.user?.jwt);

  return (
    <>
      <ReactNativeModal
        onBackButtonPress={() => setAttachmentModal('')}
        onBackdropPress={() => setAttachmentModal('')}
        isVisible={!!attachmentModal}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setAttachmentModal('')}
          style={{flex: 1}}>
          <Image
            source={{
              uri: `${baseURL}/images/upload/${attachmentModal}`,
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }}
            resizeMode="contain"
            style={{width: '100%', height: '100%'}}
          />
        </TouchableOpacity>
      </ReactNativeModal>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={styles.container}>
        <Text
          style={{
            fontSize: 16,
            color: Colors.black,
            fontFamily: Fonts.RobotoRegular,
            marginBottom: 5,
          }}>
          {chat?.title}
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
            {chat?.content}
          </Text>
          <View>
            <Text
              style={{
                fontSize: 14,
                color: Colors.lightGrey,
                fontFamily: Fonts.RobotoRegular,
                textAlign: 'right',
              }}>
              {moment(chat?.createdAt).format('DD/MM/YYYY')}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: Colors.lightGrey,
                fontFamily: Fonts.RobotoRegular,
                textAlign: 'right',
              }}>
              {moment(chat?.createdAt).format('hh:mm a')}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {chat?.attachmentId?.length &&
            chat?.attachmentId?.map(data => {
              return (
                <TouchableOpacity
                  onPress={() => setAttachmentModal(data)}
                  activeOpacity={0.8}
                  style={styles.attachment}>
                  <Text style={styles.attachmentTextName}>
                    {data}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
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
