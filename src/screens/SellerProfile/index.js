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
import Share from 'react-native-share';
import {Colors, Fonts} from '../../config';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Images from '../../assets';
import {ContactAvatar, GradientButton} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import {logout} from '../../redux/actions/UserActions';

const socialIcons = [
  {icon: Images.instagram, social: Share.Social.INSTAGRAM},
  {icon: Images.facebook, social: Share.Social.FACEBOOK},
  {icon: Images.whatsapp, social: Share.Social.WHATSAPP},
  {icon: Images.twitterX, social: Share.Social.TWITTER},
];

const onPressSocialIcon = (social = undefined) => {
  const shareOptions = {
    title: 'INVITE',
    message: 'You are invited to join nexsa app!',
    url: 'https://www.google.com',
    social,
  };
  const method = social ? Share.shareSingle : Share.open;
  method(shareOptions)
    .then(res => console.log(res))
    .catch(err => err && console.log(err));
};

const SellerProfile = ({navigation}) => {
  const {top} = useSafeAreaInsets();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user?.user);
  const profile = useSelector(state => state.user?.profile);

  const _goBack = () => navigation.goBack();

  const logoutButton = () => {
    dispatch(logout());
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'Auth', params: {screen: 'BeforeSignUp'}}],
      }),
    );
  };

  const moveToEditProfile = () => navigation.navigate('SellerEditProfile');

  return (
    <View style={styles.container}>
      <LinearGradient
        style={[styles.headerGradient, {paddingTop: top}]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[Colors.primary, Colors.secondary]}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={_goBack}
            activeOpacity={0.8}
            style={styles.backButton}>
            <Image source={Images.back} style={styles.backIcon} />
            <Text style={styles.back}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity
            onPress={logoutButton}
            activeOpacity={0.8}
            style={styles.backButton}>
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
        contentContainerStyle={styles.scrollContent}
        style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.name}>{user?.fullName}</Text>
          <Text style={styles.phone}>{user?.mobileNumber}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          <GradientButton
            title="Invite Link"
            onPress={() => onPressSocialIcon()}
            icon={Images.link}
            iconSize={20}
            noGradient
            iconStyle={styles.iconStyle}
            buttonStyle={styles.inviteButton}
            textStyle={styles.inviteText}
          />
          <Text style={styles.shareText}>Share Nexsa. Unlock rewards</Text>
          <View style={styles.socialIcons}>
            {socialIcons.map((icon, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => onPressSocialIcon(icon.social)}
                activeOpacity={0.8}
                style={styles.socialIcon}>
                <Image
                  source={icon?.icon}
                  resizeMode="contain"
                  style={styles.socialIconImage}
                />
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.buttons}>
            <GradientButton
              title="Settings"
              buttonStyle={styles.settingsButton}
              noGradient
              iconStyle={styles.settingsIcon}
              icon={Images.settings}
            />
            <GradientButton
              title="Plan"
              buttonStyle={styles.planButton}
              noGradient
              icon={Images.idea}
            />
          </View>
          <Text style={styles.preferences}>Bio</Text>
          <Text style={styles.bio}>{profile?.bio}</Text>
          {!!profile?.links?.length &&
            profile?.links.map((link, index) => (
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
        </View>
        <GradientButton
          title="Edit Profile"
          buttonStyle={styles.editProfileButton}
          onPress={moveToEditProfile}
        />
      </ScrollView>
    </View>
  );
};

export default SellerProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerGradient: {
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
  title: {
    color: Colors.white,
    fontSize: 24,
    fontFamily: Fonts.RobotoBold,
    marginLeft: 10,
  },
  avatarContainer: {
    marginRight: 0,
    marginTop: 20,
    marginBottom: -60,
    zIndex: 99,
  },
  scrollContent: {
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
  shareText: {
    fontSize: 15,
    fontFamily: Fonts.RobotoRegular,
    color: Colors.textGrey,
    marginTop: 10,
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
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsButton: {
    width: 150,
    alignSelf: 'center',
    backgroundColor: Colors.secondary,
    marginRight: 10,
    borderRadius: 50,
  },
  settingsIcon: {
    tintColor: Colors.white,
  },
  planButton: {
    borderRadius: 50,
    width: 150,
    alignSelf: 'center',
    backgroundColor: Colors.secondary,
  },
  preferences: {
    alignSelf: 'flex-start',
    fontFamily: Fonts.RobotoMedium,
    fontSize: 14,
    color: Colors.lightGrey,
  },
  bio: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 14,
    color: Colors.black,
    marginVertical: 10,
    alignSelf: 'flex-start',
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
  editProfileButton: {
    width: 150,
    alignSelf: 'center',
    marginTop: 20,
  },
  iconStyle: {
    tintColor: Colors.black,
  },
  inviteButton: {
    width: 150,
    marginTop: 30,
    marginBottom: 10,
  },
  inviteText: {
    color: Colors.black,
    marginLeft: 10,
  },
});
