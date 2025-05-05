import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import {Colors, Fonts, phoneRegex} from '../../config';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Images from '../../assets';
import {
  ContactAvatar,
  GradientButton,
  SelectionPill,
  TextInputCustom,
  ToggleButton,
} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadMedia} from '../../redux/middlewares/chat';
import {
  updateCustomer,
  updateCustomerProfile,
} from '../../redux/middlewares/user';
import {logout, saveUser} from '../../redux/actions/UserActions';
import {getAllBrands} from '../../redux/middlewares/profileCreation';
import ReactNativeModal from 'react-native-modal';
import {CommonActions} from '@react-navigation/native';
import * as EmailValidator from 'email-validator';
import {errorToast} from '../../config/api';

const emailError = 'Please enter a valid email.';
const phoneError = 'Please enter a valid phone number.';
const nameError = 'Please enter a valid name (at least 3 characters).';

const CustomerEditProfile = ({navigation}) => {
  const {top} = useSafeAreaInsets();
  const user = useSelector(state => state.user?.user);
  const profile = useSelector(state => state.user?.profile);
  const dispatch = useDispatch();
  const [preferencesModal, setPreferencesModal] = useState(false);
  const [sendSMS, setSendSMS] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [name, setName] = useState(user?.fullName);
  const [phone, setPhone] = useState(user?.mobileNumber);
  const [email, setEmail] = useState(user?.email);
  const [preferences, setPreferences] = useState(profile?.favDesigner);
  const [image, setImage] = useState('');
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    dispatch(getAllBrands(data => setBrands(data)));
  }, []);

  const onPressLogout = () => {
    dispatch(logout());
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Auth', params: {screen: 'BeforeSignUp'}}],
      }),
    );
  };

  const onPressSave = () => {
    if (!name || !phone || !email) return;
    let message = [];

    if (name.length < 3) message.push(nameError);
    if (!phoneRegex.test(phone)) message.push(phoneError);
    if (!EmailValidator.validate(email)) message.push(emailError);

    if (message.length) {
      return errorToast({message: message.join('\n')});
    }

    if (
      user?.fullName === name &&
      user?.mobileNumber === phone &&
      user?.email === email &&
      image === '' &&
      JSON.stringify(profile?.preferences) === JSON.stringify(preferences)
    ) {
      navigation.goBack();
      return;
    }

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
              dispatch(saveUser({...user, userId}));
            }, 100);
          },
          user?.userId,
        ),
      );
    }

    if (JSON.stringify(profile?.favDesigner) !== JSON.stringify(preferences)) {
      dispatch(updateCustomerProfile(preferences, () => navigation.goBack()));
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
      dispatch(updateCustomer(data, onPressLogout));
    }
  };

  const pickImage = async () => {
    const options = {
      mediaType: 'photo',
      maxHeight: 400,
      maxWidth: 400,
    };
    const source = await launchImageLibrary(options);
    setImage(source?.assets?.[0]?.uri);
  };

  return (
    <View style={[styles.container, {paddingTop: top}]}>
      <ReactNativeModal
        onBackButtonPress={() => setPreferencesModal(false)}
        onBackdropPress={() => setPreferencesModal(false)}
        isVisible={preferencesModal}>
        <View style={[styles.container, {marginTop: top}]}>
          <Text style={styles.heading}>Edit Preferences</Text>
          <Text style={styles.smallText}>Select all that apply</Text>
          {!!brands?.length && (
            <ScrollView
              contentContainerStyle={styles.scrollablePositionsContent}
              style={styles.scrollablePositions}>
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {brands.map((position, index) => {
                  const isSelected = preferences.includes(
                    position.designerName,
                  );
                  return (
                    <SelectionPill
                      key={index}
                      title={position.designerName}
                      isSelected={isSelected}
                      onPress={() =>
                        isSelected
                          ? setPreferences(
                              preferences.filter(
                                item => item !== position.designerName,
                              ),
                            )
                          : setPreferences([
                              ...preferences,
                              position.designerName,
                            ])
                      }
                    />
                  );
                })}
              </View>
            </ScrollView>
          )}
          <GradientButton
            title="Done"
            onPress={() => setPreferencesModal(false)}
            buttonStyle={styles.nextButton}
            containerStyle={{backgroundColor: Colors.darkGrey, borderWidth: 0}}
          />
        </View>
      </ReactNativeModal>

      <View style={styles.header}>
        <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
          <Image source={Images.back} style={styles.backIcon} />
          <Text style={styles.back}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>
        <TouchableOpacity onPress={onPressLogout} style={styles.backButton}>
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
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: image}} />
              </View>
            ) : (
              <ContactAvatar
                contact={user}
                displayName={false}
                size={120}
                containerStyle={{marginRight: 0, zIndex: 99}}
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
            textInputProps={{value: name, onChangeText: setName, maxLength: 70}}
          />
          <TextInputCustom
            title="Phone Number"
            textInputProps={{value: phone, onChangeText: setPhone}}
          />
          <TextInputCustom
            title="Email"
            textInputProps={{value: email, onChangeText: setEmail}}
          />

          <View style={styles.preferencesHeader}>
            <Text style={styles.preferences}>Preferences:</Text>
            <Text
              onPress={() => setPreferencesModal(true)}
              style={styles.preferences}>
              Edit
            </Text>
          </View>

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
                onPress={() => setPreferencesModal(true)}
                iconStyle={{tintColor: Colors.secondary}}
              />
            )}
            horizontal
            style={styles.list}
            contentContainerStyle={styles.listContent}
            renderItem={({item, index}) => (
              <View key={index} style={styles.brandItem}>
                <Text style={styles.brandItemText}>{item}</Text>
              </View>
            )}
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
  container: {flex: 1, backgroundColor: Colors.white},
  heading: {
    fontSize: 24,
    textAlign: 'center',
    color: Colors.black,
    fontFamily: Fonts.JosefinSansSemiBold,
    marginBottom: 10,
    marginTop: 20,
  },
  smallText: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 12,
    color: Colors.lightGrey,
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollablePositionsContent: {paddingHorizontal: 20},
  scrollablePositions: {},
  nextButton: {
    alignSelf: 'center',
    width: 150,
    marginVertical: 20,
    marginBottom: 40,
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
  backButton: {flexDirection: 'row', alignItems: 'center'},
  backIcon: {width: 25, height: 25, marginRight: 5},
  logoutIcon: {width: 20, height: 20, marginLeft: 5},
  back: {fontFamily: Fonts.RobotoRegular, fontSize: 15, color: Colors.black},
  title: {
    color: Colors.black,
    fontSize: 24,
    fontFamily: Fonts.RobotoBold,
    marginLeft: 10,
  },
  info: {},
  imageContainer: {
    padding: 2,
    height: 124,
    width: 124,
    borderRadius: 62,
    backgroundColor: Colors.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  cameraButtonCont: {
    height: 40,
    width: 40,
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
  preferencesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  preferences: {
    alignSelf: 'flex-start',
    fontFamily: Fonts.RobotoMedium,
    fontSize: 14,
    color: Colors.lightGrey,
  },
  list: {marginBottom: 20},
  listContent: {paddingVertical: 10, alignItems: 'center'},
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
  listPlusButtonCont: {
    height: 30,
    width: 30,
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  listPlusButton: {marginBottom: 0, width: undefined, marginRight: 20},
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
});
