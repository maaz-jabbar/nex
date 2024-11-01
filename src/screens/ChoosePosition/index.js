import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts} from '../../config';
import {GradientButton, SelectionPill} from '../../components';
import {brands, positions} from '../../dummyData';

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
          {positions.map((position, index) => {
            return (
              <SelectionPill
                key={index}
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
              {brands.map((position, index) => {
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
                    key={index}
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
        containerStyle={{backgroundColor: Colors.darkGrey, borderWidth: 0}}
        disabled={!selectedPosition}
        noGradient={!selectedPosition}
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
