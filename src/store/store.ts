import {  configureStore ,  } from '@reduxjs/toolkit';
import CompanySlice from "./company/slice"
import userSlice from './user/userSlice';
import searchSlice from './search/searchSlice';
export const store = configureStore({
    reducer : {
        company : CompanySlice ,
        user    : userSlice ,
        search  :  searchSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;