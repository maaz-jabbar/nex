import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {Colors, Fonts} from '../../config';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {GradientButton} from '../../components';
import Images from '../../assets';
import LinearGradient from 'react-native-linear-gradient';
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadMedia, uploadMediaAsync} from '../../redux/middlewares/chat';
import {
  addItemsToServerGallery,
  createGallery,
} from '../../redux/middlewares/gallery';
import {useDispatch, useSelector} from 'react-redux';
import {baseURL} from '../../config/api';

const ViewGallery = ({route: {params}, navigation: {goBack, navigate}}) => {
  const {top} = useSafeAreaInsets();
  const item = params?.item;
  const ownerId = params?.ownerId;
  const [store, setStore] = useState(item);
  const [showPopup, setShowPopup] = useState(false);
  const {jwt, userType} = useSelector(state => state?.user?.user);
  const isCustomer = userType === 'CUSTOMER';
  const {width} = Dimensions.get('screen');
  const dispatch = useDispatch();

  useEffect(() => {
    setStore(item);
  }, [item]);

  const addItemsToGallery = async products => {
    const imageIds = await Promise.all(
      products.map((product, index) => {
        return uploadMediaAsync(
          {
            uri: product.uri,
            type: product.type,
            name: product.fileName,
          },
          Number(`${Date.now()}${index}`),
        );
      }),
    );
    dispatch(
      addItemsToServerGallery(
        item?.galleryId,
        imageIds.map(image => {
          return {image, sale: false, price: 0};
        }),
        store => setStore(store),
      ),
    );
  };

  const pickImage = () => {
    launchImageLibrary(
      {
        maxHeight: 400,
        maxWidth: 400,
        selectionLimit: 0,
      },
      result => {
        if (result?.assets?.length) {
          addItemsToGallery(result?.assets);
        }
      },
    );
  };

  const _renderItem = ({item: product, index}) => {
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.8}
        onPress={() => {
          navigate('GalleryPhotoView', {
            item,
            product,
            ownerId
          });
        }}
        style={styles.galleryItem}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[Colors.transparent, Colors.transparent]}
          style={{borderRadius: 10, padding: 2}}>
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
              width: (width - 64) / 3,
              height: (width - 64) / 3,
            }}>
            {product?.sale && (
              <Image source={Images.saleBanner2} style={styles.saleBanner} />
            )}
          </ImageBackground>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, {paddingTop: top}]}>
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
        <View style={styles.headerPlaceholder} />
      </View>
      <View style={styles.container}>
        <FlatList
          numColumns={3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 20,
            paddingBottom: 80,
            flexGrow: 1,
            justifyContent: store?.items?.length ? undefined : 'center',
            alignItems: store?.items?.length ? undefined : 'center',
          }}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 6,
          }}
          style={{
            flex: 1,
            zIndex: 1,
          }}
          data={store?.items}
          ListEmptyComponent={() => {
            if (isCustomer) return null;
            return (
              <GradientButton
                icon={Images.camera2}
                onPress={pickImage}
                containerStyle={styles.cameraIconContainer}
                buttonStyle={styles.plusButton}
                iconSize={50}
              />
            );
          }}
          renderItem={_renderItem}
        />
      </View>
      {!!store?.items?.length && !isCustomer && (
        <GradientButton
          icon={Images.camera2}
          onPress={pickImage}
          containerStyle={styles.floatingButtonCont}
          buttonStyle={styles.plusButton}
          iconSize={24}
        />
      )}
    </View>
  );
};

export default ViewGallery;

const styles = StyleSheet.create({
  saleBanner: {
    width: 60,
    height: 60,
    resizeMode: 'stretch',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  dots: {
    height: 25,
    width: 25,
  },
  productCountCont: {
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  productCount: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: Fonts.RobotoRegular,
  },
  galleryItemInnerCont: {
    flex: 1,
    paddingHorizontal: 10,
  },
  galleryItemTitle: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: Fonts.RobotoMedium,
  },
  galleryItemDescription: {
    fontSize: 14,
    color: Colors.textGrey,
    fontFamily: Fonts.RobotoRegular,
  },
  galleryItem: {
    zIndex: 2,
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
  text: {
    fontSize: 20,
    fontFamily: Fonts.RobotoRegular,
    color: Colors.black,
  },
  plusButton: {
    marginBottom: 0,
    width: undefined,
  },
  cameraIconContainer: {
    height: 80,
    width: 80,
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 80 / 2,
  },
  plusButtonCont: {
    height: 40,
    width: 40,
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  floatingButtonCont: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    zIndex: 99,
    height: 50,
    width: 50,
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50 / 2,
  },
});
