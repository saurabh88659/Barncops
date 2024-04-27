import {BASE_URL, Instance, getAuthHeaders} from '../commonServices';

export const getState = async obj => {
  try {
    const result = Instance('GET', BASE_URL + 'data/state/', null, {});
    return result;
  } catch (e) {
    return e;
  }
};

export const getYear = async (data) => {
  const {id} = data;
  const URL=
  id==1
    ?`${BASE_URL}data/year/`
    :`${BASE_URL}vidhan-sabha/year/`
  try {
    const result = Instance('GET',URL, null, {});
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
      : `${BASE_URL}vidhan-sabha/electors/?state_name=${state}&year=${year}`;

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
      : `${BASE_URL}vidhan-sabha/all-party/?state_name=${state}&year=${year}`;
  try {
    const result = Instance('GET', URL, null, {});
    return result;
  } catch (e) {
    return e;
  }
};

export const getIndiaPCData = async data => {
  const {year} = data;
  const URL =`${BASE_URL}data/india/?year=${year}`;
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
      : `${BASE_URL}vidhan-sabha/nda-filter/?state=${state}&year=${year}`;
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
      : `${BASE_URL}vidhan-sabha/upa-filter/?state=${state}&year=${year}`;
  try {
    const result = Instance('GET', URL, null, {});
    return result;
  } catch (e) {
    return e;
  }
};

export const getAllPcNameDataTable = data => {
  const {year, state,id} = data;
  const URL=
    id==1
      ?`${BASE_URL}data/all-pc-name-state/?state_name=${state}&year=${year}`
      :`${BASE_URL}vidhan-sabha/all-ac-name-state/?state_name=${state}&year=${year}`
  try {
    const result = Instance(
      'GET',
      URL,
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

export const getConstituencyData = async data => {
  const {state, year} = data;
  // console.log('state and year=====', state, year);
  try {
    const result = Instance(
      'GET',
      `${BASE_URL}ac/electors/?state_name=${state}&year=${year}`,
      null,
      data,
    );
    return result;
  } catch (e) {
    return e;
  }
};

export const getPartyData = async data => {
  const {state, year} = data;
  // console.log('state and year=====', state, year);
  try {
    const result = Instance(
      'GET',
      `${BASE_URL}ac/all-party/?state_name=${state}&year=${year}`,

      null,
      data,
    );
    return result;
  } catch (e) {
    return e;
  }
};

export const getPartyAndCandidateData = async data => {
  const {state, year, constituency_name} = data;
  console.log(
    'state and year and constituency_name=====',
    state,
    year,
    constituency_name,
  );
  try {
    const result = Instance(
      'GET',
      `${BASE_URL}ac/all-party-candidate-data/?state_name=${state}&year=${year}&PC_Name=${constituency_name}`,
      null,
      data,
    );
    return result;
  } catch (e) {
    return e;
  }
};

export const getPartyAndCandidatePCData = async data => {
  const {state, year, constituency_name} = data;
  console.log(
    'state and year and constituency_name=====',
    state,
    year,
    constituency_name,
  );
  try {
    const result = Instance(
      'GET',
      `${BASE_URL}data/particluar-pc/?state_name=${state}&year=${year}&constituency_name=${constituency_name}`,
      null,
      data,
    );
    return result;
  } catch (e) {
    return e;
  }
};
