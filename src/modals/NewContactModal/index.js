import React from 'react';
import {useNavigation} from '@react-navigation/native';
import ReactNativeModal from 'react-native-modal';
import {StyleSheet, Text, View} from 'react-native';
import {GradientButton, TextInputCustom} from '../../components';
import {Colors, Fonts} from '../../config';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Images from '../../assets';

const NewContactModal = ({isVisible, setVisible}) => {
  const {top} = useSafeAreaInsets();
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
        <TextInputCustom title="First Name" />
        <TextInputCustom title="Last Name" />
        <TextInputCustom title="Location" />
        <TextInputCustom title="Phone Number" />
        <GradientButton
          title="Save"
          onPress={() => setVisible(false)}
          buttonStyle={{alignSelf: 'center', width: 150, marginBottom: 0}}
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
    justifyContent: 'center',
  },
  popupModal: {
    justifyContent: 'flex-start',
  },
});
