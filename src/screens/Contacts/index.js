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
import {ContactCard, GradientButton} from '../../components';
import Images from '../../assets';
import {ContactAvatar} from '../../components';
import {chats, contacts} from '../../dummyData';

const Contacts = ({navigation}) => {
  const {top} = useSafeAreaInsets();

  const _goBack = () => {
    navigation.goBack();
  };

  const moveToChat = user => {
    navigation.navigate('Chat', {user});
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
        <Text style={styles.title}>Contacts</Text>
        <View style={styles.headerPlaceholder} />
      </View>
      <FlatList
        data={contacts}
        renderItem={({item, index}) => {
          return (
            <ContactCard
              onPress={() => moveToChat(item)}
              key={index}
              user={item}
            />
          );
        }}
        ListHeaderComponent={() => {
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
            </>
          );
        }}
      />
    </View>
  );
};

export default Contacts;

const styles = StyleSheet.create({
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
