import { configureStore } from '@reduxjs/toolkit';
import adsReducer from './adsSlice';
import userReducer from './userSlice';
import carsReducer from './carsSlice';
import uiReducer from './uiSlice';
import networkReducer from './networkSlice';
import navigationReducer from './navigationSlice';

export const store = configureStore({
    reducer: {
        ads: adsReducer,
        user: userReducer,
        cars: carsReducer,
        ui: uiReducer,
        network: networkReducer,
        navigation: navigationReducer
    }
});
