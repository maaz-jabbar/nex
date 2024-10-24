import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, Fonts} from '../../config';

const CheckBox = ({title}) => {
  const [isChecked, setIsChecked] = React.useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setIsChecked(!isChecked)}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 26,
          height: 26,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: Colors.lightGrey,
          marginRight: 10,
          backgroundColor: isChecked ? Colors.lightGrey : Colors.white,
        }}></TouchableOpacity>
      <Text style={{color: Colors.black, fontFamily: Fonts.RobotoMedium}}>
        {title}
      </Text>
    </View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10,
  },
});
