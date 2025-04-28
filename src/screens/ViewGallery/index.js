import React, {useEffect, useState, useCallback} from 'react';
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
import {uploadMediaAsync} from '../../redux/middlewares/chat';
import {addItemsToServerGallery} from '../../redux/middlewares/gallery';
import {useDispatch, useSelector} from 'react-redux';
import {baseURL} from '../../config/api';
const {width} = Dimensions.get('screen');

const ViewGallery = ({route, navigation}) => {
  const {top} = useSafeAreaInsets();
  const {item, ownerId} = route.params;
  const [store, setStore] = useState(item);
  const {jwt, userType} = useSelector(state => state?.user?.user);
  const isCustomer = userType === 'CUSTOMER';
  const dispatch = useDispatch();

  useEffect(() => {
    setStore(item);
  }, [item]);

  const addItemsToGallery = useCallback(
    async products => {
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
          imageIds.map(image => ({image, sale: false, price: 0})),
          setStore,
        ),
      );
    },
    [dispatch, item?.galleryId],
  );

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

  const _renderItem = ({item: product, index}) => (
    <TouchableOpacity
      key={index}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('GalleryPhotoView', {item, product, ownerId})
      }
      style={styles.galleryItem}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[Colors.transparent, Colors.transparent]}
        style={styles.linearGradient}>
        <ImageBackground
          source={{
            uri: `${baseURL}/images/upload/${product.image}`,
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }}
          resizeMode="cover"
          imageStyle={{borderRadius: 10}}
          style={styles.imageBackground}>
          {product?.sale && (
            <Image source={Images.saleBanner2} style={styles.saleBanner} />
          )}
        </ImageBackground>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, {paddingTop: top}]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Image
            resizeMode="contain"
            source={Images.back}
            style={styles.dots}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{store?.name || 'Gallery'}</Text>
        <View style={styles.headerPlaceholder} />
      </View>
      <View style={styles.container}>
        <FlatList
          numColumns={3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.flatListContentContainer,
            {
              justifyContent: store?.items?.length ? undefined : 'center',
              alignItems: store?.items?.length ? undefined : 'center',
            },
          ]}
          style={styles.flatList}
          data={store?.items}
          ListEmptyComponent={() =>
            !isCustomer && (
              <GradientButton
                icon={Images.camera2}
                onPress={pickImage}
                containerStyle={styles.cameraIconContainer}
                buttonStyle={styles.plusButton}
                iconSize={50}
              />
            )
          }
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
    height: 40,
    resizeMode: 'contain',
    width: 25,
  },
  headerPlaceholder: {
    width: 25,
    height: 40,
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
  plusButton: {
    marginBottom: 0,
    width: undefined,
  },
  cameraIconContainer: {
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  floatingButtonCont: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    zIndex: 99,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  galleryItem: {
    zIndex: 2,
    justifyContent:'center',
    alignItems:'center',
    width: (width - 40) / 3,
    height: (width - 40) / 3,
  },
  flatListContentContainer: {
    padding: 20,
    paddingBottom: 80,
    flexGrow: 1,
  },
  flatList: {
    flex: 1,
    zIndex: 1,
  },
  linearGradient: {
    borderRadius: 10,
    padding: 2,
  },
  imageBackground: {
    width: (width - 64) / 3,
    height: (width - 64) / 3,
    borderRadius: 10,
  },
});
