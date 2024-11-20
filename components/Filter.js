import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SelectCountry } from 'react-native-element-dropdown';

const local_data = [
  {

        
    value: '1',
    lable: 'Most recent',
  },
  {
    value: '2',
    lable: 'With media',
  },
  {
    value: '3',
    lable: 'Verified purc...',
  },
  {
    value: '4',
    lable: 'Highest rating',
  },
  {
    value: '5',
    lable: 'Lowest rating',
  },
];

const SelectCountryScreen = _props => {
  const [country, setCountry] = useState('1');

  return (
    <SelectCountry
      style={styles.dropdown}
      selectedTextStyle={styles.selectedTextStyle}
      placeholderStyle={styles.placeholderStyle}
    //   imageStyle={styles.imageStyle}
    //   iconStyle={styles.iconStyle}
      maxHeight={200}
      value={country}
      data={local_data}
      valueField="value"
      labelField="lable"
    //   imageField="image"
      placeholder="Select"
      searchPlaceholder="Search..."
      onChange={e => {
        setCountry(e.value);
      }}
    />
  );
};

export default SelectCountryScreen;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    width: 150,
    // backgroundColor: '#EEEEEE',
    borderRadius: 22,
    paddingHorizontal: 8,
    // borderWidth:1
  },
  imageStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    // marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});