import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, Fonts} from '../../config';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ChatCard, GradientButton} from '../../components';
import Images from '../../assets';
import {ContactAvatar} from '../../components';
import {chats, contacts} from '../../dummyData';
import ReactNativeModal from 'react-native-modal';

const ChatLanding = () => {
  const {top} = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = React.useState('Chat');
  const [showPopup, setShowPopup] = React.useState(false);

  const _renderPopup = () => {
    return (
      <ReactNativeModal
        isVisible={showPopup}
        onBackdropPress={() => setShowPopup(false)}
        onBackButtonPress={() => setShowPopup(false)}
        animationIn={'zoomIn'}
        animationOut={'zoomOut'}
        style={[styles.popupModal, {paddingTop: top + 40}]}
        onDismiss={() => setShowPopup(false)}>
        <View style={styles.popup}>
          <Text style={styles.createChat}>Create Chat or Broadcast</Text>
          <GradientButton
            title="Create Chat"
            icon={Images.chat}
            iconStyle={{tintColor: Colors.white}}
            containerStyle={{height: 50, justifyContent: 'center'}}
            buttonStyle={{width: '80%'}}
          />
          <GradientButton
            title="Broadcast"
            icon={Images.contacts}
            iconStyle={{tintColor: Colors.white}}
            containerStyle={{height: 50, justifyContent: 'center'}}
            buttonStyle={{width: '80%'}}
          />
        </View>
      </ReactNativeModal>
    );
  };

  return (
    <View style={[styles.container, {paddingTop: top}]}>
      {_renderPopup()}
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
      <ScrollView style={{flex: 1}} stickyHeaderIndices={[2]}>
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
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              backgroundColor: Colors.white,
            }}>
            <GradientButton
              containerStyle={{
                borderWidth: 0,
                backgroundColor: Colors.broadcastBackground,
              }}
              title="Chat"
              indicator={1}
              buttonStyle={{width: '48%'}}
              noGradient={selectedTab !== 'Chat'}
              onPress={() => setSelectedTab('Chat')}
            />
            <GradientButton
              containerStyle={{
                borderWidth: 0,
                backgroundColor: Colors.broadcastBackground,
              }}
              buttonStyle={{width: '48%'}}
              indicator={3}
              title="Broadcast"
              noGradient={selectedTab !== 'Broadcast'}
              onPress={() => setSelectedTab('Broadcast')}
            />
          </View>
        </>
        <FlatList
          data={chats}
          scrollEnabled={false}
          renderItem={({item, index}) => {
            return <ChatCard key={index} chat={item} />;
          }}
        />
      </ScrollView>
    </View>
  );
};

export default ChatLanding;

const styles = StyleSheet.create({
  createChat: {
    fontSize: 20,
    fontFamily: Fonts.RobotoRegular,
    color: Colors.black,
    marginBottom: 20,
  },
  popup: {
    padding: 40,
    backgroundColor: Colors.white,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupModal: {
    justifyContent: 'flex-start',
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
