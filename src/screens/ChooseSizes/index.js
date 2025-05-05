import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';

import {Colors, Fonts} from '../../config';
import {GradientButton, SelectionPill} from '../../components';
import {createCustomerProfile} from '../../redux/middlewares/profileCreation';

const ChooseSizes = ({navigation, route: {params}}) => {
  const dispatch = useDispatch();
  const {selectedProductType = [], selectedBrands = []} = params || {};

  const [selectedSizesMap, setSelectedSizesMap] = useState(() => {
    const initialMap = {};
    selectedProductType.forEach((productType, idx) => {
      const key = `${productType.gender}-${productType.variation}`;
      initialMap[key] = new Set();
    });
    return initialMap;
  });

  const toggleSizeSelection = (key, size) => {
    setSelectedSizesMap(prev => {
      const updated = {...prev};
      const sizeSet = new Set(updated[key]);

      if (sizeSet.has(size)) {
        sizeSet.delete(size);
      } else {
        sizeSet.add(size);
      }

      updated[key] = sizeSet;
      return updated;
    });
  };

  const onPressCreateProfile = () => {
    if (!selectedBrands.length) return;

    const products = selectedProductType
      .map(productType => {
        const key = `${productType.gender}-${productType.variation}`;
        const selectedSizes = Array.from(selectedSizesMap[key] || []);
        if (selectedSizes.length === 0) return null;

        return {
          gender: productType.gender,
          productType: productType.variation,
          sizes: selectedSizes,
        };
      })
      .filter(Boolean);
    dispatch(
      createCustomerProfile(
        {
          profileType: 'CUSTOMER',
          favDesigner: selectedBrands,
          products,
        },
        () => navigation.navigate('Congratulations'),
      ),
    );
  };

  const isButtonDisabled = !Object.values(selectedSizesMap).some(sizeSet => sizeSet.size > 0);

  return (
    <ScrollView
      contentContainerStyle={styles.mainContentContainer}
      style={styles.container}>
      <View style={styles.pillContainer}>
        {selectedProductType.map((productType, index) => {
          const key = `${productType.gender}-${productType.variation}`;
          return (
            <View key={key}>
              <Text style={styles.heading}>
                {`${productType.gender}'s ${productType.variation} sizes`}
              </Text>
              <Text style={styles.smallText}>Select all that apply</Text>
              <ScrollView horizontal>
                {productType?.sizes?.map((size, idx) => {
                  const isSelected = selectedSizesMap[key]?.has(size);
                  return (
                    <SelectionPill
                      key={idx}
                      title={size}
                      isSelected={isSelected}
                      onPress={() => toggleSizeSelection(key, size)}
                    />
                  );
                })}
              </ScrollView>
            </View>
          );
        })}
      </View>

      <GradientButton
        title="Create Profile"
        disabled={isButtonDisabled}
        noGradient={isButtonDisabled}
        onPress={onPressCreateProfile}
        buttonStyle={styles.nextButton}
        containerStyle={styles.button}
      />
    </ScrollView>
  );
};

export default ChooseSizes;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.darkGrey,
    borderWidth: 0,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  otherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    paddingHorizontal: 20,
  },
  input: {
    paddingHorizontal: 10,
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    borderRadius: 30,
    color: Colors.black,
    fontFamily: Fonts.RobotoRegular,
    marginBottom: 10,
    height: 45,
    width: 200,
  },
  nextButton: {
    alignSelf: 'center',
    width: 150,
    marginVertical: 20,
    marginBottom: 40,
  },
});
