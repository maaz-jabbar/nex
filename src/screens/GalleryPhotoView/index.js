import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ImageBackground,
  TextInput,
} from 'react-native';
import {Colors, Fonts} from '../../config';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {GradientButton, ToggleButton} from '../../components';
import Images from '../../assets';
import LinearGradient from 'react-native-linear-gradient';
import {launchImageLibrary} from 'react-native-image-picker';
import {baseURL} from '../../config/api';
import {useDispatch, useSelector} from 'react-redux';
import {
  addItemsToServerGallery,
  deleteItemsFromServerGallery,
  editItemsFromServerGallery,
} from '../../redux/middlewares/gallery';

const ViewGallery = ({route: {params}, navigation: {goBack, navigate}}) => {
  const {top} = useSafeAreaInsets();
  const item = params?.item;
  const product = params?.product;
  const [store, setStore] = useState(item);
  const [showPopup, setShowPopup] = useState(false);
  const [dropDownActive, setDropDownActive] = useState(false);
  const [addPrice, setAddPrice] = useState(product?.price ? true : false);
  const [price, setPrice] = useState(product?.price?.toString());
  const [addSale, setAddSale] = useState(product?.sale);
  const {jwt, userType} = useSelector(state => state?.user?.user);
  const isCustomer = userType === 'CUSTOMER';
  const dispatch = useDispatch();
  const onPressSave = () => {
    if (addPrice && !price) return;
    dispatch(
      editItemsFromServerGallery(
        product?.itemId,
        store?.galleryId,
        {
          sale: addSale,
          image: product?.image,
          price: addPrice ? Number(price) : 0,
        },
        data => {
          console.log('🚀 ~ edittttttt ~ data:', data);
          navigate('ViewGallery', {item: data});
        },
      ),
    );
  };

  const onPressDelete = () => {
    dispatch(
      deleteItemsFromServerGallery(product?.itemId, store?.galleryId, data => {
        console.log('🚀 ~ onPressDelete ~ data:', data);
        navigate('ViewGallery', {item: data});
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
              style={{height: 20, width: 20}}
            />
            <Text style={styles.dropDownListText}>Share Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.dropDownList, {borderWidth: 0}]}
            onPress={onPressDelete}>
            <Image
              source={Images.delete}
              resizeMode="contain"
              style={{height: 20, width: 20}}
            />
            <Text style={styles.dropDownListText}>Delete Photo</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Image
            resizeMode="contain"
            source={Images.back}
            style={styles.dots}
          />
        </TouchableOpacity>
        <Text style={styles.title}>
          {store?.name ? store?.name : 'Gallery'}
        </Text>
        {isCustomer ? (
          <View style={styles.headerPlaceholder} />
        ) : (
          <TouchableOpacity onPress={() => setDropDownActive(!dropDownActive)}>
            <Image
              resizeMode="contain"
              source={Images.dots}
              style={styles.dots}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.mainCont}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[Colors.primary, Colors.secondary]}
          style={{flex: 1, borderRadius: 10, padding: 2}}>
          <ImageBackground
            source={{
              uri: `${baseURL}/images/upload/${product.image}`,
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }}
            resizeMode="cover"
            imageStyle={{
              borderRadius: 10,
            }}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
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
        {isCustomer ? null : (
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
              containerStyle={{
                width: '50%',
                alignSelf: 'center',
                marginTop: 20,
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default ViewGallery;

const styles = StyleSheet.create({
  dropDown: {
    position: 'absolute',
    top: 70,
    right: 20,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Colors.white,
    zIndex: 99,
  },
  dropDownList: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
  },
  dropDownListText: {
    fontSize: 16,
    fontFamily: Fonts.RobotoRegular,
    color: Colors.black,
    marginLeft: 15,
  },
  dots: {
    height: 25,
    width: 25,
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
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 10,
    minWidth: '20%',
    maxWidth: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    alignSelf: 'center',
    marginVertical: 20,
  },
  priceInput: {
    // height: 40,
    fontSize: 18,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.black,
    textAlignVertical: 'center',
  },
  priceText: {
    fontSize: 18,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.black,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: 10,
    marginTop: 20,
  },
  listTitle: {
    fontFamily: Fonts.RobotoMedium,
    fontSize: 14,
    color: Colors.black,
  },
  mainCont: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  headerPlaceholder: {
    width: 25,
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
    paddingVertical: 20,
  },
  title: {
    color: Colors.black,
    fontSize: 24,
    fontFamily: Fonts.RobotoBold,
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
});
