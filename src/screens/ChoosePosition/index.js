import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts} from '../../config';
import {GradientButton, SelectionPill} from '../../components';
import {brands} from '../../dummyData';
import {useDispatch} from 'react-redux';
import {
  getPositionDetails,
  getPositions,
} from '../../redux/middlewares/profileCreation';
import {errorToast} from '../../config/api';

const ChoosePosition = ({navigation}) => {
  const dispatch = useDispatch();
  const [positions, setPositions] = React.useState([]);
  const [positionDetails, setPositionDetails] = React.useState([]);
  const [selectedPosition, setSelectedPosition] = React.useState('');
  const [selectedPositions, setSelectedPositions] = React.useState([]);

  React.useEffect(() => {
    dispatch(
      getPositions(p => {
        setPositions(p);
      }),
    );
  }, []);

  const getPositionDetailsFunc = id => {
    dispatch(
      getPositionDetails(id, p => {
        setPositionDetails(p);
      }),
    );
  };

  const moveToLocation = () => {
    if (selectedPositions.length) {
      navigation.navigate('ChooseLocation', {
        body: {
          position: selectedPosition,
          details: selectedPositions
        },
      });
    } else errorToast({message: 'Please select the available options'});
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.mainContentContainer}
      style={styles.container}>
      <View>
        <Text style={styles.heading}>My Position</Text>
        <View style={styles.positions}>
          {positions.map((position, index) => {
            return (
              <SelectionPill
                key={index}
                title={position.positionName}
                isSelected={position.positionName === selectedPosition}
                onPress={() => {
                  setSelectedPosition(position.positionName);
                  getPositionDetailsFunc(position.positionId);
                }}
              />
            );
          })}
        </View>
        {selectedPosition && (
          <>
            <Text style={styles.heading}>{selectedPosition}</Text>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              contentContainerStyle={[
                styles.scrollablePositionsContent,
                {
                  maxWidth: positionDetails.length * 30,
                },
              ]}
              style={styles.scrollablePositions}>
              {positionDetails.map((position, index) => {
                const isSelected = selectedPositions.includes(position.detail);
                const onPressPill = () => {
                  if (!isSelected) {
                    setSelectedPositions([
                      ...selectedPositions,
                      position.detail,
                    ]);
                  } else {
                    setSelectedPositions(
                      selectedPositions.filter(
                        item => item !== position.detail,
                      ),
                    );
                  }
                };
                return (
                  <SelectionPill
                    key={index}
                    title={position.detail}
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
