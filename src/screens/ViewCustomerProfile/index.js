import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Colors, Fonts, formatPhoneNumber} from '../../config';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Images from '../../assets';
import {ContactAvatar, GradientButton} from '../../components';
import {useDispatch} from 'react-redux';
import {createChat} from '../../redux/middlewares/chat';
import {getProfileExplicitly, sendInvite} from '../../redux/middlewares/user';

const ViewCustomerProfile = ({navigation, route: {params}}) => {
  const {top} = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [brands, setBrands] = useState([]);
  const [loader, setLoader] = useState(true);
  const _goBack = () => {
    navigation.goBack();
  };

  const user = params?.user;

  useEffect(() => {
    getUserPreferences();
  }, []);

  const getUserPreferences = () => {
    dispatch(
      getProfileExplicitly(
        {userId: user?.userId, userType: 'CUSTOMER'},
        userFromServer => {
          setBrands(userFromServer?.favDesigner);
        },
        setLoader,
      ),
    );
  };
  console.log('🚀 ~ ViewCustomerProfile ~ user:', user);
  const inviteStatus = user?.inviteStatus;
  const notAccepted = inviteStatus !== 'ACCEPTED';

  const actionItems = [
    {
      name: 'Chat',
      icon: Images.chat,
      disabled: notAccepted,
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
      disabled: notAccepted,
      icon: Images.star,
      onPress: () => {},
    },
    {
      name: 'Block',
      disabled: notAccepted,
      icon: Images.block,
      onPress: () => {},
    },
  ];

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
          <View style={styles.headerSpacer} />
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
        style={styles.scrollView}>
        {user?.joined ? (
          <GradientButton
            title="Joined"
            onPress={() => {}}
            noGradient
            containerStyle={styles.joinedButton}
            buttonStyle={styles.joinedButtonStyle}
            textStyle={styles.joinedButtonText}
          />
        ) : (
          <GradientButton
            title="Send Invite"
            onPress={() => {
              dispatch(sendInvite(user?.number));
            }}
            noGradient
            containerStyle={styles.inviteButton}
            buttonStyle={styles.inviteButtonStyle}
            textStyle={styles.inviteButtonText}
          />
        )}

        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.phone}>{formatPhoneNumber(user?.number)}</Text>
        <Text style={styles.email}>{user?.email}</Text>

        {user?.joined && (
          <>
            <View style={styles.actionContainer}>
              {actionItems.map((item, index) => {
                const isChat = index === 0;
                const isLast = index === actionItems.length - 1;
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={item.onPress}
                    disabled={item.disabled}
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

            <View style={styles.preferencesContainer}>
              {loader ? (
                <ActivityIndicator />
              ) : brands?.length ? (
                brands?.map((item, index) => {
                  return (
                    <View key={index} style={styles.brandItem}>
                      <Text style={styles.brandItemText}>{item}</Text>
                    </View>
                  );
                })
              ) : (
                <Text>No preferences found</Text>
              )}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default ViewCustomerProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollView: {
    backgroundColor: Colors.white,
    marginTop: 60,
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
    width: 70,
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
  },
  headerSpacer: {
    width: 70,
  },
  avatarContainer: {
    marginRight: 0,
    marginTop: 20,
    marginBottom: -60,
    zIndex: 99,
  },
  lowerContentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  joinedButton: {
    height: 35,
    paddingHorizontal: 0,
    backgroundColor: Colors.secondary,
  },
  joinedButtonStyle: {
    width: 120,
  },
  joinedButtonText: {
    color: Colors.white,
  },
  inviteButton: {
    height: 35,
    paddingHorizontal: 0,
  },
  inviteButtonStyle: {
    width: 120,
  },
  inviteButtonText: {
    color: Colors.secondary,
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
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 20,
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
  preferences: {
    alignSelf: 'flex-start',
    fontFamily: Fonts.RobotoMedium,
    fontSize: 14,
    color: Colors.lightGrey,
  },
  list: {
    marginBottom: 20,
  },
  listContent: {
    paddingVertical: 10,
  },
  brandItem: {
    marginRight: 10,
    marginBottom: 10,
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
  preferencesContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});
