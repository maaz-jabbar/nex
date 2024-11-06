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
import {
  CheckBox,
  ContactCard,
  GradientButton,
  TextInputCustom,
  ToggleButton,
} from '../../components';
import Images from '../../assets';
import {ContactAvatar} from '../../components';
import {broadcasts, chats, contacts} from '../../dummyData';

const attachments = [
  {id: 1, name: 'image.png'},
  {id: 2, name: 'document.pdf'},
];

const BroadcastForm = ({navigation}) => {
  const {top} = useSafeAreaInsets();

  const _goBack = () => {
    navigation.goBack();
  };

  const [sendMessages, setSendMessages] = React.useState(false);
  const [sendSMS, setSendSMS] = React.useState(false);

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
        <View style={styles.headerPlaceholder} />
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{padding: 20, flexGrow: 1, justifyContent: 'space-between'}}>
          <View>
        <View style={styles.listItem}>
          <Text style={styles.listTitle}>Send Message to Chat</Text>
          <ToggleButton on={sendMessages} onToggle={setSendMessages} />
        </View>
        <View style={styles.listItem}>
          <Text style={styles.listTitle}>Send SMS</Text>
          <ToggleButton on={sendSMS} onToggle={setSendSMS} />
        </View>
        <TextInputCustom
          containerStyle={{marginTop: 10}}
          title="Message Title"
        />
        <TextInputCustom
          title="Message"
          textInputProps={{multiline: true}}
          textInputStyle={{
            height: 100,
            textAlignVertical: 'top',
            paddingTop: 10,
          }}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
          <Text style={styles.attachmentText}>Attachment</Text>
          <Image
            source={Images.attachment}
            style={styles.attachmentIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View
          style={{flexWrap: 'wrap', flexDirection: 'row'}}>
          {attachments.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                style={styles.attachment}>
                <TouchableOpacity activeOpacity={0.8} style={styles.cross}>
                  <Image
                    source={Images.cross}
                    style={styles.crossIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <Text style={styles.attachmentTextName}>{item?.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        </View>
        <GradientButton
          title="Send"
          buttonStyle={{marginBottom: 0, width: 200, alignSelf: 'center'}}
          onPress={() => {
            navigation.navigate('Chat',{
              isBroadcast: true,
              broadcast: broadcasts[0],
            });
          }}
        />
      </ScrollView>
    </View>
  );
};

export default BroadcastForm;

const styles = StyleSheet.create({
  cross: {
    position: 'absolute',
    top: -5,
    right: -10,
  },
  crossIcon: {
    width: 25,
    height: 25
  },
  attachmentTextName: {
    fontFamily: Fonts.RobotoMedium,
    fontSize: 14,
    color: Colors.black,
  },
  attachment: {
    backgroundColor: "#EAEAEA",
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 20,
    marginBottom: 15,
  },
  attachmentIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  attachmentText: {
    fontFamily: Fonts.RobotoMedium,
    fontSize: 14,
    color: Colors.darkerGrey,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  listTitle: {
    fontFamily: Fonts.RobotoMedium,
    fontSize: 14,
    color: Colors.black,
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
});
