import React, {useEffect, useState, useCallback} from 'react';
import {
  Image,
  TextInput,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

import {Colors, Fonts} from '../../config';
import {GradientButton} from '../../components';
import {DeleteGalleryModal, NewGalleryModal} from '../../modals';
import {getAgentGalleries} from '../../redux/middlewares/gallery';
import {baseURL} from '../../config/api';
import Images from '../../assets';
import LinearGradient from 'react-native-linear-gradient';

const Gallery = ({route: {params}, navigation: {goBack, navigate}}) => {
  const {top} = useSafeAreaInsets();
  const owner = params?.owner;

  const dispatch = useDispatch();
  const jwt = useSelector(state => state?.user?.user?.jwt);
  const galleries = useSelector(state => state?.galleries?.galleries);

  const [showPopup, setShowPopup] = useState(false);
  const [deleteGalleryModal, setDeleteGalleryModal] = useState(false);
  const [tempData, setTempData] = useState(null);
  const [search, setSearch] = useState('');

  const getData = useCallback(() => {
    dispatch(getAgentGalleries(owner?.userId || null));
  }, [dispatch, owner?.userId]);

  useEffect(() => {
    getData();
  }, [getData]);

  const filteredGalleries = galleries?.filter(gallery =>
    gallery?.name?.toLowerCase().includes(search.toLowerCase()),
  );

  const _renderItem = ({item}) => (
    <TouchableOpacity
      onLongPress={() => {
        if (!owner?.userId) {
          setShowPopup(true);
          setTempData(item);
        }
      }}
      onPress={() => navigate('ViewGallery', {item, ownerId: owner?.profileId})}
      activeOpacity={0.8}
      style={styles.galleryItem}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[Colors.primary, Colors.secondary]}
        style={styles.avatarBorder}>
        <Image
          source={{
            uri: `${baseURL}/images/upload/${item.coverImage}`,
            headers: {Authorization: `Bearer ${jwt}`},
          }}
          resizeMode="cover"
          style={styles.galleryImage}
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

  return (
    <View style={[styles.container, {paddingTop: top}]}>
      <NewGalleryModal
        isVisible={showPopup}
        setVisible={val => {
          setShowPopup(val);
          setTempData(null);
        }}
        data={tempData}
        showDeleteGalleryModal={setDeleteGalleryModal}
      />

      <DeleteGalleryModal
        isVisible={deleteGalleryModal}
        setVisible={setDeleteGalleryModal}
      />

      <View
        style={[styles.header, {paddingVertical: owner?.profileId ? 20 : 10}]}>
        {owner?.profileId ? (
          <TouchableOpacity onPress={goBack}>
            <Image source={Images.back} style={styles.dots} />
          </TouchableOpacity>
        ) : (
          <View style={styles.headerPlaceholder} />
        )}
        <Text style={styles.title}>{owner?.name ? owner.name : 'Gallery'}</Text>
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
          <Image source={Images.search} style={styles.searchIcon} />
          <TextInput
            onChangeText={setSearch}
            value={search}
            placeholder="Search"
            style={styles.input}
          />
        </View>

        <FlatList
          data={filteredGalleries}
          keyExtractor={item => item._id?.toString()}
          renderItem={_renderItem}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={getData} />
          }
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No Galleries to show</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Gallery;

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
  },
  title: {
    color: Colors.black,
    fontSize: 24,
    fontFamily: Fonts.RobotoBold,
  },
  headerPlaceholder: {
    width: 40,
  },
  dots: {
    height: 25,
    width: 25,
  },
  plusButton: {
    width: undefined,
    marginBottom: 0,
  },
  plusButtonCont: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  searchCont: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 50,
    margin: 10,
    marginHorizontal: 20,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: 48,
    fontFamily: Fonts.RobotoRegular,
    color: Colors.black,
  },
  galleryItem: {
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  galleryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  avatarBorder: {
    borderRadius: 32,
    padding: 2,
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
  emptyContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontFamily: Fonts.RobotoRegular,
    color: Colors.black,
    fontSize: 16,
  },
});
