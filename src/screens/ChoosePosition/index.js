import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts} from '../../config';
import {GradientButton, SelectionPill} from '../../components';

const positions = [
  {
    id: 1,
    name: 'Department store sales',
  },
  {
    id: 2,
    name: 'Boutique Sales',
  },
  {
    id: 3,
    name: 'Other',
  },
];

const brands = [
  {id: 1, name: 'Nike'},
  {id: 2, name: 'Louis Vuitton'},
  {id: 3, name: 'Chanel'},
  {id: 4, name: 'Hermes'},
  {id: 5, name: 'Gucci'},
  {id: 6, name: 'Dior'},
  {id: 7, name: 'Adidas'},
  {id: 8, name: 'Rolex'},
  {id: 9, name: 'Zara'},
  {id: 10, name: 'H&M'},
  {id: 11, name: 'Cartier'},
  {id: 12, name: 'Uniqlo'},
  {id: 13, name: 'Prada'},
  {id: 14, name: 'Tiffany & Co.'},
  {id: 15, name: 'Coach'},
  {id: 16, name: 'Burberry'},
  {id: 17, name: 'Sephora'},
  {id: 18, name: 'Lululemon'},
  {id: 19, name: 'Moncler'},
  {id: 20, name: 'Patek Philippe'},
  {id: 21, name: 'Zalando'},
  {id: 22, name: 'Chow Tai Fook'},
  {id: 23, name: 'Swarovski'},
  {id: 24, name: 'Polo Ralph Lauren'},
  {id: 25, name: 'Tom Ford'},
  {id: 26, name: 'The North Face'},
  {id: 27, name: "Levi's"},
  {id: 28, name: "Victoria's Secret"},
  {id: 29, name: 'Next'},
  {id: 30, name: 'New Balance'},
  {id: 31, name: 'Michael Kors'},
  {id: 32, name: 'Skechers'},
  {id: 33, name: 'TJ Maxx'},
  {id: 34, name: 'Under Armour'},
  {id: 35, name: 'Nordstrom'},
  {id: 36, name: 'C&A'},
  {id: 37, name: 'Chopard'},
  {id: 38, name: 'Dolce & Gabbana'},
  {id: 39, name: 'Christian Louboutin'},
  {id: 40, name: 'Omega'},
  {id: 41, name: 'Foot Locker Inc.'},
  {id: 42, name: 'Ray Ban'},
  {id: 43, name: "Macy's"},
  {id: 44, name: 'Asics'},
  {id: 45, name: 'Vera Wang'},
  {id: 46, name: 'Puma'},
  {id: 47, name: 'Steve Madden'},
  {id: 48, name: 'Brunello Cucinelli'},
  {id: 49, name: 'American Eagle Outfitters'},
  {id: 50, name: 'Armani'},
];

const ChoosePosition = ({navigation}) => {
  const [selectedPosition, setSelectedPosition] = React.useState('');
  const [selectedPositions, setSelectedPositions] = React.useState([]);

  const moveToLocation = () => {
    navigation.navigate('ChooseLocation');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.mainContentContainer}
      style={styles.container}>
      <View>
        <Text style={styles.heading}>My Position</Text>
        <View style={styles.positions}>
          {positions.map(position => {
            return (
              <SelectionPill
                key={position.id}
                title={position.name}
                isSelected={position.name === selectedPosition}
                onPress={() => setSelectedPosition(position.name)}
              />
            );
          })}
        </View>
        {selectedPosition && (
          <>
            <Text style={styles.heading}>{selectedPosition}</Text>
            <ScrollView
              horizontal
              contentContainerStyle={styles.scrollablePositionsContent}
              style={styles.scrollablePositions}>
              {brands.map(position => {
                const isSelected = selectedPositions.includes(position.name);
                const onPressPill = () => {
                  if (!isSelected) {
                    setSelectedPositions([...selectedPositions, position.name]);
                  } else {
                    setSelectedPositions(
                      selectedPositions.filter(item => item !== position.name),
                    );
                  }
                };
                return (
                  <SelectionPill
                    key={position.id}
                    title={position.name}
                    isSelected={isSelected}
                    onPress={onPressPill}
                  />
                );
              })}
            </ScrollView>
          </>
        )}
      </View>
      <GradientButton
        title="Next"
        onPress={moveToLocation}
        buttonStyle={styles.nextButton}
      />
    </ScrollView>
  );
};

export default ChoosePosition;

const styles = StyleSheet.create({
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
  },
  scrollablePositions: {},
  mainContentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});
