import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Типизируем данных о состояния фильтрации
interface FilterState {
    searchTerm: string;
    region: string | null;
}

// Создаем начальное состояния для фильтрации
const initialState: FilterState = {
    searchTerm: "",
    region: null,
};

// Создаем слайс для управления состоянием фильтрации
const filterSlice = createSlice({
    name: "filterSlice",
    initialState,
    reducers: {
        // Редьюсер для установки поискового запроса
        setSearchTerm(state, action: PayloadAction<string>) {
            state.searchTerm = action.payload;
        },
        // Редьюсер для установки выбранного региона
        setRegion(state, action: PayloadAction<string | null>) {
            state.region = action.payload;
        },
    },
});

// Экспортируем actions для использования в компонентах
export const { setSearchTerm, setRegion } = filterSlice.actions;

// Экспортируем редьюсер по умолчанию для добавления в хранилище (store)
export default filterSlice.reducer;
