import React from 'react';
import {useNavigation} from '@react-navigation/native';
import ReactNativeModal from 'react-native-modal';
import {StyleSheet, Text, View} from 'react-native';
import {GradientButton} from '../../components';
import {Colors, Fonts} from '../../config';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Images from '../../assets';
import {useSelector} from 'react-redux';

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

  const userType = useSelector(state => state.user?.userType);
  const isSeller = userType === 'seller';

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
              iconStyle={{tintColor: Colors.white}}
              containerStyle={{height: 50, justifyContent: 'center'}}
              buttonStyle={{width: '80%'}}
            />
            <GradientButton
              title="Broadcast"
              icon={Images.broadcast2}
              onPress={moveToBroadcastCreation}
              iconStyle={{tintColor: Colors.white}}
              containerStyle={{height: 50, justifyContent: 'center'}}
              buttonStyle={{width: '80%'}}
            />
          </>
        )}
        <GradientButton
          title="Copy Invite Link"
          noGradient
          icon={Images.link2}
          textStyle={{color: Colors.black}}
          containerStyle={{height: 50, justifyContent: 'center'}}
          buttonStyle={{width: '80%'}}
        />
      </View>
    </ReactNativeModal>
  );
};

export default AddInvitePopup;

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
});
