import React, {useEffect} from 'react';
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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {StackActions} from '@react-navigation/native';
import {errorToast} from '../../config/api';
import {useDispatch, useSelector} from 'react-redux';
import {sendBroadcast, uploadMedia} from '../../redux/middlewares/chat';

const BroadcastForm = ({navigation, route: {params}}) => {
  const {top} = useSafeAreaInsets();
  const {selectedContacts} = params;
  console.log('🚀 ~ BroadcastForm ~ selectedContacts:', selectedContacts);
  const _goBack = () => {
    navigation.goBack();
  };

  const [sendMessages, setSendMessages] = React.useState(true);
  const [sendSMS, setSendSMS] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [attachments, setAttachments] = React.useState([]);
  const user = useSelector(state => state.user?.user);
  const dispatch = useDispatch();
  console.log('🚀 ~ BroadcastForm ~ user:', user);

  const onPressAttachment = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
    });
    if (!result.assets?.length) return;
    setAttachments([
      {
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        name: result.assets[0].fileName,
      },
    ]);
  };

  const onSend = () => {
    if (!title.trim() || !message.trim())
      return errorToast({message: 'Please enter title and message'});

    const body = {
      content: message,
      title,
      // attachmentId: 234,
      senderId: user?.userId,
      isTwilio: sendSMS,
      receiverIds: [
        ...selectedContacts
          .filter(contact => contact.joined)
          .map(contact => contact.userId),
      ],
    };
    if (attachments.length) {
      dispatch(
        uploadMedia(attachments[0], data => {
          body.attachmentId = data;
          dispatch(sendBroadcast(body, () => navigation.pop(2)));
        }),
      );
    } else dispatch(sendBroadcast(body, () => navigation.pop(2)));
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
        <View style={styles.headerPlaceholder} />
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          padding: 20,
          flexGrow: 1,
          justifyContent: 'space-between',
        }}>
        <View>
          <View style={styles.listItem}>
            <Text style={styles.listTitle}>Send Message to Chat</Text>
            <ToggleButton
              on={sendMessages}
              onToggle={data => {
                setSendMessages(data);
                setSendSMS(!data);
              }}
            />
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listTitle}>Send SMS</Text>
            <ToggleButton
              on={sendSMS}
              onToggle={data => {
                setSendMessages(!data);
                setSendSMS(data);
              }}
            />
          </View>
          <TextInputCustom
            textInputProps={{
              value: title,
              onChangeText: data => {
                setTitle(data);
              },
            }}
            containerStyle={{marginTop: 10}}
            title="Message Title"
          />
          <TextInputCustom
            title="Message"
            textInputProps={{
              multiline: true,
              value: message,
              onChangeText: data => {
                setMessage(data);
              },
            }}
            textInputStyle={{
              height: 100,
              textAlignVertical: 'top',
              paddingTop: 10,
            }}
          />
          <TouchableOpacity
            onPress={onPressAttachment}
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Text style={styles.attachmentText}>Attachment</Text>
            <Image
              source={Images.attachment}
              style={styles.attachmentIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
            {attachments.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  style={styles.attachment}>
                  <TouchableOpacity
                    onPress={() => {
                      setAttachments(attachments.filter((_, i) => i !== index));
                    }}
                    activeOpacity={0.8}
                    style={styles.cross}>
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
          onPress={onSend}
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
    height: 25,
  },
  attachmentTextName: {
    fontFamily: Fonts.RobotoMedium,
    fontSize: 14,
    color: Colors.black,
  },
  attachment: {
    backgroundColor: '#EAEAEA',
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
