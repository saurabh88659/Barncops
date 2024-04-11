import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Easing,
  ActionSheetIOS,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppTextInputWithLabel from '../../components/AppTextInputWithLabel';
import {AppColors} from '../../assests/AppColors';
import {Icon} from '../../components/AppIcon';
import {routes} from '../../shells/routes';
import {login} from '../../network/networkRequest/authNetworkRequest';
import {useDispatch} from 'react-redux';
import {setLoggedIn, setUserData} from '../../features/reducers/auth.reducer';
import {setOfflineData} from '../../network/commonServices';
import {CONSTANTS} from '../../utils/constants';
import Toast from 'react-native-simple-toast';

const LoginScreens = ({navigation}) => {
  const disPatch = useDispatch();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState('');

  const [buttonLoading, setButtonLoading] = useState(false);

  //validation function===
  const validateForm = () => {
    let isValid = true;
    return isValid;
  };

  const handleLogin = async () => {
    setButtonLoading(true);
    const data = {
      password: password,
      phone_no: phoneNumber,
    };
    const res = await login(data);
    if (res.success) {
      await setOfflineData(CONSTANTS.TOKEN, res.data?.data?.tokens?.access);
      await setOfflineData(
        CONSTANTS.REFRESH_TOKEN,
        res.data.data?.tokens?.refresh,
      );
      disPatch(setLoggedIn(true));
      disPatch(setLoggedIn(true));
      setButtonLoading(false);
    } else {
      console.log('error of handleLogin---', res.data.data);
      setButtonLoading(false);
      Object.keys(res?.data?.data)?.forEach(key => {
        if (Array.isArray(res?.data?.data[key])) {
          res?.data?.data[key].forEach(error => {
            Toast?.show(`${key}, ${error}`, Toast.BOTTOM, Toast.LONG);
          });
        } else {
          Toast?.show(
            `${key}, ${res?.data?.data[key]}`,
            Toast.BOTTOM,
            Toast.LONG,
          );
        }
      });
    }
  };

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: AppColors.white,
        paddingHorizontal: 15,
        justifyContent: 'center',
      }}>
      <View style={{marginTop: -40}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 30, paddingHorizontal: 5}}>
          <Text
            style={{
              fontSize: 30,
              color: AppColors.black,
              fontWeight: '800',
              alignSelf: 'center',
              paddingVertical: 30,
            }}>
            LOGIN
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: AppColors.black,
              alignSelf: 'center',
              textAlign: 'center',
              marginBottom: 20,
            }}>
            Barncops Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Text>

          <AppTextInputWithLabel
            leftIconType={Icon.FontAwesome}
            leftIconName={'phone'}
            leftIconSize={22}
            leftIconColor={AppColors.black}
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
            placeholder={'Enter your phoneNumber'}
            labelText="phoneNumber"
            style={styles.input}
            keyboardType={'number - pad'}
            // validationError={emailError}
            maxLength={10}
          />

          <AppTextInputWithLabel
            leftIconType={Icon.FontAwesome}
            leftIconName={'lock'}
            leftIconSize={22}
            leftIconColor={AppColors.black}
            value={password}
            onChangeText={text => setPassword(text)}
            placeholder={'Enter your Password'}
            labelText="Password"
            style={{marginTop: 0}}
            validationError={passwordError}
            maxLength={25}
            // keyboardType={'numeric'}
            IconType={Icon.Ionicons}
            Iconname={showPassword ? 'eye-off' : 'eye'}
            Iconsize={22}
            Iconcolor={AppColors.dark_grey}
            onEyePress={() => setShowPassword(!showPassword)}
            secureTextEntry={!showPassword}
          />

          <TouchableOpacity
            onPress={() => handleLogin()}
            style={{
              height: 45,
              width: 150,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'green',
              alignSelf: 'center',
              marginTop: 20,
            }}>
            {buttonLoading ? (
              <ActivityIndicator size={22} color={AppColors.white} />
            ) : (
              <Text
                style={{
                  color: AppColors.white,
                  fontSize: 17,
                  fontWeight: '600',
                }}>
                Submit
              </Text>
            )}
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: '10%',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontSize: 15,
                color: AppColors.black,
                fontWeight: '500',
              }}>
              Don't you have an Account?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.SignUp_Screen)}>
              <Text
                style={{
                  fontSize: 15,
                  color: AppColors.arsenic,
                  fontWeight: '900',
                  marginLeft: 3,
                }}>
                Register Now
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default LoginScreens;

const styles = StyleSheet.create({});
