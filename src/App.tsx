import type { RootState } from "./store/store";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Header from "./components/Header";
import CountryInfo from "./pages/countryInfo";

import "./App.module.scss";
import darkTheme from "./scss/darkTheme.module.scss";
import lightTheme from "./scss/lightTheme.module.scss";

function App() {
    const isDarkTheme = useSelector((state: RootState) => state.MainThemeSlice.isDarkTheme);

    return (
        <div className={isDarkTheme ? darkTheme.root : lightTheme.root}>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/country/:id" element={<CountryInfo />} />
            </Routes>
        </div>
    );
}

export default App;
