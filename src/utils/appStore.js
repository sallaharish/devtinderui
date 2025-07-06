import { configureStore } from '@reduxjs/toolkit';
// import { useReducer } from 'react';
import userReducers from './userSlice';
const appStore = configureStore({
  reducer: userReducers,

})


export default appStore;