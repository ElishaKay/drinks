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

    if (!cocktail) return (
        <div style={{
          backgroundColor: "#1a1a1a",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#ff69b4"
        }}>
          <p>Loading...</p>
        </div>
      );

    return (
        <div className="container" style={{
            // maxWidth: "800px",
            margin: "0 auto",
            padding: "2rem",
            textAlign: "center",
            background: "linear-gradient(to bottom, #1a1a1a, #2d2d2d)",
            color: "#ff69b4",
            fontFamily: "'Press Start 2P', cursive"
        }}>
            <h1 style={{
                fontSize: "3rem",
                textShadow: "2px 2px 0px #ff00ff, 4px 4px 0px #00ffff",
                marginBottom: "2rem"
            }}>{cocktail.strDrink}</h1>
            
            <img 
                src={cocktail.strDrinkThumb} 
                alt={cocktail.strDrink} 
                style={{
                    width: "300px",
                    height: "300px",
                    borderRadius: "50%",
                    border: "4px solid #ff00ff",
                    boxShadow: "0 0 20px #ff00ff",
                    marginBottom: "2rem"
                }}
            />
            
            <h3 style={{
                color: "#00ffff",
                textShadow: "2px 2px #ff00ff",
                fontSize: "1.5rem"
            }}>Ingredients:</h3>
            
            <ul style={{
                listStyle: "none",
                padding: 0,
                margin: "1rem 0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5rem"
            }}>
                {[...Array(15)].map((_, i) => {
                    const ingredient = cocktail[`strIngredient${i + 1}`];
                    return ingredient ? (
                        <li 
                            key={i}
                            style={{
                                background: "rgba(255, 105, 180, 0.1)",
                                padding: "0.5rem 1rem",
                                borderRadius: "4px",
                                border: "1px solid #ff69b4"
                            }}
                        >{ingredient}</li>
                    ) : null;
                })}
            </ul>
            
            <h3 style={{
                color: "#00ffff",
                textShadow: "2px 2px #ff00ff",
                fontSize: "1.5rem"
            }}>Instructions:</h3>
            
            <p style={{
                background: "rgba(255, 105, 180, 0.1)",
                padding: "1rem",
                borderRadius: "8px",
                border: "1px solid #ff69b4",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: "1.6"
            }}>{cocktail.strInstructions}</p>
        </div>
    );
};

export default CocktailPage;
