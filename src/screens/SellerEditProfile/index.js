import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Linking,
  StyleSheet,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import {errorToast} from '../../config/api';
import {uploadMedia} from '../../redux/middlewares/chat';
import {updateSellerProfile, updateSeller} from '../../redux/middlewares/user';
import {saveUser} from '../../redux/actions/UserActions';
import LinearGradient from 'react-native-linear-gradient';
import {GradientButton, TextInputCustom, ContactAvatar} from '../../components';
import {Colors, Fonts} from '../../config';
import Images from '../../assets';

const urlRegex =
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;

const SellerEditProfile = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user?.user);
  const profile = useSelector(state => state.user?.profile);
  const {top} = useSafeAreaInsets();

  const [linkAdd, setLinkAdd] = React.useState(false);
  const [links, setLinks] = React.useState(profile?.links || []);
  const [name, setName] = React.useState(user?.fullName);
  const [bio, setBio] = React.useState(profile?.bio);
  const [phone, setPhone] = React.useState(user?.mobileNumber);
  const [email, setEmail] = React.useState(user?.email);
  const [link, setLink] = React.useState('');
  const [image, setImage] = React.useState('');

  const _goBack = () => {
    navigation.goBack();
  };

  const pickImage = async () => {
    const options = {
      mediaType: 'photo',
      maxHeight: 400,
      maxWidth: 400,
    };
    const source = await launchImageLibrary(options);
    setImage(source?.assets[0]?.uri);
  };

  const onPressSaveLink = () => {
    if (urlRegex.test(link)) {
      setLinks([...links, link]);
      setLink('');
      setLinkAdd(false);
    } else errorToast({message: 'Please provide a valid link'});
  };

  const onPressSave = () => {
    if (!name || !phone || !email)
      return errorToast({message: 'Please fill all the fields'});

    if (
      user?.fullName === name &&
      user?.mobileNumber === phone &&
      user?.email === email &&
      image === '' &&
      JSON.stringify(profile?.links) === JSON.stringify(links) &&
      bio === profile?.bio
    ) {
      navigation.goBack();
    } else {
      if (image) {
        dispatch(
          uploadMedia(
            {
              uri: image,
              type: 'image/' + image?.slice(image?.lastIndexOf('.') + 1),
              name: user?.userId?.toString(),
            },
            () => {
              navigation.goBack();
              setImage('');
              const userId = user?.userId;
              dispatch(saveUser({...user, userId: null}));
              setTimeout(() => {
                dispatch(saveUser({...user, userId: userId}));
              }, 1000);
            },
            user?.userId,
          ),
        );
      }

      if (
        user?.fullName !== name ||
        user?.mobileNumber !== phone ||
        user?.email !== email
      ) {
        const data = {};
        if (user?.fullName !== name) data.fullName = name;
        if (user?.mobileNumber !== phone) data.mobileNumber = phone;
        if (user?.email !== email) data.email = email;
        dispatch(updateSeller(data, () => navigation.goBack()));
      }

      if (
        JSON.stringify(profile?.links) !== JSON.stringify(links) ||
        bio !== profile?.bio
      ) {
        dispatch(
          updateSellerProfile(links, bio, () => {
            navigation.goBack();
          }),
        );
      }
    }
  };

  return (
    <View style={[styles.container, {paddingTop: top}]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={_goBack}
          activeOpacity={0.8}
          style={styles.backButton}>
          <Image source={Images.back} style={styles.backIcon} />
          <Text style={styles.back}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>
        <TouchableOpacity
          onPress={_goBack}
          activeOpacity={0.8}
          style={styles.backButton}>
          <Text style={styles.back}>Logout</Text>
          <Image source={Images.logout} style={styles.logoutIcon} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.lowerContentContainer}>
        <View style={styles.info}>
          <View style={styles.avatarContainer}>
            {image ? (
              <View style={styles.avatarWrapper}>
                <Image style={styles.avatarImage} source={{uri: image}} />
              </View>
            ) : (
              <ContactAvatar
                contact={user}
                displayName={false}
                size={120}
                containerStyle={styles.contactAvatar}
              />
            )}
            <GradientButton
              icon={Images.camera}
              onPress={pickImage}
              containerStyle={styles.cameraButtonCont}
              buttonStyle={styles.cameraButton}
              iconSize={18}
            />
          </View>
          <TextInputCustom
            title="Name"
            textInputProps={{value: name, onChangeText: setName}}
          />
          <TextInputCustom
            title="Phone Number"
            textInputProps={{value: phone, onChangeText: setPhone}}
          />
          <TextInputCustom
            title="Email"
            textInputProps={{value: email, onChangeText: setEmail}}
          />
          <TextInputCustom
            title="Bio"
            textInputProps={{multiline: true, value: bio, onChangeText: setBio}}
            textInputStyle={styles.bioInput}
          />
          {links.map((link, index) => (
            <GradientButton
              key={index}
              noGradient
              onPress={() => Linking.openURL(link)}
              icon={Images.link}
              iconSize={20}
              iconStyle={styles.linkIcon}
              title={link}
              textStyle={styles.linkText}
              buttonStyle={styles.linkButton}
              containerStyle={styles.linkContainer}
            />
          ))}
          <GradientButton
            noGradient
            icon={Images.plus2}
            iconSize={20}
            title="Add Link"
            onPress={() => setLinkAdd(true)}
            textStyle={styles.addLinkText}
            buttonStyle={styles.addLinkButton}
            containerStyle={styles.addLinkContainer}
          />
          {linkAdd && (
            <View style={styles.linkInputContainer}>
              <TextInputCustom
                textInputProps={{value: link, onChangeText: setLink}}
                containerStyle={styles.linkInput}
                title="Link"
                icon={Images.link}
              />
              <GradientButton
                icon={Images.check}
                iconStyle={styles.checkIcon}
                onPress={onPressSaveLink}
                containerStyle={styles.saveLinkButtonCont}
                buttonStyle={styles.saveLinkButton}
                iconSize={24}
              />
            </View>
          )}
        </View>
        <GradientButton
          title="Save"
          buttonStyle={styles.saveButton}
          onPress={onPressSave}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  lowerContentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    color: Colors.black,
    fontSize: 24,
    fontFamily: Fonts.RobotoBold,
    marginLeft: 10,
  },
  backIcon: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  logoutIcon: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  back: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 15,
    color: Colors.black,
  },
  info: {},
  avatarContainer: {
    alignSelf: 'center',
  },
  avatarWrapper: {
    padding: 2,
    height: 124,
    width: 124,
    borderRadius: 62,
    backgroundColor: Colors.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  contactAvatar: {
    marginRight: 0,
    zIndex: 99,
  },
  cameraButtonCont: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  cameraButton: {
    position: 'absolute',
    right: 0,
    zIndex: 99,
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  linkIcon: {
    tintColor: Colors.secondary,
  },
  linkText: {
    color: Colors.secondary,
    flex: 1,
    marginLeft: 10,
  },
  linkButton: {
    marginBottom: 0,
  },
  linkContainer: {
    borderWidth: 0,
    height: undefined,
    paddingVertical: 5,
    paddingHorizontal: 0,
  },
  addLinkText: {
    fontSize: 14,
    color: Colors.secondary,
  },
  addLinkButton: {
    marginBottom: 20,
  },
  addLinkContainer: {
    borderWidth: 0,
    height: undefined,
    paddingVertical: 5,
    paddingHorizontal: 0,
  },
  linkInputContainer: {
    marginTop: 20,
  },
  linkInput: {
    marginBottom: 10,
  },
  saveLinkButtonCont: {
    position: 'absolute',
    right: 0,
    bottom: 10,
  },
  saveLinkButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 20,
    padding: 10,
  },
  checkIcon: {
    tintColor: Colors.white,
  },
  saveButton: {
    marginTop: 20,
  },
});

export default SellerEditProfile;
