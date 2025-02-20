import axios from "axios";

const API_BASE = "https://www.thecocktaildb.com/api/json/v1/1";

export const fetchCocktails = async (searchTerm: string) => {
    try {
        const response = await axios.get(`${API_BASE}/search.php?s=${searchTerm}`);
        return response.data.drinks;
    } catch (error) {
        console.error("Error fetching cocktails:", error);
        return [];
    }
};

export const fetchCocktailById = async (id: string) => {
    try {
        const response = await axios.get(`${API_BASE}/lookup.php?i=${id}`);
        return response.data.drinks[0];
    } catch (error) {
        console.error("Error fetching cocktail details:", error);
        return null;
    }
};
