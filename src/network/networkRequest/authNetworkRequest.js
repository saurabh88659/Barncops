import {BASE_URL, Instance} from '../commonServices';

export const signup = async obj => {
  console.log('obj------------------', obj);
  try {
    const result = Instance('POST', BASE_URL + 'account/register/', null, obj);
    return result;
  } catch (e) {
    return e;
  }
};

export const SentOtp = async obj => {
  console.log('obj------------------', obj);
  try {
    const result = Instance('POST', BASE_URL + 'account/register/', null, obj);
    return result;
  } catch (e) {
    return e;
  }
};

export const reSentOtp = async obj => {
  try {
    const result = Instance(
      'POST',
      BASE_URL + 'account/resend-otp/',
      null,
      obj,
    );
    return result;
  } catch (e) {
    return e;
  }
};
export const otpVerification = async obj => {
  console.log('obj------------------', obj);
  try {
    const result = Instance(
      'POST',
      BASE_URL + 'account/verify-otp/',
      null,
      obj,
    );
    return result;
  } catch (e) {
    return e;
  }
};

export const login = async obj => {
  console.log('obj------', obj);
  try {
    const result = Instance('POST', BASE_URL + 'account/login/', null, obj);
    return result;
  } catch (e) {
    return e;
  }
};

export const Profile = async obj => {
  try {
    const result = Instance('GET', BASE_URL + 'account/profile/', null, obj);
    return result;
  } catch (e) {
    return e;
  }
};
