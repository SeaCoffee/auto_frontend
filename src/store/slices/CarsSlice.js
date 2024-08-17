import { createSlice } from '@reduxjs/toolkit';

const carsSlice = createSlice({
    name: 'cars',
    initialState: {
        list: [],
        selectedCar: null
    },
    reducers: {
        setCars: (state, action) => {
            state.list = action.payload;
        },
        selectCar: (state, action) => {
            state.selectedCar = action.payload;
        }
    }
});

export const { setCars, selectCar } = carsSlice.actions;
export default carsSlice.reducer;
