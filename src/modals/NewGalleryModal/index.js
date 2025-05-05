import React, {useEffect, useState, useCallback} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {GradientButton, TextInputCustom, ToggleButton} from '../../components';
import ReactNativeModal from 'react-native-modal';
import {
  Colors,
  descriptionError,
  Fonts,
  imageError,
  nameError,
} from '../../config';
import LinearGradient from 'react-native-linear-gradient';
import Images from '../../assets';
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadMedia} from '../../redux/middlewares/chat';
import {useDispatch, useSelector} from 'react-redux';
import {createGallery, putGallery} from '../../redux/middlewares/gallery';
import {baseURL} from '../../config/api';

const NewGalleryModal = ({
  isVisible,
  setVisible,
  data = null,
  showDeleteGalleryModal = () => null,
}) => {
  const {top} = useSafeAreaInsets();
  const [name, setName] = useState(data?.name || '');
  const [description, setDescription] = useState(data?.description || '');
  const [notifications, setNotifications] = useState(false);
  const [imagePicked, setImagePicked] = useState(data?.coverImage || null);
  const agentProfileId = useSelector(state => state.user?.profile?.profileId);
  const accessToken = useSelector(state => state?.user?.user?.accessToken);
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    imagePicked: '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setImagePicked(data?.coverImage || null);
    setName(data?.name || '');
    setDescription(data?.description || '');
    setErrors({
      name: '',
      description: '',
      imagePicked: '',
    });
    return () => {
      emptyData();
    };
  }, [data]);

  const emptyData = () => {
    setImagePicked(null);
    setName('');
    setDescription('');
    setErrors({
      name: '',
      description: '',
      imagePicked: '',
    });
  };

  const addGallery = useCallback(() => {
    const errorsToShow = {};
    if (name.length < 3) errorsToShow.name = nameError;
    if (!description) errorsToShow.description = descriptionError;
    if (!imagePicked) errorsToShow.imagePicked = imageError;
    setErrors(errorsToShow);

    if (
      errorsToShow.name ||
      errorsToShow.description ||
      errorsToShow.imagePicked
    )
      return;

    dispatch(
      uploadMedia(
        {uri: imagePicked, type: 'image/*', name: Date.now()?.toString()},
        coverImage => {
          const body = {name, description, coverImage, agentProfileId};
          dispatch(createGallery(body));
        },
      ),
    );
    setVisible(false);
    emptyData();
  }, [imagePicked, name, description, agentProfileId, dispatch, setVisible]);

  const updateGallery = useCallback(() => {
    if (!imagePicked || !name || !description) return;

    const coverImage =
      imagePicked === data?.coverImage ? data?.coverImage : imagePicked;
    dispatch(
      uploadMedia(
        {uri: coverImage, type: 'image/*', name: Date.now()?.toString()},
        updatedCoverImage => {
          const body = {name, description, coverImage: updatedCoverImage};
          dispatch(putGallery(data?.galleryId, body));
        },
      ),
    );
    setVisible(false);
    emptyData();
  }, [imagePicked, name, description, data, dispatch, setVisible]);

  const pickImage = () => {
    launchImageLibrary(
      {
        maxHeight: 400,
        maxWidth: 400,
      },
      result => {
        if (result?.assets?.length) {
          setImagePicked(result?.assets[0]?.uri);
          setErrors({...errors, imagePicked: ''});
        }
      },
    );
  };

  return (
    <ReactNativeModal
      isVisible={isVisible}
      onBackdropPress={() => {
        setVisible(false);
        emptyData();
      }}
      onBackButtonPress={() => {
        setVisible(false);
        emptyData();
      }}
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      style={[styles.popupModal, {paddingTop: top + 40}]}
      onDismiss={() => {
        setVisible(false);
        emptyData();
      }}>
      <View style={styles.popup}>
        <TextInputCustom
          title="Gallery Name"
          textInputProps={{
            value: name,
            onChangeText: val => {
              setName(val);
              setErrors({...errors, name: ''});
            },
            maxLength: 70,
          }}
          error={errors.name}
        />
        <TextInputCustom
          title="Description"
          textInputStyle={{
            height: 130,
            textAlignVertical: 'top',
            paddingTop: 10,
          }}
          textInputProps={{
            value: description,
            multiline: true,
            onChangeText: val => {
              setDescription(val);
              setErrors({...errors, description: ''});
            },
          }}
          error={errors.description}
        />
        <View style={styles.listItem}>
          <Text style={styles.listTitle}>Notifications</Text>
          <ToggleButton on={notifications} onToggle={setNotifications} />
        </View>
        {imagePicked ? (
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[Colors.primary, Colors.secondary]}
            style={{
              borderRadius: 54 / 2,
              padding: 2,
              alignSelf: 'flex-start',
            }}>
            <Image
              source={{
                uri: isNaN(imagePicked)
                  ? imagePicked
                  : `${baseURL}/images/upload/${imagePicked}`,
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }}
              resizeMode="cover"
              style={{
                width: 50,
                height: 50,
                borderRadius: 50 / 2,
                borderWidth: 2,
                borderColor: Colors.white,
              }}
            />
            <TouchableOpacity
              onPress={() => setImagePicked(null)}
              activeOpacity={0.8}
              style={styles.crossCont}>
              <Image
                source={Images.cross}
                resizeMode="contain"
                style={styles.cross}
              />
            </TouchableOpacity>
          </LinearGradient>
        ) : (
          <TouchableOpacity
            onPress={pickImage}
            style={{
              height: 54,
              width: 54,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'flex-start',
            }}>
            <Image
              source={Images.plus}
              resizeMode="contain"
              style={{
                width: 35,
                height: 35,
                borderRadius: 35 / 2,
                borderWidth: 2,
                borderColor: Colors.secondary,
                tintColor: Colors.secondary,
              }}
            />
          </TouchableOpacity>
        )}
        {!!errors.imagePicked && (
          <Text style={styles.error}>{errors.imagePicked}</Text>
        )}
        <GradientButton
          title={data ? 'Update' : 'Create'}
          onPress={data ? updateGallery : addGallery}
          buttonStyle={{alignSelf: 'center', width: 150, marginTop: 20}}
        />
        <Text
          onPress={() => {
            setVisible(false);
            emptyData();
            if (data) {
              showDeleteGalleryModal(data?.galleryId);
            }
          }}
          style={styles.cancelButton}>
          {data ? 'Delete Gallery' : 'Cancel'}
        </Text>
      </View>
    </ReactNativeModal>
  );
};

export default NewGalleryModal;

const styles = StyleSheet.create({
  cancelButton: {
    fontFamily: Fonts.RobotoMedium,
    color: Colors.black,
    fontSize: 16,
    alignSelf: 'center',
  },
  error: {
    color: Colors.red,
    marginBottom: 5,
    marginLeft: 10,
    fontSize: 12,
    fontFamily: Fonts.RobotoRegular,
  },
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
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    marginBottom: 12,
  },
  listTitle: {
    fontFamily: Fonts.RobotoMedium,
    fontSize: 14,
    color: Colors.black,
  },
  crossCont: {
    position: 'absolute',
    right: -5,
    top: -5,
  },
  cross: {
    width: 22,
    height: 22,
  },
});
