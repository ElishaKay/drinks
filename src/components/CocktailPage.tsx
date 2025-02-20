import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCocktailById } from "../services/api";

const CocktailPage = () => {
    const { id } = useParams<{ id: string }>();
    const [cocktail, setCocktail] = useState<any>(null);

    useEffect(() => {
        if (id) {
            fetchCocktailById(id).then(setCocktail);
        }
    }, [id]);

    if (!cocktail) return <p>Loading...</p>;

    return (
        <div>
            <h1>{cocktail.strDrink}</h1>
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            <h3>Ingredients:</h3>
            <ul>
                {[...Array(15)].map((_, i) => {
                    const ingredient = cocktail[`strIngredient${i + 1}`];
                    return ingredient ? <li key={i}>{ingredient}</li> : null;
                })}
            </ul>
            <h3>Instructions:</h3>
            <p>{cocktail.strInstructions}</p>
        </div>
    );
};

export default CocktailPage;
