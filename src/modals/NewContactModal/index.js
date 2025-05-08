import React from 'react';
import ReactNativeModal from 'react-native-modal';
import {StyleSheet, Text, View} from 'react-native';
import {GradientButton, TextInputCustom} from '../../components';
import {Colors, Fonts, maskPhoneNumber, phoneRegex} from '../../config';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {saveContact, unmaskPhoneNumber} from '../../redux/middlewares/user';
import {otpError, emailError, passwordError, phoneError, nameError} from '../../config';
import * as EmailValidator from 'email-validator';

const NewContactModal = ({isVisible, setVisible}) => {
  const {top} = useSafeAreaInsets();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [errors, setErrors] = React.useState({
    name: '',
    email: '',
    phone: '',
  });

  const dispatch = useDispatch();

  const addContact = () => {
    const errorsToShow = {}
    if (name.length < 3) errorsToShow.name = nameError;
    if (!EmailValidator.validate(email)) errorsToShow.email = emailError;
    if (!phoneRegex.test(phone)) errorsToShow.phone = phoneError;
    setErrors(errorsToShow);

    if(errorsToShow.name || errorsToShow.email || errorsToShow.phone) return

    dispatch(
      saveContact(
        {
          name,
          email,
          number: unmaskPhoneNumber(phone),
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
          title="Full Name"
          textInputProps={{
            value: name,
            onChangeText: val =>{
              setName(val)
              setErrors({...errors, name: ''})
            },
            maxLength: 35,
          }}
          error={errors.name}
        />
        <TextInputCustom
          title="Email"
          textInputProps={{
            value: email,
            onChangeText: val =>{
              setEmail(val)
              setErrors({...errors, email: ''})
            },
          }}
          error={errors.email}
        />
        <TextInputCustom
          title="Phone Number"
          textInputProps={{
            value: phone,
            onChangeText: val =>{
              setPhone(maskPhoneNumber(val))
              setErrors({...errors, phone: ''})
            },
          }}
          error={errors.phone}
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
