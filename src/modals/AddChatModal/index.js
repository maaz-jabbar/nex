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

  const handleNavigation = screen => {
    setVisible(false);
    navigation.navigate(screen);
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
          title="New Chat"
          onPress={() => handleNavigation('Contacts')}
          icon={Images.chat}
          iconStyle={{tintColor: Colors.white}}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
        />
        <GradientButton
          title="Broadcast msg"
          icon={Images.contacts}
          onPress={() => handleNavigation('SelectContacts')}
          iconStyle={{tintColor: Colors.white}}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
        />
      </View>
    </ReactNativeModal>
  );
};

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
  buttonContainer: {
    height: 50,
    justifyContent: 'center',
  },
  button: {
    width: '80%',
  },
});

export default AddChatModal;
