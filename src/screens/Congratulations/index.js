import React, {useMemo} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

import {Colors, Fonts} from '../../config';
import Images from '../../assets';
import {GradientButton} from '../../components';

const {width} = Dimensions.get('window');

const Congratulations = ({navigation}) => {
  const userType = useSelector(state => state.user?.userType);
  const isCustomer = useMemo(() => userType === 'CUSTOMER', [userType]);

  const goToAppStack = () => {
    navigation.navigate('AppStack');
  };

  const message = isCustomer
    ? `Now invite your favorite sellers &\nfriends to join Nexsa`
    : `Add customers to your\nShopspace to get started`;

  return (
    <View style={styles.container}>
      <View style={styles.topContent}>
        <Text style={styles.heading}>Congratulations!</Text>
        <Text style={styles.subHeading}>Your profile is complete.</Text>

        <Image
          source={Images.congratulations}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.subHeading}>{message}</Text>

        {!isCustomer && (
          <GradientButton
            title="Import Contacts"
            onPress={() => {}}
            buttonStyle={styles.button}
            containerStyle={styles.noHorizontalPadding}
          />
        )}

        <GradientButton
          title="Invite Link"
          onPress={() => {}}
          icon={Images.link}
          iconSize={20}
          noGradient
          iconStyle={styles.linkIcon}
          buttonStyle={styles.button}
          textStyle={styles.linkText}
        />

        <Text style={styles.editProfile}>
          Add/invite customers in Contacts or Settings
        </Text>
      </View>

      <GradientButton
        title="Done"
        onPress={goToAppStack}
        buttonStyle={styles.button}
        containerStyle={styles.noHorizontalPadding}
      />
    </View>
  );
};

export default Congratulations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  topContent: {
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    color: Colors.black,
    fontFamily: Fonts.JosefinSansSemiBold,
  },
  subHeading: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.black,
    fontFamily: Fonts.RobotoRegular,
    marginVertical: 20,
  },
  image: {
    width: width / 2,
    height: width / 2,
    marginTop: 20,
  },
  button: {
    width: 150,
  },
  noHorizontalPadding: {
    paddingHorizontal: 0,
  },
  linkIcon: {
    tintColor: Colors.black,
  },
  linkText: {
    color: Colors.black,
    marginLeft: 10,
  },
  editProfile: {
    color: Colors.darkGrey,
    fontSize: 12,
    fontFamily: Fonts.RobotoRegular,
    marginTop: 10,
  },
});
