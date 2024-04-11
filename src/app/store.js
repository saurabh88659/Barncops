import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/reducers/auth.reducer';
import dataReducer from '../features/reducers/data.reducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    appData: dataReducer,
  },
});
