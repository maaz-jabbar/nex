import React, {useEffect, useState, useCallback} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';

import {Colors, Fonts} from '../../config';
import {GradientButton, SelectionPill} from '../../components';
import {
  getPositionDetails,
  getPositions,
} from '../../redux/middlewares/profileCreation';
import {errorToast} from '../../config/api';

const ChoosePosition = ({navigation}) => {
  const dispatch = useDispatch();

  const [positions, setPositions] = useState([]);
  const [positionDetails, setPositionDetails] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedPositions, setSelectedPositions] = useState([]);

  useEffect(() => {
    dispatch(getPositions(setPositions));
  }, [dispatch]);

  const getPositionDetailsFunc = useCallback(
    id => {
      dispatch(getPositionDetails(id, setPositionDetails));
    },
    [dispatch],
  );

  const handlePositionPress = (name, id) => {
    setSelectedPosition(name);
    setSelectedPositions([]); // Clear previous selection
    getPositionDetailsFunc(id);
  };

  const handleDetailToggle = detail => {
    setSelectedPositions(prev =>
      prev.includes(detail)
        ? prev.filter(item => item !== detail)
        : [...prev, detail],
    );
  };

  const moveToLocation = () => {
    if (selectedPositions.length) {
      navigation.navigate('ChooseLocation', {
        body: {
          position: selectedPosition,
          details: selectedPositions,
        },
      });
    } else {
      errorToast({message: 'Please select the available options'});
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.mainContentContainer}
      style={styles.container}>
      <View>
        <Text style={styles.heading}>My Position</Text>
        <View style={styles.positions}>
          {positions.map(position => (
            <SelectionPill
              key={position.positionId}
              title={position.positionName}
              isSelected={position.positionName === selectedPosition}
              onPress={() =>
                handlePositionPress(position.positionName, position.positionId)
              }
            />
          ))}
        </View>

        {!!selectedPosition && (
          <>
            <Text style={styles.heading}>{selectedPosition}</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.scrollablePositions}
              contentContainerStyle={[
                styles.scrollablePositionsContent,
                {
                  maxWidth: positionDetails.length * 25,
                },
              ]}>
              {positionDetails.map((position, index) => {
                const {detail} = position;
                const isSelected = selectedPositions.includes(detail);
                return (
                  <SelectionPill
                    key={index}
                    title={detail}
                    isSelected={isSelected}
                    onPress={() => handleDetailToggle(detail)}
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
  positions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  scrollablePositions: {},
  scrollablePositionsContent: {
    minWidth: '100%',
    marginLeft: 20,
    flexWrap: 'wrap',
  },
  nextButton: {
    alignSelf: 'center',
    width: 150,
    marginVertical: 20,
    marginBottom: 40,
  },
});
