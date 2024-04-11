import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';

import {
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AppColors} from '../assests/AppColors';
import {useDispatch} from 'react-redux';
import {setLoggedIn} from '../features/reducers/auth.reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawerStack = props => {
  const disPatch = useDispatch();

  // const disPatch=useD
  const logout = () => {
    disPatch(setLoggedIn(false));
    AsyncStorage.clear();
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: AppColors.primaryColor,
          height: 150,
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomRightRadius: 30,
          //   borderBottomLeftRadius: 20,
        }}>
        <Text
          style={{
            fontSize: 26,
            marginBottom: 7,
            fontWeight: '900',
            color: 'white',
          }}>
          Barncops
        </Text>
      </View>

      <View style={{flex: 0.5, backgroundColor: `white`, marginTop: 30}}>
        <DrawerContentScrollView {...props} contentContainerStyle={{}}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: `white`,
          padding: 20,
          justifyContent: 'flex-end',
          paddingBottom: 50,
        }}>
        <TouchableOpacity onPress={logout}>
          <View style={{marginTop: 30, flexDirection: 'row'}}>
            <MaterialIcons name="logout" size={25} color="black" />
            <Text style={{fontSize: 17, marginLeft: 7, color: 'black'}}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawerStack;
