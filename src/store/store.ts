import {  configureStore ,  } from '@reduxjs/toolkit';
import CompanySlice from "./company/slice"
import userSlice from './user/userSlice';
export const store = configureStore({
    reducer : {
        company : CompanySlice ,
        user    : userSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;