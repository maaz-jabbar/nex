import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Platform,
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
  acceptInvite,
  deleteInvitePerm,
  getCustomerBasedOnSearch,
  getProfileExplicitly,
  getUserContacts,
  getUserInvites,
  getUserWithId,
  rejectInvite,
  saveContact,
} from '../../redux/middlewares/user';
import Images from '../../assets';
import {successToast} from '../../config/api';

const Invitations = ({navigation: {navigate, goBack}}) => {
  const {top} = useSafeAreaInsets();
  const dispatch = useDispatch();

  const [receivedInvites, setReceivedInvites] = useState([]);

  const profileId = useSelector(state => state.user?.profile?.profileId);
  const userType = useSelector(state => state.user?.userType);
  const contacts = useSelector(state => state.user?.contacts) || [];
  const isCustomer = userType === 'CUSTOMER';

  const _goBack = () => goBack();

  useEffect(() => {
    if (isCustomer)
      dispatch(
        getUserInvites(invites => {
          setReceivedInvites(invites);
        }),
      );
  }, []);

  const onAcceptInvite = invitationId => {
    dispatch(
      acceptInvite(invitationId, invites => {
        setReceivedInvites(invites);
      }),
    );
  };

  const onRejectInvite = invitationId => {
    dispatch(
      rejectInvite(invitationId, invites => {
        setReceivedInvites(invites);
      }),
    );
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

  const filteredContacts = contacts.filter(
    contact => contact?.inviteStatus === 'PENDING',
  );

  const deleteButton = onPress => {
    return (
      <TouchableOpacity style={styles.deleteIconWrapper} onPress={onPress}>
        <Image source={Images.delete} style={styles.deleteIcon} />
      </TouchableOpacity>
    );
  };
  const acceptButton = onPress => {
    return (
      <GradientButton
        title="Confirm"
        onPress={onPress}
        buttonStyle={styles.acceptButton}
        containerStyle={styles.acceptButtonCont}
      />
    );
  };

  const _renderItem = ({item, index}) => {
    if (isCustomer) {
      return (
        <ContactCard
          user={{name: item.senderName, userId: item.senderUserId}}
          customComp={
            <>
              {acceptButton(() => onAcceptInvite(item.invitationId))}
              {deleteButton(() => onRejectInvite(item.invitationId))}
            </>
          }
        />
      );
    } else {
      return (
        <ContactCard
          user={item}
          customComp={deleteButton(() => deleteInvite(item?.userId))}
        />
      );
    }
  };

  const getData = () => {
    if (isCustomer) {
      return receivedInvites;
    } else {
      return filteredContacts;
    }
  };

  const _listHeader = () => {
    return (
      <View style={styles.invitesSentCont}>
        <Text style={styles.invitesSent}>
          {isCustomer ? 'Invites received' : 'Invites sent'}
        </Text>
        <View style={styles.invitesSentCount}>
          <Text style={styles.invitesSent}>{getData()?.length}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, {paddingTop: top}]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={_goBack}
          activeOpacity={0.8}
          style={styles.backButton}>
          <Image source={Images.back} style={styles.backIcon} />
          <Text style={styles.back}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Invitations</Text>
        <View style={styles.placeholder} />
      </View>
      <FlatList
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No invites to show</Text>
          </View>
        )}
        data={getData()}
        ListHeaderComponent={_listHeader}
        keyExtractor={(item, index) => `${item?.userId}_${index}`}
        renderItem={_renderItem}
      />
    </View>
  );
};

export default Invitations;

const styles = StyleSheet.create({
  acceptButton: {
    width: 100,
    marginBottom: 0,
  },
  acceptButtonCont: {
    borderRadius: 10,
    height: 45,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  invitesSent: {
    fontFamily: Fonts.RobotoMedium,
    color: Colors.black,
    fontSize: 18,
    marginTop: Platform?.OS === 'ios' ? 0 : -2,
  },
  invitesSentCont: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  invitesSentCount: {
    backgroundColor: Colors.secondary + '50',
    borderRadius: 20,
    height: 22,
    width: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  placeholder: {
    width: 90,
  },
  plusButton: {
    width: undefined,
    marginBottom: 0,
  },
  plusButtonCont: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
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
    width: 90,
  },
  backIcon: {
    width: 25,
    height: 40,
    marginRight: 5,
    resizeMode: 'contain',
  },
  inviteIcon: {
    width: 20,
    height: 40,
    marginRight: 5,
    resizeMode: 'contain',
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
  sendInvite: {
    fontFamily: Fonts.RobotoRegular,
    color: Colors.white,
    fontSize: 16,
    marginRight: 5,
  },
  sendInviteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  deleteIconWrapper: {
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    height: 45,
    width: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: Colors.primary,
  },
  addIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  emptyContainer: {padding: 20},
  emptyText: {
    fontFamily: Fonts.RobotoRegular,
    color: Colors.black,
    fontSize: 16,
  },
});
