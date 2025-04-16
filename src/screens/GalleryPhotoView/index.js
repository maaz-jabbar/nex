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
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';

import {Colors, Fonts} from '../../config';
import Images from '../../assets';
import {baseURL} from '../../config/api';
import {GradientButton, ToggleButton} from '../../components';
import {
  deleteItemsFromServerGallery,
  editItemsFromServerGallery,
} from '../../redux/middlewares/gallery';
import {createChat, sendMessageAsync} from '../../redux/middlewares/chat';

const ViewGallery = ({route: {params}, navigation: {goBack, navigate}}) => {
  const {top} = useSafeAreaInsets();
  const dispatch = useDispatch();
  const {jwt, userType, userId} = useSelector(state => state?.user?.user);
  const isCustomer = userType === 'CUSTOMER';

  const ownerId = params?.ownerId;
  const item = params?.item;
  const product = params?.product;

  const [store, setStore] = useState(item);
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState('');
  const [dropDownActive, setDropDownActive] = useState(false);
  const [addPrice, setAddPrice] = useState(!!product?.price);
  const [price, setPrice] = useState(product?.price?.toString() || '');
  const [addSale, setAddSale] = useState(!!product?.sale);

  const onPressSave = () => {
    if (addPrice && !price.trim()) return;

    const updatedData = {
      sale: addSale,
      image: product?.image,
      price: addPrice ? Number(price) : 0,
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

  const sendMessage = () => {
    if (!message.trim()) return;

    dispatch(
      createChat(ownerId, data => {
        const conversationId = data?.id || data?.conversationId;
        const messageObj = {
          conversationId,
          content: message,
          senderId: userId,
        };

        setLoader(true);
        setMessage('');
        dispatch(sendMessageAsync(messageObj, () => setLoader(false)));
      }),
    );
  };

  return (
    <View style={[styles.container, {paddingTop: top}]}>
      {dropDownActive && (
        <View style={styles.dropDown}>
          <TouchableOpacity style={styles.dropDownList} onPress={goBack}>
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
              style={styles.icon}
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
        <LinearGradient
          colors={[Colors.transparent, Colors.transparent]}
          style={styles.imageWrapper}>
          <ImageBackground
            source={{
              uri: `${baseURL}/images/upload/${product?.image}`,
              headers: {Authorization: `Bearer ${jwt}`},
            }}
            resizeMode="cover"
            imageStyle={styles.imageStyle}
            style={styles.imageBackground}>
            {addSale && (
              <Image source={Images.saleBanner} style={styles.saleBanner} />
            )}
            {addPrice && (
              <View style={styles.priceCont}>
                <Text style={styles.priceText}>$</Text>
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
        </LinearGradient>

        {isCustomer ? (
          <View style={styles.chatCont}>
            <View style={styles.sendMessCont}>
              <Image source={Images.attachment} style={styles.backIcon} />
              <TextInput
                value={message}
                onChangeText={setMessage}
                placeholder="Type your message here..."
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
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.RobotoBold,
    color: Colors.black,
  },
  dots: {
    width: 25,
    height: 25,
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
    padding: 2,
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
    flex: 1,
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
    marginBottom: '25%',
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
