import React from 'react';
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
import {useDispatch} from 'react-redux';
const socialIcons = [
  Images.instagram,
  Images.facebook,
  Images.tiktok,
  Images.twitterX,
];
const user = contacts[1];

const ViewSellerProfile = ({navigation}) => {
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
    navigation.navigate('SellerEditProfile');
  };

  const [links, setLinks] = React.useState([
    {
      id: 1,
      title: 'Follow me on Instagram',
      link: 'https://www.instagram.com/',
    },
    {
      id: 2,
      title: 'Follow me on Facebook',
      link: 'https://www.facebook.com/',
    },
    {
      id: 3,
      title: 'Follow me on TikTok',
      link: 'https://www.tiktok.com/',
    },
  ]);

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
        <View style={styles.info}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.phone}>{user.phone}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.preferences}>Bio</Text>
          <Text style={styles.bio}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          </Text>
          {links.map((link, index) => {
            return (
              <GradientButton
                key={index}
                noGradient
                onPress={() => {
                  Linking.openURL(link.link);
                }}
                icon={Images.link}
                iconSize={20}
                iconStyle={{tintColor: Colors.secondary}}
                title={link.title}
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
        </View>
        <GradientButton
          title="Edit Profile"
          buttonStyle={{width: 150, alignSelf: 'center', marginTop: 20}}
          onPress={moveToEditProfile}
        />
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
