import {BASE_URL, Instance, getAuthHeaders} from '../commonServices';

export const getState = async obj => {
  try {
    const result = Instance('GET', BASE_URL + 'data/state/', null, {});
    return result;
  } catch (e) {
    return e;
  }
};

export const getYear = async () => {
  try {
    const result = Instance('GET', BASE_URL + 'data/year/', null, {});
    return result;
  } catch (e) {
    return e;
  }
};

export const getTopFivePatry = async data => {
  const {year, state} = data;
  try {
    const result = Instance(
      'GET',
      BASE_URL + `data/top-five-party/?year=${year}&state_name=${state}`,
      null,
      {},
    );
    return result;
  } catch (e) {
    return e;
  }
};

export const getConstituencyElectorsData = async data => {
  const {year, state, id} = data;
  const URL =
    id == 1
      ? `${BASE_URL}data/electors/?state_name=${state}&year=${year}`
      : `${BASE_URL}ac/electors/?state_name=${state}&year=${year}`;

  try {
    const result = Instance('GET', URL, null, {});
    return result;
  } catch (e) {
    return e;
  }
};

export const getAllPartyData = async data => {
  const {year, state, id} = data;
  const URL =
    id == 1
      ? `${BASE_URL}data/all-party/?state_name=${state}&year=${year}`
      : `${BASE_URL}ac/all-party/?state_name=${state}&year=${year}`;
  try {
    const result = Instance('GET', URL, null, {});
    return result;
  } catch (e) {
    return e;
  }
};

export const getNdaAllianceData = async data => {
  const {year, state, id} = data;
  console.log('data of nda--------', data);
  const URL =
    id == 1
      ? `${BASE_URL}data/nda-filter/?state=${state}&year=${year}`
      : `${BASE_URL}ac/nda-filter/?state=${state}&year=${year}`;
  try {
    const result = Instance('GET', URL, null, {});
    return result;
  } catch (e) {
    return e;
  }
};

export const getUpaAllianceData = async data => {
  const {year, state, id} = data;
  const URL =
    id == 1
      ? `${BASE_URL}data/upa-filter/?state=${state}&year=${year}`
      : `${BASE_URL}ac/upa-filter/?state=${state}&year=${year}`;
  try {
    const result = Instance('GET', URL, null, {});
    return result;
  } catch (e) {
    return e;
  }
};

export const getAllPcNameDataTable = data => {
  const {year, state} = data;
  try {
    const result = Instance(
      'GET',
      `${BASE_URL}data/all-pc-name-state/?state_name=${state}&year=${year}`,
      null,
      {},
    );
    return result;
  } catch (e) {
    return e;
  }
};

export const getProfile = async () => {
  const authHeader = await getAuthHeaders();
  try {
    const result = Instance('GET', BASE_URL + 'account/profile/', authHeader);
    return result;
  } catch (e) {
    return e;
  }
};

export const getFilterSearchData = async paramObject => {
  const paramArray = [];
  for (const key in paramObject) {
    if (paramObject[key]) {
      paramArray.push(`${key}=${paramObject[key]}`);
    }
  }
  const queryString = paramArray.join('&');
  console.log('queryString-----------111111111111111111111111', queryString);
  try {
    const result = Instance(
      'GET',
      `${BASE_URL}data/all-pc-name-state/?${queryString}`,
      null,
      {},
    );
    return result;
  } catch (e) {
    return e;
  }
};
