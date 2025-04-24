import React, {useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, Fonts} from '../../config';
import Images from '../../assets';
import GradientButton from '../../components/GradientButton';
import LinearGradient from 'react-native-linear-gradient';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const onboardingDataCustomer = [
  {
    image: Images.onboarding1Customer,
    title: 'Your Personal SA Network, All in One Place',
    description:
      'Stay connected to your favorite SAs and explore new connections instantly.',
  },
  {
    image: Images.onboarding2Customer,
    title: 'Smart Shopping, Designed around you',
    description:
      'Get curated reccomendations based on your preferences and style.',
  },
  {
    image: Images.onboarding3Seller,
    title: 'Real-Time Updates & Shared Gallery',
    description:
      'See fresh arrivals, comment, and continue the conversation in chat.',
  },
];
const onboardingDataSeller = [
  {
    image: Images.onboarding1Seller,
    title: 'Effortless Client Management',
    description:
      'Organize messaging and tracking with editable, customer preferences.',
  },
  {
    image: Images.onboarding2Seller,
    title: 'Broadcast Chat & SMS with Attachments',
    description:
      'Reach multiple customers instantly while keeping chats one-on-one.',
  },
  {
    image: Images.onboarding3Seller,
    title: 'Shared Gallery with Chat Response',
    description:
      'Transform your gallery into an interactive shopping experience.',
  },
];

const Onboarding = ({navigation, route: {params}}) => {
  const flatListRef = useRef(null);
  const customerType = params?.customerType;
  const isCustomer = customerType === 'CUSTOMER';
  const onboardingData = isCustomer
    ? onboardingDataCustomer
    : onboardingDataSeller;

  const handleNext = currentIndex => {
    if (currentIndex === onboardingData.length - 1) {
      navigation.navigate('LoginSignup', {loginActive: false});
    } else {
      flatListRef.current.scrollToIndex({index: currentIndex + 1});
    }
  };

  const renderItem = ({item, index}) => (
    <View style={[styles.itemContainer, {width: SCREEN_WIDTH}]}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          height: 100,
          width: 100,
          zIndex: 99,
        }}
        onPress={() => handleNext(onboardingData.length - 1)}
      />
      <Image
        source={item.image}
        style={{width: SCREEN_WIDTH, height: '68%'}}
        resizeMode="stretch"
      />
      <View
        style={{
          padding: 30,
          paddingVertical: 10,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        {renderPagination(index)}
        <GradientButton
          title={index === onboardingData.length - 1 ? "Let's Explore" : 'Next'}
          onPress={() => handleNext(index)}
        />
      </View>
    </View>
  );

  const renderPagination = currentIndex => (
    <View style={styles.dotsContainer}>
      {onboardingData.map((_, index) => (
        <LinearGradient
          key={index}
          colors={
            index === currentIndex
              ? [Colors.primary, Colors.secondary]
              : [Colors.darkGrey, Colors.darkGrey]
          }
          style={styles.dot}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={onboardingData}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  itemContainer: {
    backgroundColor: Colors.white,
  },
  image: {
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: '#212226',
    fontFamily: Fonts.RobotoMedium,
    marginHorizontal: 10,
    textTransform: 'capitalize',
  },
  description: {
    marginHorizontal: 10,
    fontSize: 14,
    textAlign: 'center',
    color: '#2E313D',
    fontFamily: Fonts.RobotoRegular,
  },
  paginationContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  nextButton: {
    width: 150,
    marginTop: 20,
  },
  skip: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: Fonts.RobotoMedium,
    color: Colors.secondary,
    marginTop: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 6.5,
    marginHorizontal: 10,
  },
});
