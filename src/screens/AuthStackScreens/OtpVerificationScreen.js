import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Keyboard,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {AppColors} from '../../assests/AppColors';
import AppHeader from '../../components/AppHeader';
import {
  otpVerification,
  reSentOtp,
} from '../../network/networkRequest/authNetworkRequest';
import {setOfflineData} from '../../network/commonServices';
import {CONSTANTS} from '../../utils/constants';
import {setLoggedIn} from '../../features/reducers/auth.reducer';
import Toast from 'react-native-simple-toast';

const OtpVerificationScreen = ({navigation, route}) => {
  const disPatch = useDispatch();
  const phoneNumber = route?.params?.phoneNumber;
  const [otp, setOtp] = useState('');
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({});
  const [buttonLoading, setButtonLoading] = useState(false);
  const isFocused = useIsFocused(); // Get the focused state of the screen
  const codeInputRef = useRef(null); // Reference for the CodeField input

  useEffect(() => {
    // Focus on the CodeField input when the screen is focused
    if (isFocused) {
      codeInputRef.current.focus();
      Keyboard.dismiss(); // Dismiss any open keyboards
    }
  }, [isFocused]);

  // Handle login function
  const handleOtpVerification = async () => {
    setButtonLoading(true);
    const object = {
      otp: otp,
      phone_no: phoneNumber,
    };
    const res = await otpVerification(object);
    console.log('res of handleOtpVerification ', res.data.data);
    if (res.success) {
      setButtonLoading(false);
      await setOfflineData(CONSTANTS.TOKEN, res.data?.data?.access);
      await setOfflineData(CONSTANTS.REFRESH_TOKEN, res.data.data?.refresh);
      disPatch(setLoggedIn(true));
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

  const handleResendOtp = async () => {
    const data = {
      phone_no: phoneNumber,
    };
    const res = await reSentOtp(data);
    console.log('res of handleResendOtp', res.data.data);
    if (res.success) {
      Toast?.show('New OTP sent successfully', Toast.BOTTOM, Toast.LONG);
    } else {
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
    <View style={styles.container}>
      <StatusBar
        backgroundColor={AppColors.primaryColor}
        barStyle={'light-content'}
      />
      <AppHeader
        onPress={() => navigation.goBack()}
        isDrawer={false}
        title="OTP Verification"
      />
      <ScrollView>
        <View style={styles.inputContainer}>
          <Text style={styles.otpText}>Enter OTP Code</Text>
          <CodeField
            ref={codeInputRef}
            value={otp}
            onChangeText={text => setOtp(text)}
            cellCount={6}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't receive code?</Text>
          <TouchableOpacity
            onPress={() => {
              handleResendOtp();
            }}>
            <Text style={styles.resendLink}>Resend</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => handleOtpVerification()}
          style={{
            height: 45,
            width: 150,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'green',
            alignSelf: 'center',
            marginTop: 50,
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
              Verify OTP
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default OtpVerificationScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    flex: 1,
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
  },
  textContainer: {
    paddingHorizontal: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  welcomeText: {
    color: AppColors.black,
    fontSize: 15,
    fontWeight: '700',
  },
  inputContainer: {
    paddingHorizontal: 20,
    marginTop: 16,
    paddingTop: 80,
  },
  otpText: {
    fontSize: 20,
    color: AppColors.black,
    fontWeight: '700',
    marginBottom: 20,
  },
  codeFieldRoot: {
    marginTop: 1,
  },
  cell: {
    width: 40,
    height: 40,
    fontSize: 20,
    borderWidth: 2,
    borderColor: AppColors.black,
    textAlign: 'center',
    borderRadius: 20,
    color: AppColors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusCell: {
    borderColor: AppColors.primaryColor,
  },
  buttonContainer: {
    paddingHorizontal: 6,
    marginTop: 1,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  resendText: {
    color: AppColors.black,
    fontSize: 16,
    marginRight: 2,
  },
  resendLink: {
    color: 'blue',
    fontSize: 16,
    marginLeft: 5,
  },
});
