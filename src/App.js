import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Movies from "./pages/Movies/Movies";
import Series from "./pages/Series/Series";
import Trending from "./pages/Trending/Trending";
import Search from "./pages/Search/Search";
import Header from "./components/Header/Header";
import SimpleBottomNavigation from "./components/MainNav";
import {Container} from "@mui/system";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <div className="app">
                <Container>
                    <Routes>
                        <Route path="/" element={<Trending />} exact />
                        <Route path="/movies" element={<Movies />} />
                        <Route path="/series" element={<Series />} />
                        <Route path="/search" element={<Search />} />
                    </Routes>
                </Container>
            </div>
            <SimpleBottomNavigation />
        </BrowserRouter>
    );
}

export default App;
