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
import {GradientButton} from '../../components';
import Images from '../../assets';
import {ContactAvatar} from '../../components';

const contacts = [
  {
    imageLink:
      'https://images.inc.com/uploaded_files/image/1024x576/getty_481292845_77896.jpg',
    name: 'John Dasdasdadsa',
  },
  {
    imageLink:
      'https://images.squarespace-cdn.com/content/v1/5c7c30767980b31affc87b09/1602396079712-4JS2RJYHTAP5OXOUQ1SB/image-asset.jpeg',
    name: 'Emily dsdsd',
  },
  {
    imageLink:
      'https://cdn2.psychologytoday.com/assets/styles/manual_crop_4_3_1200x900/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=eaVcXTz5',
    name: 'Janet S',
  },
  {
    imageLink:
      'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
    name: 'Marty M',
  },
  {
    imageLink:
      'https://images.inc.com/uploaded_files/image/1024x576/getty_481292845_77896.jpg',
    name: 'John D',
  },
  {
    imageLink:
      'https://images.squarespace-cdn.com/content/v1/5c7c30767980b31affc87b09/1602396079712-4JS2RJYHTAP5OXOUQ1SB/image-asset.jpeg',
    name: 'Emily',
  },
  {
    imageLink:
      'https://cdn2.psychologytoday.com/assets/styles/manual_crop_4_3_1200x900/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=eaVcXTz5',
    name: 'Janet S',
  },
  {
    imageLink:
      'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
    name: 'Marty M',
  },
];

const ChatLanding = () => {
  const {top} = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = React.useState('Chat');
  return (
    <View style={[styles.container, {paddingTop: top}]}>
      <View style={styles.header}>
        <View style={styles.headerPlaceholder} />
        <Text style={styles.title}>Chats</Text>
        <GradientButton
          icon={Images.plus}
          containerStyle={styles.plusButtonCont}
          buttonStyle={styles.plusButton}
          iconSize={24}
        />
      </View>

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
            return <ContactAvatar key={index} contact={item} />;
          }}
        />
      </View>

      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <GradientButton
            containerStyle={{
              borderWidth: 0,
              backgroundColor: Colors.broadcastBackground,
            }}
            title="Chat"
            indicator={1}
            buttonStyle={{width: '40%'}}
            noGradient={selectedTab !== 'Chat'}
            onPress={() => setSelectedTab('Chat')}
          />
          <GradientButton
            containerStyle={{
              borderWidth: 0,
              backgroundColor: Colors.broadcastBackground,
            }}
            buttonStyle={{width: '40%'}}
            indicator={3}
            title="Broadcast"
            noGradient={selectedTab !== 'Broadcast'}
            onPress={() => setSelectedTab('Broadcast')}
          />
        </View>
      </View>
    </View>
  );
};

export default ChatLanding;

const styles = StyleSheet.create({
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
    width: 40,
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
