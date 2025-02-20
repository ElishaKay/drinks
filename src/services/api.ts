import axios from "axios";

const API_BASE = "https://www.thecocktaildb.com/api/json/v1/1";

const fetchCocktailsFromAPI = async (searchTerm: string) => {
    try {
        const response = await axios.get(`${API_BASE}/search.php?s=${searchTerm || "martini"}`);
        return response.data.drinks || [];
    } catch (error) {
        console.error("Error fetching cocktails from API:", error);
        return [];
    }
};

const fetchCocktailsFromLocalStorage = (searchTerm: string) => {
    try {
        const savedCocktails = JSON.parse(localStorage.getItem("cocktails") || "[]");
        if (!searchTerm) return savedCocktails;
        return savedCocktails.filter((drink: any) => 
            drink.strDrink.toLowerCase().includes(searchTerm.toLowerCase())
        );
    } catch (error) {
        console.error("Error fetching cocktails from localStorage:", error);
        return [];
    }
};

export const fetchCocktails = async (searchTerm: string) => {
    const [apiCocktails, localCocktails] = await Promise.all([
        fetchCocktailsFromAPI(searchTerm),
        fetchCocktailsFromLocalStorage(searchTerm)
    ]);
    
    // Combine results, avoiding duplicates by ID
    const seenIds = new Set();
    const allCocktails = [...apiCocktails, ...localCocktails].filter(drink => {
        if (!drink) return false;
        if (seenIds.has(drink.idDrink)) return false;
        seenIds.add(drink.idDrink);
        return true;
    });
    
    return allCocktails;
};

export const fetchCocktailById = async (id: string) => {
    try {
        // First check localStorage
        const savedCocktails = JSON.parse(localStorage.getItem("cocktails") || "[]");
        const localCocktail = savedCocktails.find((drink: any) => drink.idDrink === id);
        if (localCocktail) return localCocktail;

        // If not found locally, fetch from API
        const response = await axios.get(`${API_BASE}/lookup.php?i=${id}`);
        return response.data.drinks[0];
    } catch (error) {
        console.error("Error fetching cocktail details:", error);
        return null;
    }
};
