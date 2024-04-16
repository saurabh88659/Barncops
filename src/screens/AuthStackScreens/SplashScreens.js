import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {AppColors} from '../../assests/AppColors';
import {getOfflineData} from '../../network/commonServices';
import {CONSTANTS} from '../../utils/constants';
import {useDispatch} from 'react-redux';
import {setLoggedIn} from '../../features/reducers/auth.reducer';
import {routes} from '../../shells/routes';

const SplashScreens = ({navigation}) => {
  const disPatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      checkLogin();
    }, 1000);
  }, []);

  const checkLogin = async () => {
    const token = await getOfflineData(CONSTANTS.TOKEN);
    if (token) {
      disPatch(setLoggedIn(true));
    } else {
      navigation.replace(routes.Login_Screens);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: AppColors.white,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: AppColors.primaryColor,
          fontWeight: '900',
          fontSize: 33,
        }}>
        Barncops
      </Text>
    </View>
  );
};

export default SplashScreens;
