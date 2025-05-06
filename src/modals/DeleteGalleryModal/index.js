import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {GradientButton} from '../../components';
import ReactNativeModal from 'react-native-modal';
import {Colors, Fonts} from '../../config';
import Images from '../../assets';
import {useDispatch} from 'react-redux';
import {deleteGalleryFromServer} from '../../redux/middlewares/gallery';

const DeleteGalleryModal = ({isVisible, setVisible}) => {
  const {top} = useSafeAreaInsets();
  const dispatch = useDispatch();

  const deleteGallery = () => {
    setVisible(false);
    dispatch(deleteGalleryFromServer(isVisible));
  };

  return (
    <ReactNativeModal
      isVisible={!!isVisible}
      onBackdropPress={() => setVisible(false)}
      onBackButtonPress={() => setVisible(false)}
      animationIn="zoomIn"
      animationOut="zoomOut"
      style={[styles.popupModal, {paddingTop: top}]}
      onDismiss={() => setVisible(false)}>
      <View style={styles.popup}>
        <View style={styles.deleteIconCont}>
          <Image source={Images.delete} style={styles.deleteIcon} />
        </View>
        <Text style={styles.areYouSureText}>Are you sure?</Text>
        <Text style={styles.text1}>
          Do you really want to delete this gallery?
        </Text>
        <Text style={styles.text2}>This process cannot be undone</Text>
        <GradientButton
          title="Delete Gallery"
          onPress={deleteGallery}
          buttonStyle={styles.deleteButton}
        />
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  deleteIcon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    tintColor: Colors.primary,
  },
  deleteIconCont: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 50,
  },
  popup: {
    padding: 40,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupModal: {
    justifyContent: 'center',
  },
  areYouSureText: {
    fontFamily: Fonts.RobotoLight,
    fontSize: 22,
    color: Colors.textGrey,
    marginVertical: 20,
  },
  text1: {
    fontFamily: Fonts.RobotoMedium,
    fontSize: 14,
    color: Colors.textGrey,
  },
  text2: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 14,
    color: Colors.textGrey,
    marginBottom: 10,
  },
  deleteButton: {
    alignSelf: 'center',
    width: 150,
    marginTop: 20,
    marginBottom: 0,
  },
});

export default DeleteGalleryModal;
