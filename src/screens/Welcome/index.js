import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts} from '../../config';
import {GradientButton} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {
  createAgentProfile,
  createCustomerProfile,
} from '../../redux/middlewares/profileCreation';

const Welcome = ({navigation}) => {
  const userType = useSelector(state => state.user?.userType);
  const id = useSelector(state => state.user?.user?.userId);
  const isCustomer = userType === 'CUSTOMER';
  const dispatch = useDispatch();

  const moveToProfileCreation = () => {
    if (isCustomer) {
      navigation.navigate('ChooseProduct');
    } else {
      navigation.navigate('ChoosePosition');
    }
  };

  const skip = () => {
    if (isCustomer) {
      dispatch(
        createCustomerProfile(
          {
            profileType: 'CUSTOMER',
            favDesigner: [],
            products: [],
          },
          () => navigation.navigate('Congratulations'),
        ),
      );
    } else {
      dispatch(
        createAgentProfile(
          id,
          {
            profileType: 'AGENT',
            position: '',
            links: [],
            bio: '',
          },
          () => navigation.navigate('Congratulations'),
        ),
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.letsCreate}>Let's create your profile</Text>
      <GradientButton
        title="Next"
        onPress={moveToProfileCreation}
        buttonStyle={styles.nextButton}
      />
      <Text style={styles.skip} onPress={skip}>
        Skip - edit profile in Settings
      </Text>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  letsCreate: {
    fontSize: 20,
    textAlign: 'center',
    color: Colors.black,
    fontFamily: Fonts.JosefinSansSemiBold,
    marginBottom: 10,
  },
  nextButton: {
    alignSelf: 'center',
    width: 150,
    marginVertical: 20,
  },
  skip: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.secondary,
    fontFamily: Fonts.RobotoRegular,
    textDecorationLine: 'underline',
  },
});
