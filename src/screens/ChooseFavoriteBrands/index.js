import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
} from 'react-native';
import {useDispatch} from 'react-redux';

import {Colors, Fonts} from '../../config';
import {GradientButton, SelectionPill} from '../../components';
import {
  createCustomerProfile,
  getAllBrands,
} from '../../redux/middlewares/profileCreation';

const ChooseFavoriteBrands = ({navigation:{navigate}, route: {params}}) => {
  const dispatch = useDispatch();

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [brands, setBrands] = useState([]);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [customBrand, setCustomBrand] = useState('');
  const {selectedProductType} = params || {};

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

  const handleAddCustomBrand = () => {
    const trimmed = customBrand.trim();
    if (trimmed && !selectedBrands.includes(trimmed)) {
      setSelectedBrands(prev => [...prev, trimmed]);
      setBrands(prev => [...prev, {designerName: trimmed}]);
    }
    setCustomBrand('');
    setShowOtherInput(false);
    Keyboard.dismiss();
  };

  const moveToSizesSelection = () => {
    if (!selectedBrands.length) return;
    navigate('ChooseSizes', {
      selectedBrands,
      selectedProductType,
    })
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
        <View style={styles.otherContainer}>
          <SelectionPill
            title="Other"
            isSelected={showOtherInput}
            onPress={() => {
              setShowOtherInput(!showOtherInput);
              setCustomBrand('');
            }}
          />
          {showOtherInput && (
            <TextInput
              style={styles.input}
              placeholder="Enter other brand"
              placeholderTextColor={Colors.lightGrey}
              value={customBrand}
              onChangeText={setCustomBrand}
              onSubmitEditing={handleAddCustomBrand}
              returnKeyType="done"
            />
          )}
        </View>
      </View>

      <GradientButton
        title="Next"
        disabled={!selectedBrands.length}
        noGradient={!selectedBrands.length}
        onPress={moveToSizesSelection}
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
    flexWrap: 'wrap',
    flexDirection: 'row',
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
