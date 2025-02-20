import { useState } from "react";
import { fetchCocktails } from "../services/api";
import CocktailCard from "./CocktailCard";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);

    const handleSearch = async () => {
        const drinks = await fetchCocktails(query);
        setResults(drinks);
    };

    return (
        <div>
            <input type="text" placeholder="Search for a cocktail..." value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
            <div className="search-results">
                {results.map((cocktail) => (
                    <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
                ))}
            </div>
        </div>
    );
};

export default SearchBar;
