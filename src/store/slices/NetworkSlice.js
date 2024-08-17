import { createSlice } from '@reduxjs/toolkit';

const networkSlice = createSlice({
    name: 'network',
    initialState: {
        loading: false,
        error: null
    },
    reducers: {
        startLoading: (state) => {
            state.loading = true;
        },
        finishLoading: (state) => {
            state.loading = false;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        }
    }
});

export const { startLoading, finishLoading, setError, clearError } = networkSlice.actions;
export default networkSlice.reducer;
