import React, {useMemo, useCallback, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  FlatList,
  Linking,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import Share from 'react-native-share';

import {
  Colors,
  Fonts,
  androidUrl,
  formatPhoneNumber,
  iosUrl,
  maskPhoneNumber,
  message,
} from '../../config';
import Images from '../../assets';
import {ContactAvatar, GradientButton, ToggleButton} from '../../components';
import {logout} from '../../redux/actions/UserActions';
import {getProfileExplicitly} from '../../redux/middlewares/user';

const socialIcons = [
  {icon: Images.instagram, social: Share.Social.INSTAGRAM},
  {icon: Images.facebook, social: Share.Social.FACEBOOK},
  {icon: Images.whatsapp, social: Share.Social.WHATSAPP},
  {icon: Images.twitterX, social: Share.Social.TWITTER},
];

const onPressSocialIcon = async (social = undefined) => {
  if (social == Share.Social.WHATSAPP)
    return Linking.openURL('https://wa.me/?text=' + message);
  const shareOptions = {
    title: 'INVITE',
    message,
    url:
      social == Share.Social.FACEBOOK
        ? Platform.select({ios: iosUrl, android: androidUrl})
        : '',
    social,
  };
  const method = social ? Share.shareSingle : Share.open;
  method(shareOptions)
    .then(res => console.log(res))
    .catch(err => err && console.log(err));
};

const CustomerProfile = ({navigation}) => {
  const user = useSelector(state => state.user?.user);
  const profile = useSelector(state => state.user?.profile);

  const {top} = useSafeAreaInsets();
  const dispatch = useDispatch();

  const [sendSMS, setSendSMS] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);

  const handleGoBack = useCallback(() => navigation.goBack(), [navigation]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{name: 'Auth', params: {screen: 'BeforeSignUp'}}],
    });
  }, [dispatch, navigation]);

  const handleEditProfile = useCallback(() => {
    navigation.navigate('CustomerEditProfile');
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      placeholderForRefreshingToken();
    });
    return unsubscribe;
  }, [navigation]);

  const placeholderForRefreshingToken = async () => {
    dispatch(getProfileExplicitly(user, null, null, false));
  };

  const renderBrand = ({item}) => (
    <View style={styles.brandItem}>
      <Text style={styles.brandItemText}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={[styles.gradientHeader, {paddingTop: top}]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Image source={Images.back} style={styles.backIcon} />
            <Text style={styles.back}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.backButton}>
            <Text style={styles.back}>Logout</Text>
            <Image source={Images.logout} style={styles.logoutIcon} />
          </TouchableOpacity>
        </View>
        <ContactAvatar
          contact={user}
          displayName={false}
          size={120}
          containerStyle={styles.avatarContainer}
        />
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.lowerContentContainer}>
        <View style={styles.info}>
          <Text style={styles.name}>{user?.fullName}</Text>
          <Text style={styles.phone}>
            {formatPhoneNumber(user?.mobileNumber)}
          </Text>
          <Text style={styles.email}>{user?.email}</Text>

          <GradientButton
            title="Invite Link"
            onPress={() => onPressSocialIcon()}
            icon={Images.link}
            iconSize={20}
            noGradient
            iconStyle={styles.linkIcon}
            buttonStyle={styles.inviteButton}
            textStyle={styles.linkText}
          />
          <Text style={styles.email}>Share Nexsa. Unlock rewards</Text>

          <View style={styles.socialIcons}>
            {socialIcons.map((icon, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => onPressSocialIcon(icon.social)}
                activeOpacity={0.8}>
                <Image
                  source={icon?.icon}
                  resizeMode="contain"
                  style={styles.socialIconImage}
                />
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.preferences}>Preferences:</Text>
          <FlatList
            data={profile?.favDesigner}
            horizontal
            keyExtractor={(item, index) => `${item}-${index}`}
            contentContainerStyle={styles.listContent}
            showsHorizontalScrollIndicator={false}
            style={styles.list}
            renderItem={renderBrand}
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
          title="Edit Profile"
          buttonStyle={styles.editProfileBtn}
          onPress={handleEditProfile}
        />
      </ScrollView>
    </View>
  );
};

export default CustomerProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  gradientHeader: {
    overflow: 'visible',
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    color: Colors.white,
    fontSize: 24,
    fontFamily: Fonts.RobotoBold,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    width: 25,
    height: 25,
    marginRight: 5,
    tintColor: Colors.white,
  },
  logoutIcon: {
    tintColor: Colors.white,
    width: 20,
    height: 20,
    marginLeft: 5,
  },
  back: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 15,
    color: Colors.white,
  },
  avatarContainer: {
    marginRight: 0,
    marginTop: 20,
    marginBottom: -60,
    zIndex: 99,
  },
  lowerContentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 80,
  },
  info: {
    alignItems: 'center',
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
  inviteButton: {
    width: 150,
    marginTop: 30,
    marginBottom: 10,
  },
  linkText: {
    color: Colors.black,
    marginLeft: 10,
  },
  linkIcon: {
    tintColor: Colors.black,
  },
  socialIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
    columnGap: 20,
  },
  socialIconImage: {
    width: 30,
    height: 30,
  },
  preferences: {
    alignSelf: 'flex-start',
    fontFamily: Fonts.RobotoMedium,
    fontSize: 14,
    color: Colors.lightGrey,
  },
  list: {
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  listContent: {
    paddingVertical: 10,
  },
  brandItem: {
    marginRight: 10,
    backgroundColor: Colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  brandItemText: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 14,
    color: Colors.white,
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
  editProfileBtn: {
    width: 150,
    alignSelf: 'center',
  },
});
