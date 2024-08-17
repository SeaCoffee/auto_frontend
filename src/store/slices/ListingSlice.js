import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Асинхронный экшен для получения объявлений
export const fetchAds = createAsyncThunk('ads/fetchAds', async () => {
    const response = await fetch('/api/ads');
    const ads = await response.json();
    return ads;
});

const adsSlice = createSlice({
    name: 'ads',
    initialState: {
        items: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAds.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAds.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchAds.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default adsSlice.reducer;
