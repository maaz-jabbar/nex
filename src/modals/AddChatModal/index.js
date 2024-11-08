import React from 'react';
import {useNavigation} from '@react-navigation/native';
import ReactNativeModal from 'react-native-modal';
import {StyleSheet, Text, View} from 'react-native';
import {GradientButton} from '../../components';
import {Colors, Fonts} from '../../config';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Images from '../../assets';

const AddChatModal = ({isVisible, setVisible}) => {
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();
  const moveToContacts = () => {
    setVisible(false);
    navigation.navigate('Contacts');
  };

  const moveToBroadcastCreation = () => {
    setVisible(false);
    navigation.navigate('SelectContacts');
  };

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
        <Text style={styles.createChat}>Create Chat or Broadcast</Text>
        <GradientButton
          title="Create Chat"
          onPress={moveToContacts}
          icon={Images.chat}
          iconStyle={{tintColor: Colors.white}}
          containerStyle={{height: 50, justifyContent: 'center'}}
          buttonStyle={{width: '80%'}}
        />
        <GradientButton
          title="Broadcast"
          icon={Images.contacts}
          onPress={moveToBroadcastCreation}
          iconStyle={{tintColor: Colors.white}}
          containerStyle={{height: 50, justifyContent: 'center'}}
          buttonStyle={{width: '80%'}}
        />
      </View>
    </ReactNativeModal>
  );
};

export default AddChatModal;

const styles = StyleSheet.create({
  createChat: {
    fontSize: 20,
    fontFamily: Fonts.RobotoRegular,
    color: Colors.black,
    marginBottom: 20,
  },
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
