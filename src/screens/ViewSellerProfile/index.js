import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Linking,
} from 'react-native';
import { Colors, Fonts } from '../../config';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Images from '../../assets';
import { ContactAvatar, GradientButton } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileExplicitly } from '../../redux/middlewares/user';
import { logout } from '../../redux/actions/UserActions';

const ViewSellerProfile = ({ navigation, route: { params } }) => {
  const { top } = useSafeAreaInsets();
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  const userType = useSelector(state => state?.user?.userType);
  const user = params?.user;

  useEffect(() => {
    dispatch(
      getProfileExplicitly(
        {
          ...user,
          userType: userType === 'CUSTOMER' ? 'SELLER' : 'CUSTOMER',
        },
        profile => {
          setProfile(profile);
        }
      )
    );
  }, []);

  const _goBack = () => {
    navigation.goBack();
  };

  const logoutButton = () => {
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth', params: { screen: 'BeforeSignUp' } }],
    });
  };

  const moveToEditProfile = () => {
    navigation.navigate('SellerEditProfile');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        style={[styles.headerGradient, { paddingTop: top }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
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
          <View style={{ width: 70 }} />
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
              iconStyle={styles.linkIcon}
              title={link}
              textStyle={styles.linkText}
              buttonStyle={styles.linkButton}
              containerStyle={styles.linkContainer}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ViewSellerProfile;

const styles = StyleSheet.create({
  headerGradient: {
    overflow: 'visible',
    zIndex: 1,
  },
  avatarContainer: {
    marginRight: 0,
    marginTop: 20,
    marginBottom: -60,
    zIndex: 99,
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
  linkContainer: {
    borderWidth: 0,
    height: undefined,
    paddingVertical: 5,
    paddingHorizontal: 0,
  },
  linkButton: {
    marginBottom: 0,
  },
  linkIcon: {
    tintColor: Colors.secondary,
  },
  linkText: {
    color: Colors.secondary,
    flex: 1,
    marginLeft: 10,
  },
});