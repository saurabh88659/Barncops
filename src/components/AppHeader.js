import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import AppIcon, {Icon} from './AppIcon';
import {AppColors} from '../assests/AppColors';

const AppHeader = ({
  title = 'Home',
  onPress,
  isDrawer = true,
  backbutton = true,
}) => {
  return (
    <View
      style={{
        height: 45,
        width: '100%',
        backgroundColor: AppColors.primaryColor,
        alignItems: 'center',
        flexDirection: 'row',
        elevation: 2,
        justifyContent: 'center',
        paddingHorizontal: 15,
      }}>
      <TouchableOpacity
        style={{
          height: '100%',
          width: 50,
          position: 'absolute',
          left: 20,
          justifyContent: 'center',
        }}
        onPress={onPress}>
        {isDrawer ? (
          <AppIcon
            Type={Icon.FontAwesome}
            name={'navicon'}
            color={AppColors.white}
            size={22}
          />
        ) : (
          backbutton && (
            <AppIcon
              Type={Icon.Feather}
              name={'arrow-left'}
              color={AppColors.white}
              size={27}
            />
          )
        )}
      </TouchableOpacity>
      <Text style={{fontSize: 20, fontWeight: '700', color: AppColors.white}}>
        {title}
      </Text>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({});
