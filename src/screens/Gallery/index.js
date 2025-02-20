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
import {getAgentGalleries} from '../../redux/middlewares/gallery';
import {baseURL} from '../../config/api';

const Gallery = ({route: {params}, navigation: {goBack, navigate}}) => {
  const {top} = useSafeAreaInsets();
  const owner = params?.owner;
  const [showPopup, setShowPopup] = useState(false);
  const [deleteGalleryModal, setDeleteGalleryModal] = useState(false);
  const [tempData, setTempData] = useState(null);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const jwt = useSelector(state => state?.user?.user?.jwt);
  const galleries = useSelector(state => state?.galleries?.galleries);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    dispatch(getAgentGalleries(owner?.userId || null));
  };

  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onLongPress={() => {
          if (owner?.userId) {
            return;
          }
          setShowPopup(true);
          setTempData(item);
        }}
        onPress={() => navigate('ViewGallery', {item, ownerId: owner?.profileId})}
        key={index}
        activeOpacity={0.8}
        style={styles.galleryItem}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[Colors.primary, Colors.secondary]}
          style={{borderRadius: (60 + 4) / 2, padding: 2}}>
          <Image
            source={{
              uri: `${baseURL}/images/upload/${item.coverImage}`,
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }}
            resizeMode="cover"
            style={{
              width: 60,
              height: 60,
              borderRadius: 60 / 2,
              borderWidth: 2,
              borderColor: Colors.white,
            }}
          />
        </LinearGradient>
        <View style={styles.galleryItemInnerCont}>
          <Text numberOfLines={1} style={styles.galleryItemTitle}>
            {item.name}
          </Text>
          <Text numberOfLines={1} style={styles.galleryItemDescription}>
            {item.description}
          </Text>
        </View>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[Colors.primary, Colors.secondary]}
          style={styles.productCountCont}>
          <Text numberOfLines={1} style={styles.productCount}>
            {item?.items?.length < 1000 ? item?.items?.length : '999+'}
          </Text>
        </LinearGradient>
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
        showDeleteGalleryModal={galleryId => setDeleteGalleryModal(galleryId)}
      />
      <DeleteGalleryModal
        isVisible={deleteGalleryModal}
        setVisible={setDeleteGalleryModal}
      />
      <View
        style={[styles.header, {paddingVertical: owner?.profileId ? 20 : 10}]}>
        {owner?.profileId ? (
          <TouchableOpacity onPress={goBack}>
            <Image
              resizeMode="contain"
              source={Images.back}
              style={styles.dots}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.headerPlaceholder} />
        )}
        <Text style={styles.title}>
          {owner?.name ? owner?.name : 'Gallery'}
        </Text>
        {owner?.profileId ? (
          <View style={styles.headerPlaceholder} />
        ) : (
          <GradientButton
            icon={Images.plus}
            onPress={() => setShowPopup(true)}
            containerStyle={styles.plusButtonCont}
            buttonStyle={styles.plusButton}
            iconSize={24}
          />
        )}
      </View>
      <View style={styles.container}>
        <View style={styles.searchCont}>
          <Image
            source={Images.search}
            resizeMode="contain"
            style={styles.searchIcon}
          />
          <TextInput
            onChangeText={setSearch}
            value={search}
            placeholder="Search"
            style={styles.input}
          />
        </View>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={getData} />
          }
          ListEmptyComponent={() => {
            return (
              <View style={{alignItems: 'center', marginTop: 100}}>
                <Text
                  style={{
                    fontFamily: Fonts.RobotoRegular,
                    color: Colors.black,
                    fontSize: 16,
                  }}>
                  No Galleries to show
                </Text>
              </View>
            );
          }}
          data={galleries?.filter(gallery => {
            return gallery?.name?.toLowerCase().includes(search?.toLowerCase());
          })}
          renderItem={_renderItem}
        />
      </View>
    </View>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  dots: {
    height: 25,
    width: 25,
  },
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
    paddingVertical: 10,
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
