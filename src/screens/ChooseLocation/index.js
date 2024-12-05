import React, {useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, Fonts} from '../../config';
import {GradientButton, TextInputCustom} from '../../components';
import {
  createAgentProfile,
  getPlacesAutoComplete,
} from '../../redux/middlewares/profileCreation';
import {useDispatch, useSelector} from 'react-redux';

const ChooseLocation = ({route}) => {
  const dispatch = useDispatch();
  const {userId} = useSelector(state => state.user?.user);
  const [search, setSearch] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [selectedLocation, setSelectedLocation] = React.useState(null);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      getValues(search);
    }, 2000);
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [search]);

  const getValues = async () => {
    if (!search) {
      setSearchResults([]);
      return;
    }
    const searchResults = await getPlacesAutoComplete(search);
    setSearchResults(searchResults);
  };

  const moveToCongratulations = () => {
    const body = route?.params?.body;
    body.location = selectedLocation;
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
          textInputProps={{value: search, onChangeText: setSearch}}
        />
        <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
          {!!searchResults?.length &&
            searchResults.map(item => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={item.geonameId}
                style={styles.listItem}
                onPress={() => {
                  setSelectedLocation({
                    longitude: item.lng,
                    latitude: item.lat,
                    link: item.toponymName,
                  });
                  setSearchResults([]);
                  setSearch(item.toponymName);
                }}>
                <Text style={styles.listItemName}>{item.toponymName}</Text>
                <Text style={styles.listItemCountry}>{item.countryName}</Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
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
  list: {flex: 1, marginBottom: 30},
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
  lowerContainer: {
    justifyContent: 'center',
    paddingBottom: 100,
  },
  upperContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    alignItems: 'center',
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
