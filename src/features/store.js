import { configureStore } from '@reduxjs/toolkit';
import themeSliceReducer from './themeSlice.js';

export const store = configureStore({
    reducer: {
        themeKey: themeSliceReducer,
    }
});

