import { useEffect, useState } from "react";
import { fetchCocktails } from "../services/api";
import DrinkCarousel from "../components/DrinkCarousel";

const Home = () => {
    const [cocktails, setCocktails] = useState<any[]>([]);

    useEffect(() => {
        fetchCocktails("").then(setCocktails);
    }, []);

    return (
        <div style={{
            // maxWidth: "1200px",
            margin: "0 auto",
            padding: "2rem",
            textAlign: "center",
            background: "linear-gradient(to bottom, #1a1a1a, #2d2d2d)",
            color: "#ff69b4",
            fontFamily: "'Press Start 2P', cursive",
            minHeight: "88vh",
            display: "flex",
            flexDirection: "column"
        }}>
            <h1 style={{
                fontSize: "3rem",
                textShadow: "2px 2px 0px #ff00ff, 4px 4px 0px #00ffff",
                marginBottom: "2rem"
            }}>
                Explore Cocktails
            </h1>
            {cocktails.length > 0 ? (
                <div style={{ flex: 1 }}>
                    <DrinkCarousel drinks={cocktails} />
                </div>
            ) : (
                <p style={{
                    background: "rgba(255, 105, 180, 0.1)",
                    padding: "1rem",
                    borderRadius: "8px",
                    border: "1px solid #ff69b4",
                    maxWidth: "600px",
                    margin: "0 auto",
                    lineHeight: "1.6"
                }}>Loading...</p>
            )}
        </div>
    );
};

export default Home;
