import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts} from '../../config';
import {GradientButton, SelectionPill} from '../../components';
import {brands, positions, productFor, productType} from '../../dummyData';
import {useDispatch} from 'react-redux';
import {getAllProducts} from '../../redux/middlewares/profileCreation';

const makeUnique = array => {
  const newArray = [];
  array.forEach(item => {
    if (!newArray.filter(item1 => item1.gender === item.gender).length) {
      newArray.push(item);
    }
  });
  return newArray;
};

const ChooseProduct = ({navigation}) => {
  const [selectedProductFor, setSelectedProductFor] = React.useState([]);
  const [selectedProductType, setSelectedProductType] = React.useState([]);
  const dispatch = useDispatch();
  const [products, setProducts] = React.useState([]);
  const uniqueProducts = makeUnique(products);

  useEffect(() => {
    dispatch(
      getAllProducts(data => {
        setProducts(data);
      }),
    );
  }, []);

  const moveToLocation = () => {
    if (!selectedProductType?.length) return;
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
          {uniqueProducts.map((position, index) => {
            const isSelected = selectedProductFor.filter(
              item => item == position.gender,
            )?.length;
            const onPressPill = () => {
              if (!isSelected) {
                setSelectedProductFor([...selectedProductFor, position.gender]);
              } else {
                setSelectedProductFor(
                  selectedProductFor.filter(item => item !== position.gender),
                );
              }
            };
            return (
              <SelectionPill
                key={index}
                title={position.gender}
                isSelected={isSelected}
                onPress={onPressPill}
              />
            );
          })}
        </View>
        <Text style={styles.heading}>Product type</Text>
        <Text style={styles.smallText}>Select all that apply</Text>
        <View style={styles.positions}>
          {selectedProductFor.map((position, index) => {
            return products
              .filter(item => item.gender == position)
              .map((gender, genderIndex) => {
                const isSelected = selectedProductType.filter(
                  filtered =>
                    filtered.gender + ' ' + filtered.variation ===
                    gender.gender + ' ' + gender.variation,
                ).length;
                const onPressPill = () => {
                  if (!isSelected) {
                    setSelectedProductType([...selectedProductType, gender]);
                  } else {
                    setSelectedProductType(
                      selectedProductType.filter(
                        filtered =>
                          filtered.gender + ' ' + filtered.variation !==
                          gender.gender + ' ' + gender.variation,
                      ),
                    );
                  }
                };
                return (
                  <SelectionPill
                    key={genderIndex}
                    title={gender.gender + "'s " + gender.variation}
                    isSelected={isSelected}
                    onPress={onPressPill}
                  />
                );
              });
          })}
        </View>
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

export default ChooseProduct;

const styles = StyleSheet.create({
  smallText: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 12,
    color: Colors.lightGrey,
    textAlign: 'center',
    marginBottom: 20,
  },
  nextButton: {
    alignSelf: 'center',
    width: 150,
    marginVertical: 20,
    marginBottom: 40,
  },
  scrollablePositionsContent: {
    minWidth: '100%',
    maxWidth: brands.length * 30,
    marginLeft: 20,
    flexWrap: 'wrap',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    color: Colors.black,
    fontFamily: Fonts.JosefinSansSemiBold,
    marginVertical: 10,
  },
  positions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 50,
  },
  scrollablePositions: {},
  mainContentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});
