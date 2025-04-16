import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {Colors, Fonts} from '../../config';
import {GradientButton, TextInputCustom} from '../../components';
import {
  createAgentProfile,
  getPlacesAutoComplete,
} from '../../redux/middlewares/profileCreation';

const ChooseLocation = ({route}) => {
  const dispatch = useDispatch();
  const {userId} = useSelector(state => state.user?.user);

  const [bio, setBio] = useState('');
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const locationRef = useRef();

  const getValues = useCallback(async () => {
    if (!search) {
      setSearchResults([]);
      return;
    }
    const results = await getPlacesAutoComplete(search);
    setSearchResults(results);
  }, [search]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      getValues();
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [search, getValues]);

  const moveToCongratulations = () => {
    const body = route?.params?.body;
    body.location = selectedLocation;
    body.bio = bio;
    dispatch(createAgentProfile(userId, body));
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Text style={styles.heading}>Location</Text>

        <TextInputCustom
          title="City, State"
          containerStyle={styles.input}
          hideLabel
          textInputProps={{
            value: search,
            onChangeText: setSearch,
            ref: locationRef,
            onFocus: () => {}, // Placeholder in case you want to add styling later
            onBlur: () => {},
          }}
        />

        {searchResults.length > 0 && (
          <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
            {searchResults.map(item => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={item.geonameId}
                style={styles.listItem}
                onPress={() => {
                  setSearch(item.toponymName);
                  setSelectedLocation({
                    longitude: item.lng,
                    latitude: item.lat,
                    link: item.toponymName,
                  });
                  setSearchResults([]);
                  locationRef.current?.blur();
                }}>
                <Text style={styles.listItemName}>{item.toponymName}</Text>
                <Text style={styles.listItemCountry}>{item.countryName}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        <TextInputCustom
          title="Bio"
          textInputStyle={{height: 100, textAlignVertical: 'top'}}
          containerStyle={styles.input}
          textInputProps={{
            multiline: true,
            value: bio,
            onChangeText: setBio,
          }}
        />
      </View>

      <View style={styles.lowerContainer}>
        <GradientButton
          title="Create Profile"
          disabled={!selectedLocation}
          containerStyle={styles.button}
          onPress={moveToCongratulations}
        />
        <Text style={styles.editProfile}>Edit your profile in Settings</Text>
      </View>
    </View>
  );
};

export default ChooseLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  upperContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
  lowerContainer: {
    justifyContent: 'center',
    paddingBottom: 100,
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    color: Colors.black,
    fontFamily: Fonts.JosefinSansSemiBold,
    marginVertical: 10,
  },
  input: {
    alignSelf: 'stretch',
    marginBottom: 0,
  },
  list: {
    flex: 1,
    marginBottom: 30,
  },
  listItem: {
    padding: 10,
    borderColor: Colors.lightGrey,
    borderBottomWidth: 1,
  },
  listItemName: {
    fontSize: 16,
    color: Colors.black,
    fontFamily: Fonts.RobotoRegular,
    marginBottom: 2,
  },
  listItemCountry: {
    fontSize: 12,
    color: Colors.textGrey,
    fontFamily: Fonts.RobotoRegular,
  },
  button: {
    width: 150,
    alignSelf: 'center',
  },
  editProfile: {
    color: Colors.darkGrey,
    fontSize: 12,
    fontFamily: Fonts.RobotoRegular,
  },
});
