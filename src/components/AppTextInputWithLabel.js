import React from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {AppColors} from '../assests/AppColors';
import AppIcon from './AppIcon';

const AppTextInputWithLabel = ({
  ref,
  value,
  placeholder,
  onChangeText,
  labelText = 'Enter label',
  IconType,
  Iconsize,
  Iconname,
  Iconcolor,
  style,
  keyboardType,
  validationError = '',
  maxLength,
  showPasswordIcon = true,
  onEyePress,
  secureTextEntry,
  height = 100,
  leftIconType,
  leftIconName,
  leftIconSize,
  leftIconColor,
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
            // borderColor: validationError ? AppColors.red : appColors.GRAY,
          },
        ]}>
        <View style={{borderRightWidth: 0.8, borderColor: AppColors.black}}>
          <AppIcon
            Type={leftIconType}
            name={leftIconName}
            size={leftIconSize}
            color={leftIconColor}
            style={{paddingHorizontal: 10}}
          />
        </View>

        <TextInput
          ref={ref}
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
        {showPasswordIcon && (
          <TouchableOpacity onPress={onEyePress}>
            <AppIcon
              Type={IconType}
              name={Iconname}
              size={Iconsize}
              color={Iconcolor}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
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
    paddingLeft: 15,
    borderRadius: 30,
  },
  errorText: {
    fontSize: 13,
    color: 'red',
  },
});

export default AppTextInputWithLabel;
