import React from 'react';
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
import {chats, contacts} from '../../dummyData';

const SelectContacts = ({navigation}) => {
  const {top} = useSafeAreaInsets();

  const _goBack = () => {
    navigation.goBack();
  };

  const moveToChat = user => {
    navigation.navigate('Chat', {user});
  };

  const moveToForm = () => {
    navigation.navigate('BroadcastForm');
  };

  const [selectedContacts, setSelectedContacts] = React.useState([]);

  const _renderItem = ({item, index}) => {
    const isSelected =
      selectedContacts.filter(contact => contact.id === item.id)?.length > 0;

    const onPressSelect = () => {
      if (isSelected) {
        setSelectedContacts(
          selectedContacts.filter(contact => contact.id !== item.id),
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
        <View style={styles.searchCont}>
          <Image
            source={Images.search}
            resizeMode="contain"
            style={styles.searchIcon}
          />
          <TextInput placeholder="Search" style={styles.input} />
        </View>
        <View>
          <FlatList
            data={contacts}
            horizontal
            style={styles.list}
            ListHeaderComponent={() => (
              <GradientButton
                icon={Images.plus}
                containerStyle={styles.listPlusButtonCont}
                buttonStyle={styles.listPlusButton}
                iconSize={24}
                noGradient
                iconStyle={{tintColor: Colors.secondary}}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <ContactAvatar
                  onPress={() => moveToChat(item)}
                  key={index}
                  contact={item}
                />
              );
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
              contentContainerStyle={[styles.listContent, {paddingTop:0}]}
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
      </>
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
        <Text style={styles.title}>Broadcast</Text>
        <TouchableOpacity
          onPress={moveToForm}
          activeOpacity={0.8}
          style={styles.backButton}>
          <Text style={styles.back}>Create</Text>
          <Image
            source={Images.back}
            style={[
              styles.backIcon,
              {transform: [{scaleX: -1}], marginRight: 0, marginLeft: 5},
            ]}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={contacts}
        renderItem={_renderItem}
        ListHeaderComponent={_listHeader}
      />
    </View>
  );
};

export default SelectContacts;

const styles = StyleSheet.create({
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
  toListTitle: {
    color: Colors.darkerGrey,
    fontSize: 14,
    fontFamily: Fonts.RobotoRegular,
    marginRight: 20,
  },
  backIcon: {
    width: 25,
    height: 25,
    marginRight: 5,
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
  searchIcon: {
    width: 20,
    height: 20,
    margin: 10,
    marginHorizontal: 20,
  },
  searchCont: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 50,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  plusButton: {
    marginBottom: 0,
    width: undefined,
  },
  plusButtonCont: {
    height: 40,
    width: 40,
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  headerPlaceholder: {
    width: 60,
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
  title: {
    color: Colors.black,
    fontSize: 24,
    fontFamily: Fonts.RobotoBold,
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
});
