import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
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
  const {userId} = useSelector(state => state.user?.user) || {};

  const [bio, setBio] = useState('');
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const locationRef = useRef();
  const isSelectionFromDropdownRef = useRef(false);

  const getValues = useCallback(async () => {
    if (!search) {
      setSearchResults([]);
      return;
    }
    try {
      const results = await getPlacesAutoComplete(search);
      if (Array.isArray(results)) {
        setSearchResults(results);
        setShowDropdown(true);
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    } catch (error) {
      console.error('Autocomplete error:', error);
      setSearchResults([]);
      setShowDropdown(false);
    }
  }, [search]);

  useEffect(() => {
    if (isSelectionFromDropdownRef.current) {
      isSelectionFromDropdownRef.current = false;
      return;
    }

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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{flex: 1}}>
      <View
        style={styles.container}
        keyboardShouldPersistTaps="handled">
        <View style={styles.upperContainer}>
          <Text style={styles.heading}>Location</Text>

          <TextInputCustom
            title="City, State"
            containerStyle={styles.input}
            hideLabel
            textInputProps={{
              value: search,
              selectTextOnFocus: true,
              onChangeText: text => {
                setSearch(text);
                setShowDropdown(true);
              },
              ref: locationRef,
              onFocus: () => setShowDropdown(true),
              onBlur: () => {
                setTimeout(() => setShowDropdown(false), 200);
              },
            }}
          />

          {showDropdown && searchResults.length > 0 && (
            <ScrollView keyboardShouldPersistTaps style={styles.dropdown}>
              {searchResults.map(item => (
                <TouchableOpacity
                  key={item.geonameId}
                  style={styles.dropdownItem}
                  activeOpacity={0.8}
                  onPress={() => {
                    isSelectionFromDropdownRef.current = true;
                    setSearch(item.toponymName);
                    setSelectedLocation({
                      longitude: item.lng,
                      latitude: item.lat,
                      link: item.toponymName,
                    });
                    setSearchResults([]);
                    setShowDropdown(false);
                    locationRef.current?.blur?.();
                  }}>
                  <Text style={styles.dropdownTitle}>{item.toponymName}</Text>
                  <Text style={styles.dropdownSubtitle}>
                    {item.countryName}
                  </Text>
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
              returnKeyType: 'done',
              blurOnSubmit: true,
              maxLength: 200,
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
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChooseLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
  },
  contentContainer: {
    alignItems: 'center',
    flexGrow: 1,
  },
  upperContainer: {
    flex: 1,
    alignSelf: 'stretch',
    zIndex: 10,
  },
  lowerContainer: {
    justifyContent: 'center',
    zIndex: 0,
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
  dropdown: {
    backgroundColor: Colors.white,
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    borderRadius: 5,
    height: 200,
    marginBottom: 20,
  },
  dropdownItem: {
    padding: 10,
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1,
  },
  dropdownTitle: {
    fontSize: 16,
    color: Colors.black,
    fontFamily: Fonts.RobotoRegular,
  },
  dropdownSubtitle: {
    fontSize: 12,
    color: Colors.textGrey,
    fontFamily: Fonts.RobotoRegular,
  },
  button: {
    width: 150,
    alignSelf: 'center',
  },
});
