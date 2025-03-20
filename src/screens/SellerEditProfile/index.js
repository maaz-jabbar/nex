import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Linking,
} from 'react-native';
import {Colors, Fonts} from '../../config';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Images from '../../assets';
import {
  ContactAvatar,
  GradientButton,
  TextInputCustom,
  ToggleButton,
} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import {errorToast} from '../../config/api';
import {uploadMedia} from '../../redux/middlewares/chat';
import {
  updateCustomerProfile,
  updateSeller,
  updateSellerProfile,
} from '../../redux/middlewares/user';
import {saveUser} from '../../redux/actions/UserActions';

const urlRegex =
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;

const SellerEditProfile = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user?.user);
  const profile = useSelector(state => state.user?.profile);
  console.log('🚀 ~ SellerEditProfile ~ user:', profile);
  const [linkAdd, setLinkAdd] = React.useState(false);
  const {top} = useSafeAreaInsets();
  const [links, setLinks] = React.useState(profile?.links);
  const _goBack = () => {
    navigation.goBack();
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
      if (JSON.stringify(profile?.links) !== JSON.stringify(links) || bio !== profile?.bio) {
        dispatch(
          updateSellerProfile(links, bio, () => {
            navigation.goBack();
          }),
        );
      }
    }
  };
  const [sendSMS, setSendSMS] = React.useState(false);
  const [pushNotifications, setPushNotifications] = React.useState(false);
  const [name, setName] = React.useState(user?.fullName);
  const [bio, setBio] = React.useState(profile?.bio);
  const [phone, setPhone] = React.useState(user?.mobileNumber);
  const [email, setEmail] = React.useState(user?.email);
  const [link, setLink] = React.useState('');
  const [image, setImage] = React.useState('');

  const pickImage = async () => {
    const options = {
      mediaType: 'photo',
      maxHeight: 400,
      maxWidth: 400,
    };
    const source = await launchImageLibrary(options);
    setImage(source?.assets[0]?.uri);
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
        contentContainerStyle={styles.lowerContentContainer}
        style={styles.container}>
        <View style={styles.info}>
          <View style={{alignSelf: 'center'}}>
            {image ? (
              <View
                style={{
                  padding: 2,
                  height: 124,
                  width: 124,
                  borderRadius: 62,
                  backgroundColor: Colors.lightGrey,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 60,
                    borderWidth: 2,
                    borderColor: Colors.white,
                  }}
                  source={{uri: image}}
                />
              </View>
            ) : (
              <ContactAvatar
                contact={user}
                displayName={false}
                size={120}
                containerStyle={{
                  marginRight: 0,
                  zIndex: 99,
                }}
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
            textInputProps={{
              value: name,
              onChangeText: text => {
                setName(text);
              },
            }}
            title="Name"
          />
          <TextInputCustom
            textInputProps={{
              value: phone,
              onChangeText: text => {
                setPhone(text);
              },
            }}
            title="Phone Number"
          />
          <TextInputCustom
            textInputProps={{
              value: email,
              onChangeText: text => {
                setEmail(text);
              },
            }}
            title="Email"
          />
          <TextInputCustom
            title="Bio"
            textInputProps={{
              multiline: true,
              value: bio,
              onChangeText: text => {
                setBio(text);
              },
            }}
            textInputStyle={{
              height: 100,
              textAlignVertical: 'top',
              paddingTop: 10,
            }}
          />
          {links.map((link, index) => {
            return (
              <GradientButton
                key={index}
                noGradient
                onPress={() => {
                  Linking.openURL(link);
                }}
                icon={Images.link}
                iconSize={20}
                iconStyle={{tintColor: Colors.secondary}}
                title={link}
                textStyle={{color: Colors.secondary, flex: 1, marginLeft: 10}}
                buttonStyle={{marginBottom: 0}}
                containerStyle={{
                  borderWidth: 0,
                  height: undefined,
                  paddingVertical: 5,
                  paddingHorizontal: 0,
                }}
              />
            );
          })}
          <GradientButton
            noGradient
            icon={Images.plus2}
            iconSize={20}
            title={'Add Link'}
            onPress={() => setLinkAdd(true)}
            textStyle={{color: Colors.black, flex: 1, marginLeft: 10}}
            buttonStyle={{marginBottom: 0}}
            containerStyle={{
              borderWidth: 0,
              height: undefined,
              paddingVertical: 5,
              paddingHorizontal: 0,
            }}
          />
          {linkAdd && (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInputCustom
                textInputProps={{
                  value: link,
                  onChangeText: text => {
                    setLink(text);
                  },
                }}
                containerStyle={{flex: 1}}
                title="Link"
                icon={Images.link}
              />
              <GradientButton
                icon={Images.check}
                iconStyle={{tintColor: Colors.white}}
                onPress={onPressSaveLink}
                containerStyle={styles.sendButtonCont}
                buttonStyle={styles.sendButton}
                iconSize={24}
              />
            </View>
          )}
        </View>
        <GradientButton
          title="Save"
          buttonStyle={{width: 150, alignSelf: 'center', marginTop: 20}}
          onPress={onPressSave}
        />
      </ScrollView>
    </View>
  );
};

export default SellerEditProfile;

const styles = StyleSheet.create({
  sendButton: {
    marginBottom: 0,
    width: undefined,
  },
  sendButtonCont: {
    height: 40,
    width: 40,
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 10,
  },
  cameraButton: {
    marginBottom: 0,
    width: undefined,
    position: 'absolute',
    right: 0,
    zIndex: 99,
  },
  cameraButtonCont: {
    height: 40,
    width: 40,
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  list: {
    marginBottom: 20,
  },
  brandItem: {
    marginRight: 10,
    backgroundColor: Colors.secondary,
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  brandItemText: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 14,
    color: Colors.white,
  },
  listContent: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  preferences: {
    alignSelf: 'flex-start',
    fontFamily: Fonts.RobotoMedium,
    fontSize: 14,
    color: Colors.lightGrey,
  },
  socialIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  socialIconImage: {
    width: 30,
    height: 30,
  },
  socialIcon: {
    marginRight: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignSelf: 'stretch',
  },
  listTitle: {
    fontFamily: Fonts.RobotoMedium,
    fontSize: 14,
    color: Colors.black,
  },
  name: {
    fontSize: 36,
    fontFamily: Fonts.RobotoRegular,
    color: Colors.black,
  },
  phone: {
    fontSize: 20,
    fontFamily: Fonts.RobotoRegular,
    color: Colors.black,
    marginTop: 5,
  },
  email: {
    fontSize: 15,
    fontFamily: Fonts.RobotoRegular,
    color: Colors.textGrey,
    marginTop: 5,
  },
  info: {},
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
});
