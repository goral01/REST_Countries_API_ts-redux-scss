import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { setDarkTheme } from "../../store/slices/mainThemeSlice";
import { setSearchTerm, setRegion } from "../../store/slices/filterSlice";

import { FaRegMoon, FaMoon } from "react-icons/fa6";

import s from "./header.module.scss";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isDarkTheme = useSelector((state: RootState) => state.MainThemeSlice.isDarkTheme);

    const handleRefresh = () => {
        dispatch(setSearchTerm(""));
        dispatch(setRegion(null));
        navigate("/");
    };

    return (
        <div className={s.root}>
            <div className={s.container}>
                <div className={s.item} onClick={handleRefresh}>
                    <h1 className={s.title}>Where in the world?</h1>
                </div>
                <div className={s.item} onClick={() => dispatch(setDarkTheme(isDarkTheme))}>
                    {isDarkTheme ? <FaMoon /> : <FaRegMoon />}
                    {isDarkTheme ? (
                        <h3 className={s.mode}>Dark Mode</h3>
                    ) : (
                        <h3 className={s.mode}>Light Mode</h3>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
