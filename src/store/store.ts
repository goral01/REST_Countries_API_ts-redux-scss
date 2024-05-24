import { configureStore } from "@reduxjs/toolkit";
import MainThemeSlice from "./slices/mainThemeSlice";
import FilterSlice from "./slices/filterSlice";

export const store = configureStore({
    reducer: {
        MainThemeSlice,
        FilterSlice,
    },
});

// Выводим тип состояния хранилища (`RootState`)
export type RootState = ReturnType<typeof store.getState>;

// Выводим тип диспатчера хранилища (`AppDispatch`)
export type AppDispatch = typeof store.dispatch;

export default store;
