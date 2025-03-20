import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import ReactNativeModal from 'react-native-modal';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ContactCard, GradientButton, TextInputCustom} from '../../components';
import {Colors, Fonts} from '../../config';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Images from '../../assets';
import {useDispatch} from 'react-redux';
import {acceptInvite, getUserInvites, rejectInvite} from '../../redux/middlewares/user';

const NewContactModal = ({isVisible, setVisible}) => {
  const {top} = useSafeAreaInsets();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('aaa');
    dispatch(
      getUserInvites(invites => {
        setReceivedInvites(invites);
      }),
    );
  }, [isVisible === true]);

  const onAcceptInvite = invitationId => {
    dispatch(
      acceptInvite(invitationId, invites => {
        console.log("🚀 ~ NewContactModal ~ invites:", invites)
        setReceivedInvites(invites);
      }),
    );
  };
  const onRejectInvite = invitationId => {
    dispatch(
      rejectInvite(invitationId, invites => {
        setReceivedInvites(invites);
      }),
    );
  };

  const [receivedInvites, setReceivedInvites] = useState([]);

  return (
    <ReactNativeModal
      isVisible={isVisible}
      onBackdropPress={() => setVisible(false)}
      onBackButtonPress={() => setVisible(false)}
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      style={[styles.popupModal, {paddingTop: top}]}
      onDismiss={() => setVisible(false)}>
      <View style={styles.popup}>
        <Text
          style={{
            fontFamily: Fonts.RobotoMedium,
            fontSize: 20,
            alignSelf: 'center',
            marginBottom: 20,
            color: 'black',
          }}>
          Invites
        </Text>
        <TouchableOpacity
          onPress={() => setVisible(false)}
          style={{position: 'absolute', right: 15, top: 15}}>
          <Image
            source={Images.close}
            style={{tintColor: 'grey', height: 25, width: 25}}
          />
        </TouchableOpacity>
        <FlatList
          data={receivedInvites}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  marginTop: 100,
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.RobotoRegular,
                    color: Colors.black,
                    fontSize: 16,
                  }}>
                  No invites to show
                </Text>
              </View>
            );
          }}
          renderItem={({item, index}) => {
            return (
              <ContactCard
                onPress={() => viewProfile(item)}
                key={index}
                user={{
                  name: item.senderName,
                  userId: item.senderUserId,
                }}
                selectable
                selected
                onSelect={() => onAcceptInvite(item.invitationId)}
                customComp={
                  <TouchableOpacity
                    onPress={() => onRejectInvite(item?.invitationId)}>
                    <Image
                      source={Images.cross}
                      style={{width: 25, height: 25, resizeMode: 'contain'}}
                    />
                  </TouchableOpacity>
                }
              />
            );
          }}
        />
      </View>
    </ReactNativeModal>
  );
};

export default NewContactModal;

const styles = StyleSheet.create({
  popup: {
    padding: 40,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    borderRadius: 30,
    flex: 1,
  },
  popupModal: {
    justifyContent: 'flex-start',
  },
});
