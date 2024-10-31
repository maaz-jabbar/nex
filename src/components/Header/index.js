import React, {useEffect} from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Colors, Fonts} from '../../config';
import Images from '../../assets';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Header = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const _goBack = () => {
    navigation.goBack();
  };
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
        },
      ]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={_goBack}
          activeOpacity={0.8}
          style={styles.backButton}>
          <Image source={Images.back} style={styles.backIcon} />
          <Text style={styles.back}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  backIcon: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  container: {
    paddingTop: 50,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    paddingVertical: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  back: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 15,
    color: Colors.black,
  },
});
