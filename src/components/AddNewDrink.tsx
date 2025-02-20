import { useState } from "react";

const AddNewDrink = () => {
    const [drink, setDrink] = useState({
        strDrink: "",
        strDrinkThumb: "",
        strInstructions: "",
        strIngredient1: "",
        strIngredient2: "",
        strIngredient3: "",
        strIngredient4: "",
        strIngredient5: ""
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const savedCocktails = JSON.parse(localStorage.getItem("cocktails") || "[]");
        const newDrink = {
            ...drink,
            idDrink: Date.now().toString()
        };
        localStorage.setItem("cocktails", JSON.stringify([...savedCocktails, newDrink]));
        setSubmitted(true);
    };

    const resetForm = () => {
        setDrink({
            strDrink: "",
            strDrinkThumb: "",
            strInstructions: "",
            strIngredient1: "",
            strIngredient2: "",
            strIngredient3: "",
            strIngredient4: "",
            strIngredient5: ""
        });
        setSubmitted(false);
    };

    if (submitted) {
        return (
            <div style={{
                maxWidth: "800px",
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
                }}>Your drink has been added successfully</h1>

                <button
                    onClick={resetForm}
                    style={{
                        padding: "1rem",
                        borderRadius: "8px",
                        border: "none",
                        background: "#ff69b4",
                        color: "#1a1a1a",
                        fontFamily: "'Press Start 2P', cursive",
                        cursor: "pointer",
                        textShadow: "1px 1px #ff00ff",
                        boxShadow: "0 0 10px #ff00ff"
                    }}
                >
                    Add another one
                </button>
            </div>
        );
    }

    return (
        <div style={{
            maxWidth: "800px",
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
            }}>Add New Cocktail</h1>

            <form onSubmit={handleSubmit} style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                maxWidth: "600px",
                margin: "0 auto"
            }}>
                <input
                    type="text"
                    placeholder="Cocktail Name"
                    value={drink.strDrink}
                    onChange={(e) => setDrink({ ...drink, strDrink: e.target.value })}
                    required
                    style={{
                        padding: "0.8rem",
                        borderRadius: "8px",
                        border: "2px solid #ff69b4",
                        background: "rgba(255, 105, 180, 0.1)",
                        color: "#ff69b4",
                        fontFamily: "'Press Start 2P', cursive"
                    }}
                />

                <input
                    type="url"
                    placeholder="Image URL"
                    value={drink.strDrinkThumb}
                    onChange={(e) => setDrink({ ...drink, strDrinkThumb: e.target.value })}
                    required
                    style={{
                        padding: "0.8rem",
                        borderRadius: "8px",
                        border: "2px solid #ff69b4",
                        background: "rgba(255, 105, 180, 0.1)",
                        color: "#ff69b4",
                        fontFamily: "'Press Start 2P', cursive"
                    }}
                />

                {[1, 2, 3, 4, 5].map((num) => (
                    <input
                        key={num}
                        type="text"
                        placeholder={`Ingredient ${num}`}
                        value={drink[`strIngredient${num}` as keyof typeof drink]}
                        onChange={(e) => setDrink({ ...drink, [`strIngredient${num}`]: e.target.value })}
                        style={{
                            padding: "0.8rem",
                            borderRadius: "8px",
                            border: "2px solid #ff69b4",
                            background: "rgba(255, 105, 180, 0.1)",
                            color: "#ff69b4",
                            fontFamily: "'Press Start 2P', cursive"
                        }}
                    />
                ))}

                <textarea
                    placeholder="Instructions"
                    value={drink.strInstructions}
                    onChange={(e) => setDrink({ ...drink, strInstructions: e.target.value })}
                    required
                    style={{
                        padding: "0.8rem",
                        borderRadius: "8px",
                        border: "2px solid #ff69b4",
                        background: "rgba(255, 105, 180, 0.1)",
                        color: "#ff69b4",
                        fontFamily: "'Press Start 2P', cursive",
                        minHeight: "150px"
                    }}
                />

                <button
                    type="submit"
                    style={{
                        padding: "1rem",
                        borderRadius: "8px",
                        border: "none",
                        background: "#ff69b4",
                        color: "#1a1a1a",
                        fontFamily: "'Press Start 2P', cursive",
                        cursor: "pointer",
                        textShadow: "1px 1px #ff00ff",
                        boxShadow: "0 0 10px #ff00ff"
                    }}
                >
                    Add Cocktail
                </button>
            </form>
        </div>
    );
};

export default AddNewDrink;
