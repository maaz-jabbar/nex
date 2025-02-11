import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  FlatList,
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
import {brands, contacts} from '../../dummyData';
import {useDispatch, useSelector} from 'react-redux';
import {baseURL, successToast} from '../../config/api';
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadMedia} from '../../redux/middlewares/chat';
import {
  updateCustomer,
  updateCustomerProfile,
  updateSeller,
} from '../../redux/middlewares/user';
import {saveUser} from '../../redux/actions/UserActions';
const socialIcons = [
  Images.instagram,
  Images.facebook,
  Images.tiktok,
  Images.twitterX,
];

const CustomerEditProfile = ({navigation}) => {
  const {top} = useSafeAreaInsets();
  const user = useSelector(state => state.user?.user);
  const profile = useSelector(state => state.user?.profile);
  const dispatch = useDispatch();
  const _goBack = () => {
    navigation.goBack();
  };
  const [sendSMS, setSendSMS] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [name, setName] = useState(user?.fullName);
  const [phone, setPhone] = useState(user?.mobileNumber);
  const [email, setEmail] = useState(user?.email);
  const [preferences, setPreferences] = useState(profile?.favDesigner);
  const [image, setImage] = React.useState('');
  // const [bio, setBio] = React.useState('');

  const onPressSave = () => {
    if (!name || !phone || !email)
      return errorToast({message: 'Please fill all the fields'});
    if (
      user?.fullName === name &&
      user?.mobileNumber === phone &&
      user?.email === email &&
      image === '' &&
      JSON.stringify(profile?.preferences) === JSON.stringify(preferences)
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
              successToast('Profile updated successfully');
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
        dispatch(
          updateCustomer(data, () => {
            successToast('Profile updated successfully');
            navigation.goBack();
          }),
        );
      }
      if (
        JSON.stringify(profile?.favDesigner) !== JSON.stringify(preferences)
      ) {
        dispatch(
          updateCustomerProfile(preferences, () => {
            successToast('Profile updated successfully');
            navigation.goBack();
          }),
        );
      }
    }
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
            title="Name"
            textInputProps={{
              value: name,
              onChangeText: setName,
            }}
          />
          <TextInputCustom
            title="Phone Number"
            textInputProps={{
              value: phone,
              onChangeText: setPhone,
            }}
          />
          <TextInputCustom
            title="Email"
            textInputProps={{
              value: email,
              onChangeText: setEmail,
            }}
          />
          <Text style={styles.preferences}>Preferences:</Text>
          <FlatList
            data={preferences}
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={() => (
              <GradientButton
                icon={Images.plus}
                containerStyle={styles.listPlusButtonCont}
                buttonStyle={styles.listPlusButton}
                iconSize={24}
                noGradient
                iconStyle={{tintColor: Colors.secondary}}
              />
            )}
            horizontal
            style={styles.list}
            contentContainerStyle={styles.listContent}
            renderItem={({item, index}) => {
              return (
                <View key={index} style={styles.brandItem}>
                  <Text style={styles.brandItemText}>{item}</Text>
                </View>
              );
            }}
          />
          <View style={styles.listItem}>
            <Text style={styles.listTitle}>Push notifications</Text>
            <ToggleButton
              on={pushNotifications}
              onToggle={setPushNotifications}
            />
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listTitle}>SMS notifications</Text>
            <ToggleButton on={sendSMS} onToggle={setSendSMS} />
          </View>
        </View>
        <GradientButton
          title="Save"
          buttonStyle={{width: 150, alignSelf: 'center'}}
          onPress={onPressSave}
        />
      </ScrollView>
    </View>
  );
};

export default CustomerEditProfile;

const styles = StyleSheet.create({
  listPlusButton: {
    marginBottom: 0,
    width: undefined,
    marginRight: 20,
  },
  listPlusButtonCont: {
    height: 30,
    width: 30,
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
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
