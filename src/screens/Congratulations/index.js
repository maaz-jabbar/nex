import React, {useEffect} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts} from '../../config';
import Images from '../../assets';
import {GradientButton} from '../../components';
import {useSelector} from 'react-redux';

const {width} = Dimensions.get('window');

const Congratulations = ({navigation}) => {
  const userType = useSelector(state => state.user?.userType);
  const isCustomer = userType === 'CUSTOMER';

  const goToAppStack = () => {
    navigation.navigate('AppStack');
  };

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.heading}>Congratulations!</Text>
        <Text style={styles.subHeading}>Your profile is complete.</Text>
        <Image
          source={Images.congratulations}
          style={{width: width / 2, height: width / 2, marginTop: 20}}
          resizeMode="contain"
        />
        <Text style={styles.subHeading}>
          {isCustomer
            ? `Now invite your favorite sellers &${'\n'}friends to join Nexsa`
            : `Add customers to your${'\n'}Shopspace to get started`}
        </Text>
        {!isCustomer && (
          <GradientButton
            title="Import Contacts"
            onPress={() => {}}
            buttonStyle={{width: 150}}
            containerStyle={{paddingHorizontal: 0}}
          />
        )}
        <GradientButton
          title="Invite Link"
          onPress={() => {}}
          icon={Images.link}
          iconSize={20}
          noGradient
          iconStyle={{tintColor: Colors.black}}
          buttonStyle={{width: 150}}
          textStyle={{color: Colors.black, marginLeft: 10}}
        />
        <Text style={styles.editProfile}>
          Add/invite customers in Contacts or Settings
        </Text>
      </View>
      <GradientButton
        title="Done"
        onPress={goToAppStack}
        buttonStyle={{width: 150}}
        containerStyle={{paddingHorizontal: 0}}
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
  editProfile: {
    color: Colors.darkGrey,
    fontSize: 12,
    fontFamily: Fonts.RobotoRegular,
  },
});
