import React, {useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {Colors, Fonts} from '../../config';
import Images from '../../assets';
import GradientButton from '../../components/GradientButton';
import LinearGradient from 'react-native-linear-gradient';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const onboardingData = [
  {
    image: Images.onboarding1,
    title: 'Create\nMass Message',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    image: Images.onboarding1,
    title: 'Create\nMass Message',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    image: Images.onboarding1,
    title: 'Create\nMass Message',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];

const Onboarding = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleNext = () => {
    if (currentIndex === onboardingData.length - 1) {
      navigation.navigate('LoginSignup', {loginActive: false});
    } else {
      flatListRef.current.scrollToIndex({index: currentIndex + 1});
    }
  };

  const handleScroll = ({nativeEvent}) => {
    const newIndex = Math.round(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  const renderItem = ({item}) => (
    <View style={[styles.itemContainer, {width: SCREEN_WIDTH}]}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  const renderPagination = () => (
    <View style={styles.paginationContainer}>
      <GradientButton
        title="Next"
        onPress={handleNext}
        buttonStyle={styles.nextButton}
      />
      <Text
        onPress={() => navigation.navigate('LoginSignup', {loginActive: false})}
        style={styles.skip}>
        Skip
      </Text>
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
        onScroll={handleScroll}
      />
      {renderPagination()}
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: Colors.black,
    fontFamily: Fonts.RobotoMedium,
    marginHorizontal: 50,
    marginVertical: 30,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: Colors.black,
    fontFamily: Fonts.RobotoRegular,
    marginHorizontal: 30,
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
    marginVertical: 30,
  },
  dot: {
    width: 13,
    height: 13,
    borderRadius: 6.5,
    marginHorizontal: 5,
  },
});
