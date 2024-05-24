import React from "react";
import axios from "axios";

import { Country } from "../../types/country";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import darkTheme from "../../scss/darkTheme.module.scss";
import lightTheme from "../../scss/lightTheme.module.scss";
import s from "./countryInfo.module.scss";

const CountryInfo: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); // Получаем id страны из URL
    const [country, setCountry] = React.useState<Country>(null); // Состояние для хранения данных о стране
    const [isLoading, setIsLoading] = React.useState(true);
    const isDarkTheme = useSelector((state: RootState) => state.MainThemeSlice.isDarkTheme);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Country>(
                    `https://restcountries.com/v3.1/name/${id}?fullText=true`, //API оч медленный, порой надо ждать сек 20
                );
                setCountry(response.data[0]);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id]);

    // Если данные о стране еще не загружены, отображаем сообщение о загрузке
    if (!country) {
        return <div className={s.root}>Loading...</div>;
    }

    const handleBack = () => {
        navigate("/");
    };

    // Переменные для вывода информации
    const nameInfo = country.name.common;

    const officialNameInfo = country.name.official;

    const flagInfo = country.flags.svg;

    const subregionInfo = country.subregion ? country.subregion : "No Subregion";

    const populationInfo = country.population ? country.population.toLocaleString("en-US") : "0";

    const continentInfo = country.continents ? country.continents.join(", ") : "No Continent";

    const capitalInfo = country.capital ? country.capital.join(", ") : "No Capital";

    const tldInfo = country.tld[0] ? country.tld[0] : "No Top Level Domain";

    const languagesInfo = country.languages
        ? Object.values(country.languages).join(", ")
        : "No Languages";

    const currencyInfo = country.currencies
        ? Object.entries(country.currencies)
              .map(([_, details]) => `${details.name}`)
              .join(", ")
        : "No Currencies";

    const bordersInfo = country.borders;

    return (
        <div className={`${s.root} ${isDarkTheme ? darkTheme.root : lightTheme.root}`}>
            {!isLoading && (
                <div className={s.container}>
                    <div className={s.backBtn} onClick={handleBack}>
                        Back
                    </div>
                    <div className={s.infoContainer}>
                        <img className={s.flag} src={flagInfo} alt="" />
                        <div className={s.countryInfo}>
                            <h3 className={s.name}>{nameInfo}</h3>
                            <div className={s.items}>
                                <div className={s.item}>
                                    <p className={s.type}>Official Name:</p>
                                    <p className={s.typeInfo}>{officialNameInfo}</p>
                                </div>
                                <div className={s.item}>
                                    <p className={s.type}>Population:</p>
                                    <p className={s.typeInfo}>{populationInfo}</p>
                                </div>
                                <div className={s.item}>
                                    <p className={s.type}>Region:</p>
                                    <p className={s.typeInfo}>{continentInfo}</p>
                                </div>
                                <div className={s.item}>
                                    <p className={s.type}>Subregion:</p>
                                    <p className={s.typeInfo}>{subregionInfo}</p>
                                </div>
                                <div className={s.item}>
                                    <p className={s.type}>Capital:</p>
                                    <p className={s.typeInfo}>{capitalInfo}</p>
                                </div>
                                <div className={s.item}>
                                    <p className={s.type}>Top Level Domain:</p>
                                    <p className={s.typeInfo}>{tldInfo}</p>
                                </div>
                                <div className={s.item}>
                                    <p className={s.type}>Currencies:</p>
                                    <p className={s.typeInfo}>{currencyInfo}</p>
                                </div>
                                <div className={s.item}>
                                    <p className={s.type}>Languages:</p>
                                    <p className={s.typeInfo}>{languagesInfo}</p>
                                </div>
                            </div>
                            <div className={s.borders}>
                                <p className={s.type}>Border Contries:</p>
                                {bordersInfo
                                    ? bordersInfo.map((item) => (
                                          <div className={s.typeInfoBorder}>{item}</div>
                                      ))
                                    : "No Borders"}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CountryInfo;
