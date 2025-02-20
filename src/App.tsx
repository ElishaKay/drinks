import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CocktailPage from "./pages/CocktailPage";
import AddDrinkPage from "./pages/AddDrinkPage";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cocktail/:id" element={<CocktailPage />} />
                <Route path="/add-drink" element={<AddDrinkPage />} />
            </Routes>
        </Router>
    );
}

export default App;
