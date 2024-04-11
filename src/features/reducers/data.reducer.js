import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  states: [],
  year: [],
};

export const dataSlice = createSlice({
  name: 'data/slice',
  initialState,
  reducers: {
    setStates: (state, action) => {
      state.states = action.payload;
    },
    setYear: (state, action) => {
      state.year = action.payload;
    },
  },
});

export const {setStates, setYear} = dataSlice.actions;
export default dataSlice.reducer;
