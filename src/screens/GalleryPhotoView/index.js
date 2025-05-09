import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import Share from 'react-native-share';

import {Colors, Fonts} from '../../config';
import Images from '../../assets';
import {baseURL, errorToast, successToast} from '../../config/api';
import {GradientButton, ToggleButton} from '../../components';
import {
  deleteItemsFromServerGallery,
  editItemsFromServerGallery,
} from '../../redux/middlewares/gallery';
import {
  createChat,
  sendMessageAsync,
  uploadMediaAsync,
} from '../../redux/middlewares/chat';
import ViewShot from 'react-native-view-shot';
import {launchImageLibrary} from 'react-native-image-picker';

const numbersRegex = /^(?:\d+\.\d+|\d+|\.\d+)$/;

const ViewGallery = ({route: {params}, navigation: {goBack, navigate}}) => {
  const {top} = useSafeAreaInsets();
  const dispatch = useDispatch();
  const {accessToken, userType, userId} = useSelector(
    state => state?.user?.user,
  );
  const isCustomer = userType === 'CUSTOMER';

  const ownerId = params?.ownerId;
  const item = params?.item;
  const product = params?.product;
  const cameFromChat = params?.cameFromChat || false;

  let viewShotRef = React.useRef();

  const [store, setStore] = useState(item);
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState('');
  const [dropDownActive, setDropDownActive] = useState(false);
  const [addPrice, setAddPrice] = useState(!!product?.price);
  const [price, setPrice] = useState(
    product?.price ? product?.price?.toString() : '' || '',
  );
  const [addSale, setAddSale] = useState(!!product?.sale);
  const [imagesPicked, setImagesPicked] = useState([]);

  const openPickerAsync = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 5,
      },
      response => {
        if (!response.didCancel) {
          setImagesPicked(response.assets);
        }
      },
    );
  };

  const onPressSave = () => {
    if (addPrice && !price.trim()) return;
    if (addPrice && !numbersRegex.test(price))
      return errorToast({message: 'Please provide a valid price'});

    const updatedData = {
      sale: addSale,
      image: product?.image,
      price: addPrice ? Number(price?.replaceAll(',', '')) : 0,
    };

    dispatch(
      editItemsFromServerGallery(
        product?.itemId,
        store?.galleryId,
        updatedData,
        data => {
          navigate('ViewGallery', {item: data});
        },
      ),
    );
  };

  const onPressDelete = () => {
    dispatch(
      deleteItemsFromServerGallery(product?.itemId, store?.galleryId, data => {
        navigate('ViewGallery', {item: data});
      }),
    );
  };

  const onPressShare = async () => {
    setDropDownActive(false);
    const uri = await viewShotRef.current.capture();
    await Share.open({url: uri});
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    let imageIds = [];
    setLoader(true);
    if (imagesPicked.length) {
      imageIds = await Promise.all(
        imagesPicked.map((product, index) => {
          const attachmentSent = {
            uri: product.uri,
            type: product.type,
            name: product.fileName,
          };
          console.log('🚀 ~ attachments.map ~ product:', attachmentSent);
          return uploadMediaAsync(
            attachmentSent,
            Number(`${Date.now()}${index}`),
            setLoader
          );
        }),
      );
      console.log("🚀 ~ sendMessage ~ imageIds:", imageIds)
    }
    console.log('🚀 ~ sendMessage ~ imageIds:', imageIds);

    dispatch(
      createChat(ownerId, data => {
        const conversationId = data?.id || data?.conversationId;
        const messageObj = {
          conversationId,
          content: message,
          senderId: userId,
          galleryId: store?.galleryId,
          itemId: product?.itemId,
          attachments: imageIds,
        };
        setMessage('');
        dispatch(
          sendMessageAsync(messageObj, () => {
            setLoader(false);
            setImagesPicked([]);
            successToast('Message sent successfully');
          }),
        );
      }),
    );
  };

  return (
    <View style={[styles.container, {paddingTop: top}]}>
      {dropDownActive && (
        <View style={styles.dropDown}>
          <TouchableOpacity style={styles.dropDownList} onPress={onPressShare}>
            <Image
              source={Images.share}
              resizeMode="contain"
              style={styles.icon}
            />
            <Text style={styles.dropDownListText}>Share Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.dropDownList, {borderBottomWidth: 0}]}
            onPress={onPressDelete}>
            <Image
              source={Images.delete}
              resizeMode="contain"
              style={[styles.icon, {tintColor: Colors.primary}]}
            />
            <Text style={styles.dropDownListText}>Delete Photo</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Image
            source={Images.back}
            resizeMode="contain"
            style={styles.dots}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{store?.name || 'Gallery'}</Text>
        {isCustomer ? (
          <View style={styles.headerPlaceholder} />
        ) : (
          <TouchableOpacity onPress={() => setDropDownActive(prev => !prev)}>
            <Image
              source={Images.dots}
              resizeMode="contain"
              style={styles.dots}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.mainCont}>
        <ViewShot ref={viewShotRef} style={styles.imageWrapper}>
          <ImageBackground
            source={{
              uri: `${baseURL}/images/upload/${product?.image}`,
              headers: {Authorization: `Bearer ${accessToken}`},
            }}
            resizeMode="cover"
            imageStyle={styles.imageStyle}
            style={styles.imageBackground}>
            {addSale && (
              <Image source={Images.saleBanner} style={styles.saleBanner} />
            )}
            {addPrice && (
              <View style={styles.priceCont}>
                <Text style={styles.priceText}>$ </Text>
                <TextInput
                  keyboardType="number-pad"
                  autoFocus
                  editable={!isCustomer}
                  value={price}
                  onChangeText={setPrice}
                  style={styles.priceInput}
                />
              </View>
            )}
          </ImageBackground>
        </ViewShot>

        {cameFromChat ? (
          <View style={styles.chatContEmtpy} />
        ) : isCustomer ? (
          <View style={styles.chatCont}>
            {!!imagesPicked?.length && (
              <ScrollView
                horizontal
                style={styles.attachmentsContainer}
                contentContainerStyle={{
                  paddingTop: 10,
                  paddingBottom: 5,
                  marginTop: 20,
                }}>
                {imagesPicked?.map(attachemnt => {
                  return (
                    <View style={styles.attachmentCont}>
                      <TouchableOpacity
                        style={styles.closeIconCont}
                        onPress={() =>
                          setImagesPicked(
                            imagesPicked.filter(
                              a => a?.uri !== attachemnt?.uri,
                            ),
                          )
                        }>
                        <Image source={Images.close} style={styles.closeIcon} />
                      </TouchableOpacity>
                      <Image source={attachemnt} style={styles.attachment} />
                    </View>
                  );
                })}
              </ScrollView>
            )}
            <View style={styles.sendMessCont}>
              <TouchableOpacity onPress={openPickerAsync}>
                <Image source={Images.attachment} style={styles.backIcon} />
              </TouchableOpacity>
              <TextInput
                value={message}
                onChangeText={setMessage}
                placeholder="Type your message here..."
                placeholderTextColor={Colors.textGrey}
                style={styles.messageInput}
              />
              <GradientButton
                icon={!loader ? Images.send : null}
                customComp={
                  loader ? <ActivityIndicator color={Colors.white} /> : null
                }
                onPress={sendMessage}
                containerStyle={styles.sendButtonCont}
                buttonStyle={styles.sendButton}
                iconSize={24}
              />
            </View>
          </View>
        ) : (
          <View>
            <View style={styles.listItem}>
              <Text style={styles.listTitle}>Add Price</Text>
              <ToggleButton on={addPrice} onToggle={setAddPrice} />
            </View>
            <View style={styles.listItem}>
              <Text style={styles.listTitle}>Add Sale</Text>
              <ToggleButton on={addSale} onToggle={setAddSale} />
            </View>
            <GradientButton
              title="Save"
              onPress={onPressSave}
              containerStyle={styles.saveButton}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default ViewGallery;

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
  attachmentsContainer: {},
  attachmentCont: {
    marginRight: 10,
  },
  closeIconCont: {
    position: 'absolute',
    top: -10,
    right: -10,
    zIndex: 99,
    backgroundColor: Colors.secondary,
    borderRadius: 20,
    padding: 5,
  },
  closeIcon: {
    height: 15,
    width: 15,
    tintColor: Colors.white,
  },
  attachment: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  chatContEmtpy: {
    height: '25%',
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.RobotoBold,
    color: Colors.black,
  },
  dots: {
    width: 25,
    height: 40,
    resizeMode: 'contain',
  },
  headerPlaceholder: {
    width: 25,
  },
  dropDown: {
    position: 'absolute',
    top: 70,
    right: 20,
    zIndex: 99,
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D9D9D9',
  },
  dropDownList: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
  },
  dropDownListText: {
    fontSize: 16,
    marginLeft: 15,
    fontFamily: Fonts.RobotoRegular,
    color: Colors.black,
  },
  icon: {
    width: 20,
    height: 20,
  },
  mainCont: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  imageWrapper: {
    flex: 1,
    borderRadius: 10,
  },
  imageBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 10,
  },
  saleBanner: {
    width: 150,
    height: 150,
    resizeMode: 'stretch',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  priceCont: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 20,
    minWidth: '20%',
    maxWidth: '40%',
    alignSelf: 'center',
  },
  priceText: {
    fontSize: 18,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.black,
  },
  priceInput: {
    fontSize: 18,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.black,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  listTitle: {
    fontSize: 14,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.black,
  },
  saveButton: {
    width: '50%',
    alignSelf: 'center',
    marginTop: 20,
  },
  chatCont: {
    marginBottom: '10%',
  },
  sendMessCont: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 50,
    padding: 10,
    paddingVertical: 5,
    marginVertical: 20,
  },
  backIcon: {
    width: 25,
    height: 25,
    marginRight: 5,
    tintColor: Colors.secondary,
  },
  messageInput: {
    flex: 1,
    height: 48,
    color: Colors.black,
    paddingHorizontal: 10,
    fontFamily: Fonts.RobotoRegular,
  },
  sendButtonCont: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  sendButton: {
    width: undefined,
    marginBottom: 0,
  },
});
