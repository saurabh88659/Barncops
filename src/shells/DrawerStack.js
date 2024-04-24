import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ConstituencyScreen from '../screens/mainStackScreens/ConstituencyScreen';
import ElectionOveviewScreen from '../screens/mainStackScreens/ElectionOveviewScreen';
import HomeScreen from '../screens/mainStackScreens/HomeScreen';
import {routes} from './routes';
import CustomDrawerStack from './CustomDrawerStack';
import {AppColors} from '../assests/AppColors';
import Profile from '../screens/mainStackScreens/Profile';
import {CONSTANTS} from '../utils/constants';
import {getProfile} from '../network/networkRequest/mainApiRequest';
import {setUserData} from '../features/reducers/auth.reducer';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DrawerStack = () => {
  const Drawer = createDrawerNavigator();
  const disPatch = useDispatch();
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    handleGetProfile();
  }, []);

  const handleGetProfile = async () => {
    const token = await AsyncStorage.getItem(CONSTANTS.TOKEN);
    console.log('token------', token);
    const res = await getProfile();
    if (res.success) {
      setShowProfile(true);
      disPatch(setUserData(res?.data.data));
    } else {
      setShowProfile(false);
      console.log('error of handleGetProfile----', res?.data?.data);
    }
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: AppColors.primaryColor,
        drawerActiveTintColor: AppColors.white,
        drawerInactiveTintColor: AppColors.black,
        drawerLabelStyle: {
          fontSize: 16,
          paddingHorizontal: 10,
        },
      }}
      drawerContent={props => <CustomDrawerStack {...props} />}
      initialRouteName={'Home'}>
      <Drawer.Screen name={'Home'} component={HomeScreen} />
      <Drawer.Screen
        name={'Election Oveview'}
        component={ElectionOveviewScreen}
      />
      {showProfile && <Drawer.Screen name={'Profile'} component={Profile} />}
    </Drawer.Navigator>
  );
};

export default DrawerStack;

const styles = StyleSheet.create({});
