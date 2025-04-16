import React from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {Colors, Fonts} from '../../config';
import {ContactAvatar, ContactCard, GradientButton} from '../../components';
import {AddInvitePopup, InvitesModal, NewContactModal} from '../../modals';
import {
  deleteInvitePerm,
  getProfileExplicitly,
  getUserContacts,
  getUserWithId,
} from '../../redux/middlewares/user';
import Images from '../../assets';

const Contacts = ({navigation}) => {
  const {top} = useSafeAreaInsets();
  const dispatch = useDispatch();

  const [search, setSearch] = React.useState('');
  const [addContactModal, setAddContactModal] = React.useState(false);
  const [newContact, setNewContact] = React.useState(false);
  const [inviteModal, setInviteModal] = React.useState(false);

  const profileId = useSelector(state => state.user?.profile?.profileId);
  const userType = useSelector(state => state.user?.userType);
  const contacts = useSelector(state => state.user?.contacts) || [];

  const _goBack = () => navigation.goBack();

  const viewProfile = item => {
    if (!item?.joined) {
      dispatch(
        getUserWithId(item?.userId, data => {
          const toSendData = {
            user: {
              ...item,
              userId: item?.userId,
            },
          };
          if (data?.body?.userType === 'CUSTOMER') {
            navigation.navigate('ViewCustomerProfile', toSendData);
          } else {
            navigation.navigate('ViewSellerProfile', toSendData);
          }
        }),
      );
    } else {
      navigation.navigate('ViewCustomerProfile', {user: item});
    }
  };

  const deleteInvite = senderId => {
    dispatch(
      getProfileExplicitly(
        {
          userId: senderId,
          userType: userType === 'CUSTOMER' ? 'AGENT' : 'CUSTOMER',
        },
        data => {
          dispatch(deleteInvitePerm(profileId, data?.profileId, () => {}));
        },
      ),
    );
  };

  const filteredContacts = contacts.filter(contact =>
    contact?.name?.toLowerCase().includes(search?.toLowerCase()),
  );

  return (
    <View style={[styles.container, {paddingTop: top}]}>
      <AddInvitePopup
        isVisible={addContactModal}
        setVisible={setAddContactModal}
        setContactModal={setNewContact}
      />
      <NewContactModal isVisible={newContact} setVisible={setNewContact} />
      <InvitesModal isVisible={inviteModal} setVisible={setInviteModal} />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={_goBack}
          activeOpacity={0.8}
          style={styles.backButton}>
          <Image source={Images.back} style={styles.backIcon} />
          <Text style={styles.back}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Contacts</Text>
        <TouchableOpacity
          onPress={() => setInviteModal(true)}
          activeOpacity={0.8}
          style={styles.backButton}>
          <Image source={Images.invite} style={styles.inviteIcon} />
          <Text style={styles.back}>Invites</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchCont}>
        <Image source={Images.search} style={styles.searchIcon} />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search"
          placeholderTextColor={Colors.gray}
          style={styles.input}
        />
      </View>
      <View>
      <FlatList
        data={filteredContacts}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        style={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => dispatch(getUserContacts(profileId))}
          />
        }
        ListHeaderComponent={
          <GradientButton
            icon={Images.plus}
            containerStyle={styles.listPlusButtonCont}
            buttonStyle={styles.listPlusButton}
            iconSize={24}
            noGradient
            onPress={() => setAddContactModal(true)}
            iconStyle={{tintColor: Colors.secondary}}
          />
        }
        ListEmptyComponent={
          <View>
            <Text style={styles.emptyText}>No contacts to show.</Text>
          </View>
        }
        renderItem={({item}) => (
          <ContactAvatar onPress={() => viewProfile(item)} contact={item} />
        )}
      />
    </View>
      <FlatList
        data={filteredContacts}
        keyExtractor={(item, index) => `${item?.userId}_${index}`}
        renderItem={({item}) => {
          const accepted = item?.inviteStatus === 'ACCEPTED';
          return (
            <ContactCard
              onPress={() => viewProfile(item)}
              user={item}
              customComp={
                !accepted && (
                  <TouchableOpacity
                    style={styles.deleteIconWrapper}
                    onPress={() => deleteInvite(item?.userId)}>
                    <Image source={Images.delete} style={styles.deleteIcon} />
                  </TouchableOpacity>
                )
              }
            />
          );
        }}
      />
    </View>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
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
  },
  inviteIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  back: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 15,
    color: Colors.black,
  },
  title: {
    color: Colors.black,
    fontSize: 24,
    fontFamily: Fonts.RobotoBold,
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
    margin: 10,
    marginHorizontal: 20,
  },
  input: {
    flex: 1,
    color: Colors.black,
    fontSize: 16,
    fontFamily: Fonts.RobotoRegular,
    height: 48,
  },
  list: {},
  listContent: {
    padding: 20,
    alignItems: 'center',
  },
  listPlusButton: {
    marginBottom: 0,
    width: undefined,
    marginRight: 20,
  },
  listPlusButtonCont: {
    height: 30,
    width: 30,
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  deleteIconWrapper: {
    marginRight: 10,
  },
  deleteIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  emptyText: {
    fontFamily: Fonts.RobotoRegular,
    color: Colors.black,
    fontSize: 16,
  },
});
