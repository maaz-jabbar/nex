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
import {ContactCard} from '../../components';
import {Colors, Fonts} from '../../config';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Images from '../../assets';
import {useDispatch} from 'react-redux';
import {
  acceptInvite,
  getUserInvites,
  rejectInvite,
} from '../../redux/middlewares/user';

const NewContactModal = ({isVisible, setVisible}) => {
  const {top} = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [receivedInvites, setReceivedInvites] = useState([]);

  useEffect(() => {
    dispatch(
      getUserInvites(invites => {
        setReceivedInvites(invites);
      }),
    );
  }, [isVisible]);

  const onAcceptInvite = invitationId => {
    dispatch(
      acceptInvite(invitationId, invites => {
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

  return (
    <ReactNativeModal
      isVisible={isVisible}
      onBackdropPress={() => setVisible(false)}
      onBackButtonPress={() => setVisible(false)}
      animationIn="zoomIn"
      animationOut="zoomOut"
      style={[styles.popupModal, {paddingTop: top}]}
      onDismiss={() => setVisible(false)}>
      <View style={styles.popup}>
        <Text style={styles.headerText}>Invites</Text>
        <TouchableOpacity
          onPress={() => setVisible(false)}
          style={styles.closeButton}>
          <Image source={Images.close} style={styles.closeIcon} />
        </TouchableOpacity>

        <FlatList
          data={receivedInvites}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No invites to show</Text>
            </View>
          )}
          renderItem={({item}) => (
            <ContactCard
              onPress={() => viewProfile(item)}
              key={item.invitationId}
              user={{name: item.senderName, userId: item.senderUserId}}
              selectable
              selected
              onSelect={() => onAcceptInvite(item.invitationId)}
              customComp={
                <TouchableOpacity
                  onPress={() => onRejectInvite(item.invitationId)}>
                  <Image source={Images.cross} style={styles.rejectIcon} />
                </TouchableOpacity>
              }
            />
          )}
        />
      </View>
    </ReactNativeModal>
  );
};

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
  headerText: {
    fontFamily: Fonts.RobotoMedium,
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 20,
    color: 'black',
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  closeIcon: {
    tintColor: 'grey',
    height: 25,
    width: 25,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontFamily: Fonts.RobotoRegular,
    color: Colors.black,
    fontSize: 16,
  },
  rejectIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
});

export default NewContactModal;
