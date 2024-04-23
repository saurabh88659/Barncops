import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  Keyboard,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AppTextInputWithLabel from '../../components/AppTextInputWithLabel';
import {AppColors} from '../../assests/AppColors';
import {Icon} from '../../components/AppIcon';
import {routes} from '../../shells/routes';
import {SentOtp, signup} from '../../network/networkRequest/authNetworkRequest';
import Toast from 'react-native-simple-toast';
import {setOfflineData} from '../../network/commonServices';
import {CONSTANTS} from '../../utils/constants';
import AppHeader from '../../components/AppHeader';
import {useIsFocused} from '@react-navigation/native';

const SendOTPScreen = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);
  const phoneNumberInputRef = useRef(null);
  const isFocused = useIsFocused();
  const InputRef = useRef(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (isFocused) {
      setTimeout(() => InputRef?.current?.focus(), 1);
      setRefresh(!refresh);
    }
  }, [isFocused]);

  //   useEffect(() => {
  //     if (phoneNumberInputRef.current) {
  //       phoneNumberInputRef.current.focus();
  //     }
  //     Keyboard.dismiss();
  //   }, []);

  const handleSentOtp = async () => {
    setButtonLoading(true);
    const data = {
      phone_no: phoneNumber,
    };
    const res = await SentOtp(data);
    console.log('res.data of semd tp', res.data.data);
    if (res.success) {
      setButtonLoading(false);
      Toast?.show(res?.data?.data.message, Toast.BOTTOM, Toast.LONG);
      navigation.navigate(routes.OtpVerification_Screen, {
        phoneNumber: phoneNumber,
      });
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
      }}>
      <StatusBar
        backgroundColor={AppColors.primaryColor}
        barStyle={'light-content'}
      />
      <AppHeader
        backbutton={false}
        onPress={() => navigation.goBack()}
        isDrawer={false}
        title="Login"
      />
      <View style={{marginTop: 50, paddingHorizontal: 15}}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
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
            key={refresh}
            ref={InputRef}
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

          <TouchableOpacity
            onPress={handleSentOtp}
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
          {/* <View
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
            //   onPress={() => navigation.navigate(routes.Login_Screens)}
            >
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
          </View> */}
        </ScrollView>
      </View>
    </View>
  );
};

export default SendOTPScreen;

const styles = StyleSheet.create({});
