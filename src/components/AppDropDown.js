import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {AppColors} from '../assests/AppColors';

const AppDropDown = ({
  valueField = 'label',
  labelField = 'labelField',
  search = false,
  labelText = 'Role',
  data = [],
  value,
  onBlur,
  onFocus,
  onChange,
  placeholder = '--Select Role',
  height = 100,
  searchPlaceholder = 'Search...',
  style,
}) => {
  return (
    <View style={[styles.container, {height: height}, {...style}]}>
      <Text
        style={{
          fontSize: 16,
          color: AppColors.black,
          fontWeight: '600',
          marginBottom: '2%',
        }}>
        {labelText}
      </Text>
      <Dropdown
        style={[styles.dropdown]}
        iconColor={AppColors.primaryColor}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        itemTextStyle={{color: AppColors.black}}
        containerStyle={{backgroundColor: '#FFF6ED'}}
        activeColor="#fff"
        data={data}
        search={search}
        maxHeight={300}
        labelField={labelField}
        valueField={valueField}
        placeholder={placeholder}
        searchPlaceholder={searchPlaceholder}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
      />
    </View>
  );
};

export default AppDropDown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    // height: 80,
    // backgroundColor: '#FD8000'
  },
  dropdown: {
    height: 48,
    paddingLeft: 15,
    borderRadius: 10,
    paddingHorizontal: 8,
    // elevation: 5,
    // backgroundColor: AppColors.white,
    backgroundColor: '#FFF6ED',
  },
  icon: {
    marginRight: 5,
  },

  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },

  placeholderStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    // color: AppColors.black
    color: '#FD8000',
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FD8000',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
