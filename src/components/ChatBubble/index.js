import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, Fonts} from '../../config';
import {userId} from '../../dummyData';
import ContactAvatar from '../ContactAvatar';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {baseURL} from '../../config/api';
import ReactNativeModal from 'react-native-modal';
import Images from '../../assets';
import {getItem} from '../../redux/middlewares/gallery';
import {navigate} from '../../navigation/navigationService';

const ChatBubble = ({nextChatBySameUser, message, sender}) => {
  const user = useSelector(state => state.user?.user);
  const sentByMe = user?.userId === message?.senderId;
  const accessToken = useSelector(state => state.user?.user?.accessToken);
  const dispatch = useDispatch();
  const [loader, setLoader] = React.useState(true);
  const [galleryItem, setGalleryItem] = React.useState(null);

  const [attachmentModal, setAttachmentModal] = React.useState('');

  const getGalleryItem = itemId => {
    if (!itemId || galleryItem) return '';
    dispatch(
      getItem(
        itemId,
        data => {
          setGalleryItem(data);
        },
        () => {
          setGalleryItem({});
        },
        setLoader,
      ),
    );
  };

  useEffect(() => {
    if (message?.itemId) {
      getGalleryItem(message?.itemId);
    }
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          alignItems: 'flex-end',
          flexDirection: !sentByMe ? 'row' : 'row-reverse',
        },
      ]}>
      <ReactNativeModal
        onBackButtonPress={() => setAttachmentModal('')}
        onBackdropPress={() => setAttachmentModal('')}
        isVisible={!!attachmentModal}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setAttachmentModal('')}
          style={styles.modalCont}>
          <Image
            source={{
              uri: attachmentModal,
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }}
            resizeMode="contain"
            style={styles.attachment1}
          />
        </TouchableOpacity>
      </ReactNativeModal>
      {nextChatBySameUser ? (
        <View style={{width: 44}} />
      ) : (
        <ContactAvatar
          containerStyle={sentByMe && {marginRight: 0, marginLeft: 10}}
          size={30}
          displayName={false}
          contact={sentByMe ? user : sender}
        />
      )}
      <View
        style={[
          styles.innerCont,
          {
            alignItems: !sentByMe ? 'flex-start' : 'flex-end',
          },
        ]}>
        <View>
          {!!galleryItem && (
            <TouchableOpacity
              key={'asset'}
              onPress={() => {
                if (loader || !galleryItem?.image) return;
                navigate('GalleryPhotoView', {
                  product: galleryItem,
                  cameFromChat: true,
                });
              }}
              activeOpacity={0.8}>
              <ImageBackground
                source={{
                  uri: `${baseURL}/images/upload/${galleryItem?.image}`,
                  headers: {Authorization: `Bearer ${accessToken}`},
                }}
                imageStyle={styles.attachmentImage}
                resizeMode="cover"
                style={styles.attachment}>
                {galleryItem?.sale && (
                  <Image source={Images.saleBanner} style={styles.saleBanner} />
                )}
                {!!galleryItem?.price && (
                  <View style={styles.priceCont}>
                    <Text numberOfLines={1} style={styles.priceText}>
                      ${galleryItem?.price}
                    </Text>
                  </View>
                )}
                {!loader && !galleryItem?.image && (
                  <Image
                    source={Images.productNotFound}
                    style={styles.productNotFound}
                  />
                )}
                {loader && (
                  <View style={styles.loader}>
                    <ActivityIndicator size="small" color={Colors.black} />
                  </View>
                )}
              </ImageBackground>
            </TouchableOpacity>
          )}
          {!!message?.attachments?.length &&
            message?.attachments?.map(asset => {
              const uri = `${baseURL}/images/upload/${asset}`;
              return (
                <TouchableOpacity
                  key={asset}
                  onPress={() => setAttachmentModal(uri)}
                  activeOpacity={0.8}>
                  <Image
                    source={{
                      uri,
                      headers: {Authorization: `Bearer ${accessToken}`},
                    }}
                    style={styles.attachment}
                  />
                </TouchableOpacity>
              );
            })}
          {!!message?.content && (
            <View
              style={{
                backgroundColor: !sentByMe
                  ? Colors.primaryOpacity
                  : Colors.secondaryOpacity,
                padding: 10,
                paddingHorizontal: 20,
                borderRadius: 20,
                borderBottomLeftRadius: !sentByMe ? 0 : 20,
                borderBottomRightRadius: !sentByMe ? 20 : 0,
                maxWidth: '80%',
              }}>
              <Text style={styles.text}>{message?.content}</Text>
            </View>
          )}
        </View>
        {!nextChatBySameUser && (
          <Text style={styles.time}>
            {moment(message?.timestamp).fromNow()}
          </Text>
        )}
      </View>
    </View>
  );
};

export default ChatBubble;

const styles = StyleSheet.create({
  container: {
    padding: 3,
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    borderRadius: 10,
  },
  productNotFound: {
    width: 200,
    height: 200,
    borderRadius: 10,
    resizeMode: 'stretch',
  },
  priceCont: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 20,
    minWidth: '20%',
    maxWidth: '80%',
    alignSelf: 'center',
  },
  priceText: {
    fontSize: 18,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.black,
  },
  saleBanner: {
    width: 80,
    height: 80,
    resizeMode: 'stretch',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  innerCont: {flex: 1},
  text: {
    fontFamily: Fonts.RobotoMedium,
    fontSize: 14,
    color: Colors.white,
  },
  time: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 14,
    color: Colors.darkGrey,
    marginTop: 5,
  },
  attachment: {
    width: 200,
    height: 200,
    borderRadius: 10,
    justifyContent: 'flex-end',
    backgroundColor: Colors.darkGrey,
  },
  attachmentImage: {
    borderRadius: 10,
    backgroundColor: Colors.darkGrey,
  },
  attachment1: {
    width: '100%',
    height: '100%',
  },
});
