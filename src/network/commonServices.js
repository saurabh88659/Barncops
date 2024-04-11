import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {CONSTANTS} from '../utils/constants';
export const BASE_URL = 'https://api.barncops.in/';

export const multipartAuthHeaders = async () => {
  return {
    Authorization: `Bearer ${await getOfflineData(CONSTANTS.TOKEN)}`,
    'Content-Type': 'multipart/form-data',
  };
};

export const getAuthHeaders = async () => {
  return {
    Authorization: `Bearer ${await getOfflineData(CONSTANTS.TOKEN)}`,
  };
};

export const getRefreshToken = async () => {
  return {
    Authorization: `Bearer ${await getOfflineData(CONSTANTS.REFRESH_TOKEN)}`,
  };
};

export const setOfflineData = async (key, value) => {
  const resp = await AsyncStorage.setItem(key, JSON.stringify(value));
  return resp;
};

export const getOfflineData = async key => {
  const resp = await AsyncStorage.getItem(key);
  return JSON.parse(resp);
};

export const Instance = async (method, url, headers, data) => {
  try {
    const res = await axios({
      method: method,
      url: url,
      headers: headers,
      data: data,
    });
    return {
      data: res,
      success: true,
    };
  } catch (error) {
    if (error.response) {
      return {
        data: error.response,
        success: false,
      };
    } else {
      return {
        data: error,
        success: false,
      };
    }
  }
};
