import React from "react";

import { Country } from "../../types/country";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import s from "./cartItem.module.scss";
import darkTheme from "../../scss/darkTheme.module.scss";
import lightTheme from "../../scss/lightTheme.module.scss";

const CartItem: React.FC<Country> = ({ name, flags, population, continents, capital }) => {
    const isDarkTheme = useSelector((state: RootState) => state.MainThemeSlice.isDarkTheme);

    // Извлекаем данные из пропсов для удобства использования
    const nameInfo = name.common;
    const flagInfo = flags.svg;
    const populationInfo = population ? population.toLocaleString("en-US") : "0";
    const continentInfo = continents ? continents.join(", ") : "No Continent";
    const capitalInfo = capital ? capital.join(", ") : "No Capital";

    return (
        <div className={`${s.root} ${isDarkTheme ? darkTheme.root : lightTheme.root}`}>
            <img className={s.flag} src={flagInfo} alt={`${nameInfo} flag`} />
            <div className={s.shortInfo}>
                <h3 className={s.name}>{nameInfo}</h3>
                <div className={s.items}>
                    <div className={s.item}>
                        <p className={s.type}>Population:</p>
                        <p className={s.typeInfo}>{populationInfo}</p>
                    </div>
                    <div className={s.item}>
                        <p className={s.type}>Region:</p>
                        <p className={s.typeInfo}>{continentInfo}</p>
                    </div>
                    <div className={s.item}>
                        <p className={s.type}>Capital:</p>
                        <p className={s.typeInfo}>{capitalInfo}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
