import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  FlatList,
  Linking,
} from 'react-native';
import {Colors, Fonts} from '../../config';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Images from '../../assets';
import {ContactAvatar, GradientButton, ToggleButton} from '../../components';
import {brands, contacts} from '../../dummyData';
import {logout} from '../../redux/actions/UserActions';
import {useDispatch, useSelector} from 'react-redux';
import {getProfileExplicitly} from '../../redux/middlewares/user';
const socialIcons = [
  Images.instagram,
  Images.facebook,
  Images.tiktok,
  Images.twitterX,
];

const ViewSellerProfile = ({navigation, route: {params}}) => {
  const {top} = useSafeAreaInsets();
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  console.log("🚀 ~ ViewSellerProfile ~ profile:", profile)
  const userType = useSelector(state => state?.user?.userType);
  console.log('🚀 ~ ViewSellerProfile ~ userType:', userType);

  const user = params?.user;
  console.log('🚀 ~ ViewSellerProfile ~ user:', user);

  useEffect(() => {
    dispatch(
      getProfileExplicitly(
        {
          ...user,
          userType: userType === 'CUSTOMER' ? 'SELLER' : 'CUSTOMER',
        },
        profile => {
          console.log('🚀 ~ useEffect ~ profile:', profile);
          setProfile(profile);
        },
      ),
    );
  }, []);

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
    navigation.navigate('SellerEditProfile');
  };

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
          <View style={{width: 70}} />
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
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.phone}>{user?.number}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <Text style={styles.preferences}>Bio</Text>
        <Text style={styles.bio}>{profile?.bio}</Text>
        {profile?.links.map((link, index) => {
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
      </ScrollView>
    </View>
  );
};

export default ViewSellerProfile;

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
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
  bio: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 14,
    color: Colors.black,
    marginVertical: 10,
    alignSelf: 'flex-start',
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
    marginBottom: 10,
  },
  info: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  lowerContentContainer: {
    padding: 20,
    paddingTop: 80,
    alignItems: 'center',
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
