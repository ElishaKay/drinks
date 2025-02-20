import { useEffect, useState } from "react";
import { fetchCocktails } from "../services/api";
import CocktailCard from "./CocktailCard";

const CocktailList = () => {
    const [cocktails, setCocktails] = useState<any[]>([]);

    useEffect(() => {
        fetchCocktails("").then(setCocktails);
    }, []);

    return (
        <div className="cocktail-list">
            {cocktails.map((cocktail) => (
                <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
            ))}
        </div>
    );
};

export default CocktailList;
