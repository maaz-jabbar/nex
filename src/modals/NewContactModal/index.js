import React from 'react';
import ReactNativeModal from 'react-native-modal';
import {StyleSheet, Text, View} from 'react-native';
import {GradientButton, TextInputCustom} from '../../components';
import {Colors, Fonts} from '../../config';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {saveContact} from '../../redux/middlewares/user';

const NewContactModal = ({isVisible, setVisible}) => {
  const {top} = useSafeAreaInsets();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');

  const dispatch = useDispatch();

  const addContact = () => {
    if (!name || !email || !phone) {
      return;
    }
    dispatch(
      saveContact(
        {
          name,
          email,
          number: phone,
        },
        () => {
          setVisible(false);
          setName('');
          setEmail('');
          setPhone('');
        },
      ),
    );
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
        <TextInputCustom
          title="First Name"
          textInputProps={{
            value: name,
            onChangeText: setName,
          }}
        />
        <TextInputCustom
          title="Email"
          textInputProps={{
            value: email,
            onChangeText: setEmail,
          }}
        />
        <TextInputCustom
          title="Phone Number"
          textInputProps={{
            value: phone,
            onChangeText: setPhone,
          }}
        />
        <GradientButton
          title="Save"
          onPress={addContact}
          buttonStyle={styles.saveButton}
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
    justifyContent: 'center',
  },
  popupModal: {
    justifyContent: 'flex-start',
  },
  saveButton: {
    alignSelf: 'center',
    width: 150,
    marginBottom: 0,
  },
});

export default NewContactModal;
