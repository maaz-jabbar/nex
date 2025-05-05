import React from 'react';
import {useNavigation} from '@react-navigation/native';
import ReactNativeModal from 'react-native-modal';
import {StyleSheet, View} from 'react-native';
import {GradientButton} from '../../components';
import {Colors, message as inviteMessage} from '../../config';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Images from '../../assets';
import {useSelector} from 'react-redux';
import Share from 'react-native-share';

const AddInvitePopup = ({isVisible, setVisible, setContactModal}) => {
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();

  const moveToContacts = () => {
    setVisible(false);
    setTimeout(() => {
      setContactModal(true);
    }, 500);
  };

  const moveToBroadcastCreation = () => {
    setVisible(false);
    navigation.navigate('SelectContacts');
  };

  const onPressInvite = () => {
    const shareOptions = {
      title: 'INVITE',
      message: inviteMessage,
    };
    const method = Share.open;
    method(shareOptions)
      .then(res => console.log(res))
      .catch(err => err && console.log(err));
  };

  const userType = useSelector(state => state.user?.userType);
  const isSeller = userType !== 'CUSTOMER';

  return (
    <ReactNativeModal
      isVisible={isVisible}
      onBackdropPress={() => setVisible(false)}
      onBackButtonPress={() => setVisible(false)}
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      style={[styles.popupModal, {paddingTop: top + 40}]}
      onDismiss={() => setVisible(false)}>
      <View style={styles.popup}>
        {isSeller && (
          <>
            <GradientButton
              title="New Contact"
              onPress={moveToContacts}
              icon={Images.newContact}
              iconStyle={styles.iconStyle}
              containerStyle={styles.buttonContainer}
              buttonStyle={styles.button}
            />
            <GradientButton
              title="Broadcast"
              icon={Images.broadcast2}
              onPress={moveToBroadcastCreation}
              iconStyle={styles.iconStyle}
              containerStyle={styles.buttonContainer}
              buttonStyle={styles.button}
            />
          </>
        )}
        <GradientButton
          title="Copy Invite Link"
          noGradient
          onPress={onPressInvite}
          icon={Images.link2}
          textStyle={styles.textStyle}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
        />
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  popup: {
    padding: 40,
    backgroundColor: Colors.white,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupModal: {
    justifyContent: 'flex-start',
  },
  iconStyle: {
    tintColor: Colors.white,
  },
  buttonContainer: {
    height: 50,
    justifyContent: 'center',
  },
  button: {
    width: '80%',
  },
  textStyle: {
    color: Colors.black,
  },
});

export default AddInvitePopup;
