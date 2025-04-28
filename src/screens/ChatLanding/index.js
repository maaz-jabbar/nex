import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Colors, Fonts} from '../../config';
import Images from '../../assets';
import {
  BroadcastCard,
  ChatCard,
  ContactAvatar,
  GradientButton,
} from '../../components';
import {AddChatModal} from '../../modals';
import {getBroadcasts, getChats} from '../../redux/middlewares/chat';
import {getUserWithId} from '../../redux/middlewares/user';

const ChatLanding = ({navigation}) => {
  const dispatch = useDispatch();
  const {top} = useSafeAreaInsets();

  const [selectedTab, setSelectedTab] = useState('Chat');
  const [showPopup, setShowPopup] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');

  const userType = useSelector(state => state.user?.userType);
  const chats = useSelector(state => state.user?.chats);
  const broadcasts = useSelector(state => state.user?.broadcasts);

  const isCustomer = userType === 'CUSTOMER';

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getChats());
      dispatch(getBroadcasts());
    });
    return unsubscribe;
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getChats(() => setRefreshing(false)));
    dispatch(getBroadcasts(() => setRefreshing(false)));
  };

  const moveToChat = (user, isBroadcast) => {
    setShowPopup(false);
    const params = isBroadcast
      ? {isBroadcast: true, broadcast: user}
      : {conversation: user};
    navigation.navigate('Chat', params);
  };

  const viewProfile = item => {
    if (item?.joined) {
      dispatch(
        getUserWithId(item?.userId, data => {
          const toSendData = {
            user: {...item, userId: item?.userId},
          };
          const isCustomer = data?.body?.userType === 'CUSTOMER';
          navigation.navigate(
            isCustomer ? 'ViewCustomerProfile' : 'ViewSellerProfile',
            toSendData,
          );
        }),
      );
    } else {
      navigation.navigate('ViewCustomerProfile', {user: item});
    }
  };

  const user = useSelector(state => state.user?.user);

  const getData = () => {
    if (selectedTab === 'Chat') {
      return chats.filter(c => {
        const chatWith = c?.user?.filter(
          sender => sender.userId !== user?.userId,
        )[0];
        return chatWith?.fullName
          ?.toLowerCase()
          ?.includes(search.toLowerCase());
      });
    } else {
      return broadcasts.filter(b => {
        return b?.title?.toLowerCase()?.includes(search.toLowerCase()) ||
          b?.content?.toLowerCase()?.includes(search.toLowerCase());
      });
    }
  };

  return (
    <View style={[styles.container, {paddingTop: top}]}>
      <AddChatModal isVisible={showPopup} setVisible={setShowPopup} />
      <View style={styles.header}>
        <View style={styles.headerPlaceholder} />
        <Text style={styles.title}>Chats</Text>
        <GradientButton
          icon={Images.plus}
          onPress={() => setShowPopup(true)}
          containerStyle={styles.plusButtonCont}
          buttonStyle={styles.plusButton}
          iconSize={24}
        />
      </View>

      <ScrollView style={styles.flex} stickyHeaderIndices={[2]}>
        <View style={styles.searchCont}>
          <Image
            source={Images.search}
            resizeMode="contain"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search"
            style={styles.input}
            value={search}
            onChangeText={val => setSearch(val)}
          />
        </View>
        <>
          <View style={styles.tabButtons}>
            <GradientButton
              containerStyle={styles.tabButtonContainer}
              title="Chat"
              indicator={chats.length}
              buttonStyle={{width: isCustomer ? '100%' : '48%'}}
              noGradient={selectedTab !== 'Chat'}
              onPress={() => setSelectedTab('Chat')}
            />
            {!isCustomer && (
              <GradientButton
                containerStyle={styles.tabButtonContainer}
                buttonStyle={{width: '48%'}}
                indicator={broadcasts.length}
                title="Broadcast"
                noGradient={selectedTab !== 'Broadcast'}
                onPress={() => setSelectedTab('Broadcast')}
              />
            )}
          </View>
        </>
        <FlatList
          scrollEnabled={false}
          key={selectedTab}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={getData()}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (
            <View style={styles.emptyListContainer}>
              <Text style={styles.emptyText}>No chats to show</Text>
            </View>
          )}
          renderItem={({item, index}) =>
            selectedTab === 'Chat' ? (
              <ChatCard
                onPress={() => moveToChat(item)}
                key={index}
                chat={item}
              />
            ) : (
              <BroadcastCard key={index} chat={item} />
            )
          }
        />
      </ScrollView>
    </View>
  );
};

export default ChatLanding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerPlaceholder: {
    width: 40,
  },
  title: {
    color: Colors.black,
    fontSize: 24,
    fontFamily: Fonts.RobotoBold,
  },
  plusButtonCont: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  plusButton: {
    width: undefined,
    marginBottom: 0,
  },
  searchCont: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 50,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 20,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    fontFamily: Fonts.RobotoRegular,
    color: Colors.black,
  },
  list: {},
  listContent: {
    padding: 20,
    alignItems: 'center',
  },
  listPlusButtonCont: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 0,
    marginRight: 20,
  },
  listPlusButton: {
    marginBottom: 0,
    width: undefined,
  },
  tabButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
  tabButtonContainer: {
    borderWidth: 0,
    backgroundColor: Colors.broadcastBackground,
  },
  emptyListContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: Fonts.RobotoRegular,
    color: Colors.black,
  },
});
