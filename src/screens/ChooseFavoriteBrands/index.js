import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';

import {Colors, Fonts} from '../../config';
import {GradientButton, SelectionPill} from '../../components';
import {
  createCustomerProfile,
  getAllBrands,
} from '../../redux/middlewares/profileCreation';

const ChooseFavoriteBrands = ({navigation}) => {
  const dispatch = useDispatch();

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    dispatch(
      getAllBrands(data => {
        setBrands(data);
      }),
    );
  }, []);

  const toggleBrand = brand => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(item => item !== brand)
        : [...prev, brand],
    );
  };

  const moveToLocation = () => {
    if (!selectedBrands.length) return;

    dispatch(
      createCustomerProfile(
        {
          profileType: 'CUSTOMER',
          favDesigner: selectedBrands,
          products: [
            {
              gender: 'men',
              productType: 'Shoes',
              sizes: ['xl', 'xxl', 'ml'],
            },
            {
              gender: 'women',
              productType: 'apprel',
              sizes: ['xl', 'xxl', 'ml'],
            },
            {
              gender: 'women',
              productType: 'Shoes',
              sizes: ['xl', 'xxl', 'ml'],
            },
            {
              gender: 'men',
              productType: 'apprel',
              sizes: ['xl', 'xxl', 'ml'],
            },
          ],
        },
        () => navigation.navigate('Congratulations'),
      ),
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.mainContentContainer}
      style={styles.container}>
      <Text style={styles.heading}>Favorite designers & brands</Text>
      <Text style={styles.smallText}>Select all that apply</Text>

      <View style={styles.pillContainer}>
        {brands.map((brand, index) => (
          <SelectionPill
            key={index}
            title={brand.designerName}
            isSelected={selectedBrands.includes(brand.designerName)}
            onPress={() => toggleBrand(brand.designerName)}
          />
        ))}
      </View>

      <GradientButton
        title="Next"
        onPress={moveToLocation}
        buttonStyle={styles.nextButton}
        containerStyle={{backgroundColor: Colors.darkGrey, borderWidth: 0}}
      />
    </ScrollView>
  );
};

export default ChooseFavoriteBrands;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mainContentContainer: {
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    color: Colors.black,
    fontFamily: Fonts.JosefinSansSemiBold,
    marginVertical: 10,
  },
  smallText: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 12,
    color: Colors.lightGrey,
    textAlign: 'center',
    marginBottom: 20,
  },
  pillContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  nextButton: {
    alignSelf: 'center',
    width: 150,
    marginVertical: 20,
    marginBottom: 40,
  },
});
