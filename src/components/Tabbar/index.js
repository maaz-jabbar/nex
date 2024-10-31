import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, Fonts} from '../../config';
import Images from '../../assets';

const labels = ['Chat', 'Gallery', 'Home', 'Contacts', 'Settings'];

const TabbarCustom = ({state, navigation}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom ? insets.bottom : insets.bottom + 10,
        },
      ]}>
      {state.routes.map((route, index) => {
        const label = labels[index];

        const isFocused = state.index === index;

        let iconSource;
        if (label === 'Chat') {
          iconSource = isFocused ? Images.chatFocused : Images.chat;
        } else if (label === 'Contacts') {
          iconSource = isFocused ? Images.contactsFocused : Images.contacts;
        } else if (label === 'Settings') {
          iconSource = isFocused ? Images.settingsFocused : Images.settings;
        } else if (label === 'Home') {
          iconSource = isFocused ? Images.homeFocused : Images.home;
        } else if (label === 'Gallery') {
          iconSource = isFocused ? Images.galleryFocused : Images.gallery;
        }

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <TouchableOpacity
            key={label}
            activeOpacity={0.8}
            onPress={onPress}
            style={styles.tab}>
            <Image
              source={iconSource}
              resizeMode="contain"
              style={styles.icon}
            />
            <Text
              style={{
                color: isFocused ? Colors.black : Colors.darkerGrey,
                ...styles.label,
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabbarCustom;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: Fonts.RobotoRegular,
  },
  icon: {
    width: 25,
    height: 25,
    marginBottom: 5,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
