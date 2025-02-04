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
import {useDispatch} from 'react-redux';
import {createChat} from '../../redux/middlewares/chat';

const socialIcons = [
  Images.instagram,
  Images.facebook,
  Images.tiktok,
  Images.twitterX,
];
const user = contacts[0];

const ViewCustomerProfile = ({navigation, route: {params}}) => {
  const {top} = useSafeAreaInsets();
  const dispatch = useDispatch();
  const _goBack = () => {
    navigation.goBack();
  };

  const user = params?.user;

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

  const actionItems = [
    {
      name: 'Chat',
      icon: Images.chat,
      onPress: () => {
        dispatch(
          createChat(user?.userId, data => {
            const conversation = {
              conversationId: data?.id || data?.conversationId,
              user: data?.participants || data?.user,
            };
            navigation.navigate('Chat', {conversation});
          }),
        );
      },
    },
    {
      name: 'Favorite',
      icon: Images.star,
      onPress: () => alert('Favorite'),
    },
    {
      name: 'Block',
      icon: Images.block,
      onPress: () => alert('Block'),
    },
  ];

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
        {user?.joined ? (
          <GradientButton
            title="Joined"
            onPress={() => {}}
            noGradient
            containerStyle={{
              height: 35,
              paddingHorizontal: 0,
              backgroundColor: Colors.secondary,
            }}
            buttonStyle={{width: 120}}
            textStyle={{color: Colors.white}}
          />
        ) : (
          <GradientButton
            title="Send Invite"
            onPress={() => {}}
            noGradient
            containerStyle={{
              height: 35,
              paddingHorizontal: 0,
            }}
            buttonStyle={{width: 120}}
            textStyle={{color: Colors.secondary}}
          />
        )}
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.phone}>{user?.number}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        {user?.joined && (
          <>
            <View style={styles.actionContainer}>
              {actionItems.map((item, index) => {
                const isChat = index === 0;
                const isLast = index === actionItems.length - 1;
                return (
                  <TouchableOpacity
                    onPress={item.onPress}
                    activeOpacity={0.8}
                    style={[styles.actionButton, isLast && {marginRight: 0}]}>
                    <Image
                      source={item.icon}
                      resizeMode="contain"
                      style={[
                        styles.actionIcon,
                        isChat && {tintColor: Colors.secondary},
                      ]}
                    />
                    <Text style={styles.actionText}>{item.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text style={styles.preferences}>Notes</Text>
            <Text style={styles.bio}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            </Text>
            <Text style={styles.preferences}>Preferences:</Text>
            <FlatList
              data={brands}
              showsHorizontalScrollIndicator={false}
              horizontal
              style={styles.list}
              contentContainerStyle={styles.listContent}
              renderItem={({item, index}) => {
                return (
                  <View key={index} style={styles.brandItem}>
                    <Text style={styles.brandItemText}>{item.name}</Text>
                  </View>
                );
              }}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default ViewCustomerProfile;

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 20,
  },
  actionIcon: {
    width: 25,
    height: 25,
  },
  actionText: {
    fontFamily: Fonts.RobotoMedium,
    fontSize: 14,
    color: Colors.black,
    marginTop: 10,
  },
  actionButton: {
    height: 80,
    width: 80,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Colors.secondaryOpacityLight,
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
  bio: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 14,
    color: Colors.black,
    marginVertical: 10,
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
