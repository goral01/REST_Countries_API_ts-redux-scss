import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Типизируем данных о состояния темы
export interface MainThemeSlice {
    isDarkTheme: boolean;
}

// Создаем начальное состояния для темы
const initialState: MainThemeSlice = {
    isDarkTheme: true,
};

// Создаем слайс для управления состоянием темы
export const MainThemeSlice = createSlice({
    name: "themeSlice",
    initialState,
    reducers: {
        setDarkTheme: (state, action: PayloadAction<boolean>) => {
            state.isDarkTheme = !action.payload;
        },
    },
});

// Экспортируем actions для использования в компонентах
export const { setDarkTheme } = MainThemeSlice.actions;

// Экспортируем редьюсер по умолчанию для добавления в хранилище (store)
export default MainThemeSlice.reducer;