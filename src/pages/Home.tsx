import { useEffect, useState } from "react";
import { fetchCocktails } from "../services/api";
import DrinkCarousel from "../components/DrinkCarousel";

const Home = () => {
    const [cocktails, setCocktails] = useState<any[]>([]);

    useEffect(() => {
        fetchCocktails("").then(setCocktails);
    }, []);

    return (
        <div className="home">
            <h1>Explore Cocktails</h1>
            {cocktails.length > 0 ? <DrinkCarousel drinks={cocktails} /> : <p>Loading...</p>}
        </div>
    );
};

export default Home;
