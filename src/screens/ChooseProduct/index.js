import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts} from '../../config';
import {GradientButton, SelectionPill} from '../../components';
import {brands, positions, productFor, productType} from '../../dummyData';
import {useDispatch} from 'react-redux';
import {getAllProducts} from '../../redux/middlewares/profileCreation';

const ChooseProduct = ({navigation}) => {
  const [selectedProductFor, setSelectedProductFor] = React.useState([]);
  const [selectedProductType, setSelectedProductType] = React.useState([]);
  const dispatch = useDispatch();
  const [products, setProducts] = React.useState([]);

  useEffect(() => {
    dispatch(
      getAllProducts(data => {
        setProducts(data);
      }),
    );
  }, []);

  const moveToLocation = () => {
    if (!selectedProductType?.length) return
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
          {products.map((position, index) => {
            const isSelected = selectedProductFor.filter(
              item => item.gender == position.gender,
            )?.length;
            const onPressPill = () => {
              if (!isSelected) {
                setSelectedProductFor([...selectedProductFor, position]);
              } else {
                setSelectedProductFor(
                  selectedProductFor.filter(
                    item => item.gender !== position.gender,
                  ),
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
            const isSelected = selectedProductType.filter(
              item =>
                item.gender + ' ' + item.variation ===
                position.gender + ' ' + position.variation,
            )?.length;
            const onPressPill = () => {
              if (!isSelected) {
                setSelectedProductType([...selectedProductType, position]);
              } else {
                setSelectedProductType(
                  selectedProductType.filter(
                    item =>
                      item.gender + ' ' + item.variation !==
                      position.gender + ' ' + position.variation,
                  ),
                );
              }
            };
            return (
              <SelectionPill
                key={index}
                title={position.gender + ' ' + position.variation}
                isSelected={isSelected}
                onPress={onPressPill}
              />
            );
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
