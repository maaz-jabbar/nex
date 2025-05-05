import React, {useEffect, useState, useMemo} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';

import {Colors, Fonts} from '../../config';
import {GradientButton, SelectionPill} from '../../components';
import {brands} from '../../dummyData';
import {getAllProducts} from '../../redux/middlewares/profileCreation';

const makeUnique = array => {
  const seen = new Set();
  return array.filter(item => {
    if (!seen.has(item.gender)) {
      seen.add(item.gender);
      return true;
    }
    return false;
  });
};

const ChooseProduct = ({navigation}) => {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [selectedProductFor, setSelectedProductFor] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState([]);

  useEffect(() => {
    dispatch(getAllProducts(setProducts));
  }, [dispatch]);

  const uniqueProducts = useMemo(() => makeUnique(products), [products]);

  const toggleSelection = (value, list, setList, comparator = item => item) => {
    const exists = list.some(item => comparator(item) === comparator(value));
    if (exists) {
      setList(list.filter(item => comparator(item) !== comparator(value)));
    } else {
      setList([...list, value]);
    }
  };

  const isSelected = (value, list, comparator = item => item) => {
    return list.some(item => comparator(item) === comparator(value));
  };

  const genderVariationKey = item => `${item.gender}_${item.variation}`;

  const filteredProducts = useMemo(() => {
    return products.filter(p => selectedProductFor.includes(p.gender));
  }, [products, selectedProductFor]);

  const moveToLocation = () => {
    if (!selectedProductType.length) return;
    navigation.navigate('ChooseFavoriteBrands');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.mainContentContainer}
      style={styles.container}>
      <View>
        <Text style={styles.heading}>Show me product for</Text>
        <Text style={styles.smallText}>Select all that apply</Text>
        <View style={styles.positions}>
          {uniqueProducts.map(({gender}) => {
            const isAlreadySelected = selectedProductFor.includes(gender);
            return (
              <SelectionPill
                key={gender}
                title={gender}
                isSelected={isAlreadySelected}
                onPress={() => {
                  const newSelected = isAlreadySelected
                    ? selectedProductFor.filter(g => g !== gender)
                    : [...selectedProductFor, gender];

                  setSelectedProductFor(newSelected);

                  // Remove product types not matching the new genders
                  setSelectedProductType(prev =>
                    prev.filter(p => newSelected.includes(p.gender))
                  );
                }}
              />
            );
          })}
        </View>

        <Text style={styles.heading}>Product type</Text>
        <Text style={styles.smallText}>Select all that apply</Text>
        <View style={styles.positions}>
          {filteredProducts.map(product => {
            const key = genderVariationKey(product);
            return (
              <SelectionPill
                key={key}
                title={`${product.gender}'s ${product.variation}`}
                isSelected={isSelected(
                  product,
                  selectedProductType,
                  genderVariationKey,
                )}
                onPress={() =>
                  toggleSelection(
                    product,
                    selectedProductType,
                    setSelectedProductType,
                    genderVariationKey,
                  )
                }
              />
            );
          })}
        </View>
      </View>

      <GradientButton
        title="Next"
        disabled={!selectedProductType.length}
        noGradient={!selectedProductType.length}
        onPress={moveToLocation}
        buttonStyle={styles.nextButton}
        containerStyle={{backgroundColor: Colors.darkGrey, borderWidth: 0}}
      />
    </ScrollView>
  );
};

export default ChooseProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mainContentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
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
  positions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 50,
  },
  nextButton: {
    alignSelf: 'center',
    width: 150,
    marginVertical: 20,
    marginBottom: 40,
  },
});
