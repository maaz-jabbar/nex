import React from 'react';
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
import {ContactAvatar, GradientButton, ToggleButton} from '../../components';
import {brands, contacts} from '../../dummyData';
import {logout} from '../../redux/actions/UserActions';
import {useDispatch, useSelector} from 'react-redux';
import { baseURL } from '../../config/api';

const socialIcons = [
  Images.instagram,
  Images.facebook,
  Images.tiktok,
  Images.twitterX,
];

const CustomerProfile = ({navigation}) => {

  const user = useSelector(state => state.user?.user);
  const profile = useSelector(state => state.user?.profile);

  const {top} = useSafeAreaInsets();
  const dispatch = useDispatch();
  const _goBack = () => {
    navigation.goBack();
  };

  const logoutButton = () => {
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{name: 'Auth', params: {screen: 'BeforeSignUp'}}],
    });
  };

  const moveToEditProfile = () => {
    navigation.navigate('CustomerEditProfile');
  };

  const [sendSMS, setSendSMS] = React.useState(false);
  const [pushNotifications, setPushNotifications] = React.useState(false);

  return (
    <View style={styles.container}>
      <LinearGradient
        style={{
          paddingTop: top,
          overflow: 'visible',
          zIndex: 1,
        }}
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
          containerStyle={{
            marginRight: 0,
            marginTop: 20,
            marginBottom: -60,
            zIndex: 99,
          }}
        />
      </LinearGradient>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.lowerContentContainer}
        style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.name}>{user?.fullName}</Text>
          <Text style={styles.phone}>{user?.mobileNumber}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          <GradientButton
            title="Invite Link"
            onPress={() => {}}
            icon={Images.link}
            iconSize={20}
            noGradient
            iconStyle={{tintColor: Colors.black}}
            buttonStyle={{width: 150, marginTop: 30, marginBottom: 10}}
            textStyle={{color: Colors.black, marginLeft: 10}}
          />
          <Text style={styles.email}>Share Nexsa. Unlock rewards</Text>
          <View style={styles.socialIcons}>
            {socialIcons.map((icon, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {}}
                activeOpacity={0.8}
                style={styles.socialIcon}>
                <Image
                  source={icon}
                  resizeMode="contain"
                  style={styles.socialIconImage}
                />
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.preferences}>Preferences:</Text>
          <FlatList
            data={profile?.favDesigner}
            showsHorizontalScrollIndicator={false}
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
          title="Edit Profile"
          buttonStyle={{width: 150, alignSelf: 'center'}}
          onPress={moveToEditProfile}
        />
      </ScrollView>
    </View>
  );
};

export default CustomerProfile;

const styles = StyleSheet.create({
  list: {
    marginBottom: 20,
    alignSelf: 'stretch',
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
  info: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  lowerContentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 80,
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
    marginLeft: 10,
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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  back: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 15,
    color: Colors.white,
  },
});
