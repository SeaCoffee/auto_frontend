import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        details: null,
        isLoggedIn: false,
        role: null,
        accountType: null
    },
    reducers: {
        setUser: (state, action) => {
            state.details = action.payload.user;
            state.role = action.payload.role;
            state.accountType = action.payload.accountType;
            state.isLoggedIn = true;
        },
        clearUser: (state) => {
            state.details = null;
            state.role = null;
            state.accountType = null;
            state.isLoggedIn = false;
        }
    }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

