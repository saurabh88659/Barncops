import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getProfile} from '../../network/networkRequest/mainApiRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CONSTANTS} from '../../utils/constants';
import {AppColors} from '../../assests/AppColors';
import AppHeader from '../../components/AppHeader';
import AppIcon, {Icon} from '../../components/AppIcon';
import {useSelector} from 'react-redux';

const Profile = ({navigation}) => {
  // const [userData, setUserData] = useState('');
  const [screenLoading, setScreenLoading] = useState('');
  const userData = useSelector(state => state.auth.userData);

  // useEffect(() => {
  //   handleGetProfile();
  // }, []);

  // const handleGetProfile = async () => {
  //   setScreenLoading(true);
  //   const token = await AsyncStorage.getItem(CONSTANTS.TOKEN);
  //   console.log('token------', token);
  //   const res = await getProfile();
  //   // console.log('res  handleGetProfile------- ', res.data.data);
  //   if (res.success) {
  //     setScreenLoading(false);
  //     setUserData(res?.data.data);
  //   } else {
  //     setScreenLoading(false);
  //     console.log('error of handleGetProfile----', res?.data?.data);
  //   }
  // };

  return (
    <View style={{backgroundColor: AppColors.white, flex: 1}}>
      <StatusBar
        backgroundColor={AppColors.primaryColor}
        barStyle={'light-content'}
      />
      <AppHeader title="Profile" onPress={() => navigation.openDrawer()} />
      {screenLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={AppColors.primaryColor} size={35} />
        </View>
      ) : (
        <View style={{backgroundColor: AppColors.white, marginTop: '25%'}}>
          <Text
            style={{
              color: AppColors.black,
              fontSize: 25,
              fontWeight: '800',
              alignSelf: 'center',
              marginBottom: '10%',
            }}>
            PROFILE
          </Text>
          <View
            style={{
              width: '90%',
              paddingHorizontal: 10,
              borderWidth: 1,
              alignSelf: 'center',
              backgroundColor: AppColors.white,
              paddingVertical: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignSelf: 'center',
                paddingVertical: 10,
                width: '100%',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AppIcon
                  Type={Icon.Ionicons}
                  name={'person'}
                  size={20}
                  color={AppColors.black}
                />
                <Text
                  style={{
                    marginLeft: 5,
                    fontSize: 15,
                    color: AppColors.black,
                    fontWeight: '700',
                  }}>
                  NAME
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 16,
                  color: AppColors.black,
                  fontWeight: '700',
                  opacity: 0.5,
                }}>
                {userData?.first_name
                  ? `${userData?.first_name} ${userData?.last_name}`
                  : '-----------'}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                alignSelf: 'center',
                paddingVertical: 10,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AppIcon
                  Type={Icon.FontAwesome}
                  name={'phone'}
                  size={22}
                  color={AppColors.black}
                />
                <Text
                  style={{
                    marginLeft: 5,
                    fontSize: 15,
                    color: AppColors.black,
                    fontWeight: '700',
                  }}>
                  PHONE NUMBER
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 16,
                  color: AppColors.black,
                  fontWeight: '700',
                  opacity: 0.5,
                }}>
                {userData?.phone_no}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                alignSelf: 'center',
                paddingVertical: 10,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AppIcon
                  Type={Icon.MaterialCommunityIcons}
                  name={'file-document'}
                  size={22}
                  color={AppColors.black}
                />
                <Text
                  style={{
                    marginLeft: 5,
                    fontSize: 15,
                    color: AppColors.black,
                    fontWeight: '700',
                  }}>
                  SUBSCRIPTION STATUS :
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 16,
                  color: AppColors.black,
                  fontWeight: '700',
                  opacity: 0.5,
                }}>
                {userData?.subscription_based_user?.toString()}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Profile;
