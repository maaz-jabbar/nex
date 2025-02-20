import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {Colors, Fonts} from '../../config';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ContactAvatar, GradientButton} from '../../components';
import Images from '../../assets';
// import {galleries} from '../../dummyData';
import LinearGradient from 'react-native-linear-gradient';
import {DeleteGalleryModal, NewGalleryModal} from '../../modals';
import {useDispatch, useSelector} from 'react-redux';
import {getCustomerGalleries} from '../../redux/middlewares/gallery';
import {baseURL} from '../../config/api';

const GalleryContacts = ({route: {params}, navigation}) => {
  const {top} = useSafeAreaInsets();
  const owner = params?.owner;
  const [showPopup, setShowPopup] = useState(false);
  const [deleteGalleryModal, setDeleteGalleryModal] = useState(false);
  const [tempData, setTempData] = useState(null);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const jwt = useSelector(state => state?.user?.user?.jwt);
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    dispatch(
      getCustomerGalleries(data => {
        setGalleries(data);
      }),
    );
  };

  const _renderItem = ({item, index}) => {
    console.log('🚀 ~ const_renderItem= ~ item:', item?.userId);
    return (
      <TouchableOpacity
        onLongPress={() => {
          setShowPopup(true);
          setTempData(item);
        }}
        onPress={() => navigation.navigate('Gallery', {owner: item})}
        key={index}
        activeOpacity={0.8}
        style={styles.galleryItem}>
        <ContactAvatar
          containerStyle={{marginRight: 0}}
          displayName={false}
          contact={{userId: item?.profileId, storyAvailable: true}}
        />
        <View style={styles.galleryItemInnerCont}>
          <Text numberOfLines={1} style={styles.galleryItemTitle}>
            {item.name}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={Images.galleryCount}
            style={{
              width: 25,
              height: 25,
              resizeMode: 'contain',
              marginRight: -7,
            }}
          />
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[Colors.primary, Colors.secondary]}
            style={styles.productCountCont}>
            <Text numberOfLines={1} style={styles.productCount}>
              {item?.galleryCount < 1000 ? item?.galleryCount : '999+'}
            </Text>
          </LinearGradient>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={Images.productCount}
            style={{
              width: 25,
              height: 25,
              resizeMode: 'contain',
              marginRight: -7,
              marginLeft: 10,
            }}
          />
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[Colors.primary, Colors.secondary]}
            style={styles.productCountCont}>
            <Text numberOfLines={1} style={styles.productCount}>
              {item?.galleryProductsCount < 1000
                ? item?.galleryProductsCount
                : '999+'}
            </Text>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, {paddingTop: top}]}>
      <NewGalleryModal
        isVisible={showPopup}
        setVisible={val => {
          setShowPopup(val);
          setTempData(null);
        }}
        data={tempData}
        showDeleteGalleryModal={() => setDeleteGalleryModal(true)}
      />
      <DeleteGalleryModal
        isVisible={deleteGalleryModal}
        setVisible={setDeleteGalleryModal}
      />
      <View style={styles.header}>
        <Text style={styles.title}>Gallery</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.searchCont}>
          <Image
            source={Images.search}
            resizeMode="contain"
            style={styles.searchIcon}
          />
          <TextInput onChangeText={text => setSearch(text)} value={search} placeholder="Search" style={styles.input} />
        </View>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={getData} />
          }
          data={galleries?.filter(gallery => {
            return gallery?.name?.toLowerCase().includes(search?.toLowerCase());
          })}
          renderItem={_renderItem}
        />
      </View>
    </View>
  );
};

export default GalleryContacts;

const styles = StyleSheet.create({
  productCountCont: {
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 4,
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
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
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
    marginBottom: 10,
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
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
  plusButtonCont: {
    height: 40,
    width: 40,
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});
