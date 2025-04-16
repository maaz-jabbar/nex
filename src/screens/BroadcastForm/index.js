import React, {useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import {sendBroadcast, uploadMedia} from '../../redux/middlewares/chat';
import {errorToast} from '../../config/api';
import {GradientButton, TextInputCustom, ToggleButton} from '../../components';
import Images from '../../assets';
import {Colors, Fonts} from '../../config';

const BroadcastForm = ({navigation, route: {params}}) => {
  const {top} = useSafeAreaInsets();
  const {selectedContacts} = params;
  const dispatch = useDispatch();
  const user = useSelector(state => state.user?.user);

  const [sendMessages, setSendMessages] = React.useState(true);
  const [sendSMS, setSendSMS] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [attachments, setAttachments] = React.useState([]);

  const _goBack = () => {
    navigation.goBack();
  };

  const onPressAttachment = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      maxHeight: 400,
      maxWidth: 400,
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
    if (!title.trim() || !message.trim()) {
      return errorToast({message: 'Please enter title and message'});
    }

    const body = {
      content: message,
      title,
      senderId: user?.userId,
      isTwilio: sendSMS,
      receiverIds: selectedContacts
        .filter(contact => contact.joined)
        .map(contact => contact.userId),
    };

    if (attachments.length) {
      dispatch(
        uploadMedia(attachments[0], data => {
          body.attachmentId = [data];
          dispatch(sendBroadcast(body, () => navigation.pop(2)));
        }),
      );
    } else {
      dispatch(sendBroadcast(body, () => navigation.pop(2)));
    }
  };

  return (
    <View style={[styles.container, {paddingTop: top}]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={_goBack} style={styles.backButton}>
          <Image source={Images.back} style={styles.backIcon} />
          <Text style={styles.back}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Broadcast</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        style={styles.container}>
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
            title="Message Title"
            textInputProps={{
              value: title,
              onChangeText: setTitle,
            }}
            containerStyle={styles.inputContainer}
          />

          <TextInputCustom
            title="Message"
            textInputProps={{
              multiline: true,
              value: message,
              onChangeText: setMessage,
            }}
            textInputStyle={styles.textInputStyle}
          />

          <TouchableOpacity
            onPress={onPressAttachment}
            style={styles.attachmentButton}>
            <Text style={styles.attachmentText}>Attachment</Text>
            <Image source={Images.attachment} style={styles.attachmentIcon} />
          </TouchableOpacity>

          <View style={styles.attachmentWrapper}>
            {attachments.map((item, index) => (
              <TouchableOpacity key={index} style={styles.attachment}>
                <TouchableOpacity
                  onPress={() => {
                    setAttachments(attachments.filter((_, i) => i !== index));
                  }}
                  style={styles.cross}>
                  <Image source={Images.cross} style={styles.crossIcon} />
                </TouchableOpacity>
                <Text style={styles.attachmentTextName}>{item?.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <GradientButton
          title="Send"
          buttonStyle={styles.sendButton}
          onPress={onSend}
        />
      </ScrollView>
    </View>
  );
};

export default BroadcastForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContainer: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'space-between',
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
  headerPlaceholder: {
    width: 60,
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
  inputContainer: {
    marginTop: 10,
  },
  textInputStyle: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  attachmentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  attachmentText: {
    fontFamily: Fonts.RobotoMedium,
    fontSize: 14,
    color: Colors.darkerGrey,
  },
  attachmentIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  attachmentWrapper: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  attachment: {
    backgroundColor: '#EAEAEA',
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 20,
    marginBottom: 15,
  },
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
  sendButton: {
    marginBottom: 0,
    width: 200,
    alignSelf: 'center',
  },
});
