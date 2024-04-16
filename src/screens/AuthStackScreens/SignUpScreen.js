import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppTextInputWithLabel from '../../components/AppTextInputWithLabel';
import {AppColors} from '../../assests/AppColors';
import {Icon} from '../../components/AppIcon';
import {routes} from '../../shells/routes';
import {signup} from '../../network/networkRequest/authNetworkRequest';
import Toast from 'react-native-simple-toast';
import {setOfflineData} from '../../network/commonServices';
import {CONSTANTS} from '../../utils/constants';

const SignUpScreen = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);

  //validation function===
  const validateForm = () => {
    let isValid = true;
    return isValid;
  };
  const handleSignUp = async () => {
    setButtonLoading(true);
    const data = {
      first_name: firstName,
      last_name: lastName,
      password: password,
      phone_no: phoneNumber,
      user: true,
    };
    const res = await signup(data);
    if (res.success) {
      setButtonLoading(false);
      Toast.show('Account Created Successfully!', Toast.BOTTOM, Toast.LONG);
      navigation.navigate(routes.Login_Screens);
    } else {
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
            REGISTER
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
            leftIconType={Icon.Ionicons}
            leftIconName={'person'}
            leftIconSize={22}
            leftIconColor={AppColors.black}
            value={firstName}
            onChangeText={text => setFirstName(text)}
            placeholder={'Enter your First Name'}
            labelText="First Name"
            style={styles.input}
            // validationError={emailError}
            maxLength={20}
          />

          <AppTextInputWithLabel
            leftIconType={Icon.Ionicons}
            leftIconName={'person'}
            leftIconSize={22}
            leftIconColor={AppColors.black}
            value={lastName}
            onChangeText={text => setLastName(text)}
            placeholder={'Enter your Last Name'}
            labelText="Last Name"
            style={styles.input}
            // validationError={emailError}
            maxLength={20}
          />

          <AppTextInputWithLabel
            leftIconType={Icon.FontAwesome}
            leftIconName={'phone'}
            leftIconSize={22}
            leftIconColor={AppColors.black}
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
            placeholder={'Enter your phone Number'}
            labelText="phoneNumber"
            style={styles.input}
            keyboardType={'number-pad'}
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
            onPress={handleSignUp}
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
              alignItems: 'center',
              marginTop: '10%',
              justifyContent: 'flex-start',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: 15,
                color: AppColors.black,
                fontWeight: '500',
              }}>
              Already have an Account?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.Login_Screens)}>
              <Text
                style={{
                  fontSize: 15,
                  color: AppColors.arsenic,
                  fontWeight: '900',
                  marginLeft: 3,
                }}>
                Login Now
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({});
