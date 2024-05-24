import React from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import InfiniteScroll from "react-infinite-scroll-component";
import CartItem from "../CartItem";

import { Link } from "react-router-dom";
import { Country } from "../../types/country";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { setSearchTerm, setRegion } from "../../store/slices/filterSlice";

import { FaAngleUp, FaAngleDown } from "react-icons/fa";

import s from "./content.module.scss";
import darkTheme from "../../scss/darkTheme.module.scss";
import lightTheme from "../../scss/lightTheme.module.scss";

const Content: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const isDarkTheme = useSelector((state: RootState) => state.MainThemeSlice.isDarkTheme);
    const [data, setData] = React.useState<Country[]>([]);
    const searchTerm = useSelector((state: RootState) => state.FilterSlice.searchTerm);
    const region = useSelector((state: RootState) => state.FilterSlice.region);
    const [modalWindow, setModalWindow] = React.useState(false);
    const [visibleData, setVisibleData] = React.useState<Country[]>([]); // Состояние для хранения отображаемых данных
    const [hasMore, setHasMore] = React.useState(true); // Состояние для управления бесконечной прокруткой

    const ITEMS_PER_PAGE = 32; // Константа для количества элементов на странице

    // Эффект для загрузки данных при монтировании компонента
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Country[]>("https://restcountries.com/v3.1/all");
                setData(response.data);
                setVisibleData(response.data.slice(0, ITEMS_PER_PAGE));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // Эффект для обновления отображаемых данных при изменении данных, поискового запроса или региона
    React.useEffect(() => {
        setVisibleData(filteredData.slice(0, ITEMS_PER_PAGE));
    }, [data, searchTerm, region]);

    // Дебаунс для уменьшения количества запросов при изменении поискового запроса
    const debouncedSearchTerm = React.useCallback(
        debounce((value: string) => {
            dispatch(setSearchTerm(value));
        }, 500),
        [],
    );

    // Обработчик изменения поискового запроса
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSearchTerm(event.target.value);
    };

    // Обработчик выбора региона
    const handleRegion = (region: string) => {
        dispatch(setRegion(region === "All" ? null : region));
    };

    // Обработчик переключения модального окна
    const toggleModalWindow = () => {
        setModalWindow(!modalWindow);
    };

    // Функция для загрузки дополнительных данных при прокрутке
    const fetchMoreData = () => {
        if (visibleData.length >= filteredData.length) {
            setHasMore(false); // Если все данные загружены, прекращаем загрузку
            return;
        }
        setTimeout(() => {
            setVisibleData((prev) => [
                ...prev,
                ...filteredData.slice(prev.length, prev.length + ITEMS_PER_PAGE),
            ]);
        }, 500);
    };

    // Фильтрация данных на основе поискового запроса и выбранного региона
    const filteredData = data.filter(
        (country) =>
            (!region || country.continents?.includes(region)) &&
            (country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (country.continents &&
                    country.continents.join(", ").toLowerCase().includes(searchTerm.toLowerCase())) ||
                (country.capital &&
                    country.capital.some((capital) =>
                        capital.toLowerCase().includes(searchTerm.toLowerCase()),
                    ))),
    );

    return (
        <div className={`${s.root} ${isDarkTheme ? darkTheme.root : lightTheme.root}`}>
            {filteredData && (
                <div className={s.container}>
                    <div className={s.inputs}>
                        <div className={s.searchFor}>
                            <input
                                type="text"
                                placeholder="Search for a country/capital..."
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={s.searchByRegion}>
                            <div className={s.sortBy} onClick={toggleModalWindow}>
                                Sort By {region ? region : "Region"}
                                {modalWindow ? <FaAngleUp /> : <FaAngleDown />}
                            </div>
                            <ul
                                className={`${s.regions} ${modalWindow ? s.show : ""} ${
                                    isDarkTheme ? darkTheme.root : lightTheme.root
                                }`}
                            >
                                <li className={s.region} onClick={() => handleRegion("All")}>
                                    All
                                </li>
                                <li className={s.region} onClick={() => handleRegion("Africa")}>
                                    Africa
                                </li>
                                <li className={s.region} onClick={() => handleRegion("North America")}>
                                    North America
                                </li>
                                <li className={s.region} onClick={() => handleRegion("South America")}>
                                    South America
                                </li>
                                <li className={s.region} onClick={() => handleRegion("Asia")}>
                                    Asia
                                </li>
                                <li className={s.region} onClick={() => handleRegion("Europe")}>
                                    Europe
                                </li>
                                <li className={s.region} onClick={() => handleRegion("Oceania")}>
                                    Oceania
                                </li>
                                <li className={s.region} onClick={() => handleRegion("Antarctica")}>
                                    Antarctica
                                </li>
                            </ul>
                        </div>
                    </div>
                    <InfiniteScroll
                        dataLength={visibleData.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={
                            <h4>
                                <br />
                            </h4>
                        }
                    >
                        <ul className={s.carts}>
                            {visibleData.map((country, index) => (
                                <li key={index} className={s.cart}>
                                    <Link to={`/country/${country.name.common}`}>
                                        <CartItem
                                            name={country.name}
                                            flags={country.flags}
                                            population={country.population}
                                            continents={country.continents}
                                            capital={country.capital}
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </InfiniteScroll>
                </div>
            )}
        </div>
    );
};

export default Content;
