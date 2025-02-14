import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {Colors, Fonts} from '../../config';
import {GradientButton, SelectionPill} from '../../components';
import {
  createCustomerProfile,
  getAllBrands,
} from '../../redux/middlewares/profileCreation';
import {useDispatch} from 'react-redux';

const ChooseFavoriteBrands = ({navigation}) => {
  const [selectedBrands, setSelectedBrands] = React.useState([]);
  const dispatch = useDispatch();

  const [brands, setBrands] = React.useState([]);

  useEffect(() => {
    dispatch(
      getAllBrands(data => {
        setBrands(data);
      }),
    );
  }, []);

  const moveToLocation = () => {
    if (!selectedBrands?.length) return;
    dispatch(
      createCustomerProfile(
        {
          profileType: 'CUSTOMER',
          favDesigner: [...selectedBrands],
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
        () => {
          navigation.navigate('Congratulations');
        },
      ),
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.mainContentContainer}
      style={styles.container}>
      <Text style={styles.heading}>Favorite designers & brands</Text>
      <Text style={styles.smallText}>Select all that apply</Text>
      {!!brands?.length && (
        <ScrollView
          horizontal
          contentContainerStyle={[
            styles.scrollablePositionsContent,
            {maxWidth: brands.length * 30},
          ]}
          style={styles.scrollablePositions}>
          {brands.map((position, index) => {
            const isSelected = selectedBrands.includes(position.designerName);
            const onPressPill = () => {
              if (!isSelected) {
                setSelectedBrands([...selectedBrands, position.designerName]);
              } else {
                setSelectedBrands(
                  selectedBrands.filter(item => item !== position.designerName),
                );
              }
            };
            return (
              <SelectionPill
                key={index}
                title={position.designerName}
                isSelected={isSelected}
                onPress={onPressPill}
              />
            );
          })}
        </ScrollView>
      )}

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
  },
  scrollablePositions: {},
  mainContentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});
