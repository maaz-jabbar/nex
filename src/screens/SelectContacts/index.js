import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, Fonts} from '../../config';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CheckBox, ContactCard, GradientButton} from '../../components';
import Images from '../../assets';
import {ContactAvatar} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {errorToast} from '../../config/api';
import {getCustomerBasedOnSearch} from '../../redux/middlewares/user';

const SelectContacts = ({navigation}) => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const [searchedItems, setSearchedItems] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const userType = useSelector(state => state.user?.userType);
  const isCustomer = userType === 'CUSTOMER';

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (debouncedQuery && !isCustomer) {
      dispatch(
        getCustomerBasedOnSearch(debouncedQuery, data => {
          if (data.body) {
            setSearchedItems(
              data.body.filter(contact => {
                return contacts.find(
                  c =>
                    c?.userId == contact?.profileId &&
                    c?.inviteStatus == 'ACCEPTED',
                );
              }),
            );
          }
        }),
      );
    } else {
      setSearchedItems([]);
    }
  }, [debouncedQuery]);

  const {top} = useSafeAreaInsets();

  const _goBack = () => {
    navigation.goBack();
  };

  const moveToForm = () => {
    if (!selectedContacts.length)
      return errorToast({message: 'Please select at least one contact'});
    navigation.navigate('BroadcastForm', {selectedContacts});
  };

  const [selectedContacts, setSelectedContacts] = React.useState([]);
  const contacts = useSelector(state => state.user?.contacts);

  const _renderItem = ({item, index}) => {
    console.log('🚀 ~ const_renderItem= ~ item:', item);
    const isSelected =
      selectedContacts.filter(contact => contact.number === item.number)
        ?.length > 0;

    const onPressSelect = () => {
      if (isSelected) {
        setSelectedContacts(
          selectedContacts.filter(contact => contact.number !== item.number),
        );
      } else {
        setSelectedContacts([...selectedContacts, item]);
      }
    };
    return (
      <ContactCard
        onPress={onPressSelect}
        key={index}
        onSelect={onPressSelect}
        user={item}
        selected={isSelected}
        selectable
      />
    );
  };

  const _listHeader = () => {
    const allSelected = selectedContacts.length === contacts.length;
    return (
      <>
        <View>
          <FlatList
            data={contacts.filter(c => c?.inviteStatus == 'ACCEPTED')}
            horizontal
            ListEmptyComponent={() => {
              return (
                <View>
                  <Text style={styles.noContactsText}>
                    No contacts to show.
                  </Text>
                </View>
              );
            }}
            style={styles.list}
            ListHeaderComponent={() => (
              <GradientButton
                icon={Images.plus}
                containerStyle={styles.listPlusButtonCont}
                buttonStyle={styles.listPlusButton}
                iconSize={24}
                noGradient
                iconStyle={styles.listPlusIcon}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return <ContactAvatar key={index} contact={item} />;
            }}
          />
        </View>

        {selectedContacts.length > 0 && (
          <View>
            <FlatList
              data={selectedContacts}
              horizontal
              style={styles.list}
              ListHeaderComponent={() => (
                <Text style={styles.toListTitle}>To:</Text>
              )}
              contentContainerStyle={[styles.listContent, {paddingTop: 0}]}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <GradientButton
                    key={index}
                    buttonStyle={styles.toListButton}
                    containerStyle={styles.toListButtonCont}
                    textStyle={styles.toListButtonText}
                    title={item.name}
                  />
                );
              }}
            />
          </View>
        )}
        <View style={styles.selectAll}>
          <Text style={styles.selectAllText}>Select All</Text>
          <CheckBox
            setIsChecked={() => {
              if (allSelected) {
                setSelectedContacts([]);
              } else setSelectedContacts([...contacts]);
            }}
            isChecked={allSelected}
            rounded
          />
        </View>
        <View>
          {searchedItems.map((newItem, index) => {
            const item = {
              email: newItem?.email,
              inviteStatus: 'ACCEPTED',
              joined: true,
              name: newItem?.fullName,
              number: newItem?.mobileNumber,
              userId: newItem?.profileId,
            };

            const isSelected =
              selectedContacts.filter(contact => contact.number === item.number)
                ?.length > 0;

            const onPressSelect = () => {
              if (isSelected) {
                setSelectedContacts(
                  selectedContacts.filter(
                    contact => contact.number !== item.number,
                  ),
                );
              } else {
                setSelectedContacts([...selectedContacts, item]);
              }
            };
            return (
              <ContactCard
                user={item}
                onPress={onPressSelect}
                key={index}
                onSelect={onPressSelect}
                selected={isSelected}
                selectable
              />
            );
          })}
        </View>
      </>
    );
  };

  const filteredContacts = searchedItems?.length
    ? []
    : contacts.filter(
        contact =>
          contact?.name?.toLowerCase().includes(search?.toLowerCase()) &&
          contact?.inviteStatus == 'ACCEPTED',
      );

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
        <Text style={styles.title}>Broadcast</Text>
        <TouchableOpacity
          onPress={moveToForm}
          activeOpacity={0.8}
          style={styles.backButton}>
          <Text style={styles.back}>Create</Text>
          <Image source={Images.back} style={styles.backIconReverse} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchCont}>
        <Image
          source={Images.search}
          resizeMode="contain"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search"
          placeholderTextColor={Colors.darkerGrey}
          onChangeText={text => setSearch(text)}
          value={search}
          style={styles.input}
        />
      </View>
      <FlatList
        ListEmptyComponent={() => {
          return (
            <View style={styles.emptyList}>
              <Text style={styles.noContactsText}>
                Please add contacts to proceed.
              </Text>
            </View>
          );
        }}
        data={filteredContacts}
        renderItem={_renderItem}
        ListHeaderComponent={_listHeader}
      />
    </View>
  );
};

export default SelectContacts;

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
  title: {
    color: Colors.black,
    fontSize: 24,
    fontFamily: Fonts.RobotoBold,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  back: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 15,
    color: Colors.black,
  },
  backIcon: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  backIconReverse: {
    width: 25,
    height: 25,
    marginRight: 0,
    marginLeft: 5,
    transform: [{scaleX: -1}],
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
  noContactsText: {
    fontFamily: Fonts.RobotoRegular,
    color: Colors.black,
    fontSize: 16,
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
  listPlusIcon: {
    tintColor: Colors.secondary,
  },
  toListTitle: {
    color: Colors.darkerGrey,
    fontSize: 14,
    fontFamily: Fonts.RobotoRegular,
    marginRight: 20,
  },
  toListButton: {
    width: undefined,
    marginBottom: 0,
    height: undefined,
    marginRight: 10,
  },
  toListButtonCont: {
    width: undefined,
    height: undefined,
    paddingVertical: 10,
  },
  toListButtonText: {
    fontSize: 14,
    fontFamily: Fonts.RobotoRegular,
    color: Colors.white,
  },
  selectAll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 10,
  },
  selectAllText: {
    color: Colors.secondary,
    fontSize: 13,
    fontFamily: Fonts.RobotoRegular,
  },
  emptyList: {
    alignItems: 'center',
    marginTop: 100,
  },
});
