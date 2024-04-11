import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  userData: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const {setLoggedIn, setUserData} = authSlice.actions;
export default authSlice.reducer;
