import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Colors, Fonts} from '../../config';
import Images from '../../assets';
import GradientButton from '../../components/GradientButton';
import LinearGradient from 'react-native-linear-gradient';

const data = [
  {
    image: Images.onboarding1,
    title: 'Create\nMass Message',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
  },
  {
    image: Images.onboarding1,
    title: 'Create\nMass Message',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
  },
  {
    image: Images.onboarding1,
    title: 'Create\nMass Message',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
  },
];

const Onboarding = () => {
  const {width} = Dimensions.get('screen');

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const flatlistRef = React.useRef(null);

  const _renderItem = ({item, index}) => {
    return (
      <View style={[styles.item, {width}]} key={index}>
        <Image
          source={item.image}
          style={{width: 250, height: 250}}
          resizeMode="contain"
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  const _pageIndicator = () => {
    return (
      <View style={styles.pageIndicatorContainer}>
        <GradientButton
          title="Next"
          onPress={() => {
            if (currentIndex === data.length - 1) {
              return;
            }
            flatlistRef.current.scrollToIndex({
              index: currentIndex + 1,
              viewOffset: 0,
              viewPosition: 0,
            });
          }}
          buttonStyle={{width: 200, marginTop: 20}}
          containerStyle={{justifyContent: 'center'}}
          textStyle={{marginLeft: 0}}
        />

        <Text style={styles.skip}>Skip</Text>
        <View style={styles.pageIndicator}>
          {data.map((_, index) => (
            <LinearGradient
              colors={
                index === currentIndex
                  ? [Colors.primary, Colors.secondary]
                  : [Colors.darkGrey, Colors.darkGrey]
              }
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.dot}
              key={index}
            />
          ))}
        </View>
      </View>
    );
  };

  const _changeIndex = ({nativeEvent}) => {
    const totalWidth = nativeEvent.layoutMeasurement.width;
    const xPosition = nativeEvent.contentOffset.x;
    const newIndex = Math.round(xPosition / totalWidth);
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        ref={flatlistRef}
        horizontal
        pagingEnabled
        data={data}
        renderItem={_renderItem}
        style={{flex: 1}}
        showsHorizontalScrollIndicator={false}
        onScroll={_changeIndex}
      />
      {_pageIndicator()}
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
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
  skip: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: Fonts.RobotoMedium,
    color: Colors.secondary,
    marginTop: 20,
  },
  dot: {
    width: 13,
    height: 13,
    borderRadius: 13 / 2,
    marginHorizontal: 5,
  },
  pageIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    marginBottom: 40,
  },
  pageIndicatorContainer: {
    alignItems: 'center',
  },
});
