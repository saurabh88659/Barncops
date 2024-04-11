import React from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';
import {AppColors} from '../assests/AppColors';

const AppTextInpuWithoutIcon = ({
  value,
  placeholder,
  onChangeText,
  labelText = 'Enter label',
  style,
  keyboardType,
  validationError = '',
  maxLength,
  secureTextEntry,
  height = 100,
}) => {
  return (
    <View style={[styles.container, {...style}, {height: height}]}>
      <Text style={styles.labelText}>{labelText}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderWidth: 0.8,
            borderColor: AppColors.black,
          },
        ]}>
        <TextInput
          keyboardType={keyboardType}
          // keyboardType='number-pad'
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          placeholderTextColor={AppColors.dark_grey}
          maxLength={maxLength}
          style={styles.input}
          secureTextEntry={secureTextEntry}
        />
      </View>
      {validationError && (
        <Text style={styles.errorText}>{validationError}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: 100,
  },

  labelText: {
    fontSize: 15,
    color: AppColors.black,
    fontWeight: '600',
    marginBottom: 5,
  },

  inputContainer: {
    borderRadius: 5,
    // borderWidth: 1,
    marginTop: '1%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    // elevation: 5,
    backgroundColor: AppColors.white,
  },

  icon: {
    // marginRight: 10,
    // marginLeft: 15,
    paddingHorizontal: 15,
    // backgroundColor: "red"
  },

  input: {
    flex: 1,
    fontSize: 15,
    alignSelf: 'center',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    color: AppColors.black,
    borderRadius: 30,
    paddingHorizontal: 15,
  },
  errorText: {
    fontSize: 13,
    color: 'red',
  },
});

export default AppTextInpuWithoutIcon;
