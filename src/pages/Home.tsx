import { useEffect, useState, useCallback } from "react";
import { fetchCocktails } from "../services/api";
import DrinkCarousel from "../components/DrinkCarousel";

const Home = () => {
    const [cocktails, setCocktails] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Initial load without delay
        fetchCocktails("").then(setCocktails);
    }, []);

    const debouncedSearch = useCallback(
        (value: string) => {
            if (!value) {
                fetchCocktails("").then(setCocktails);
                setHasSearched(false);
                return;
            }

            const timeoutId = setTimeout(async () => {
                setIsLoading(true);
                const results = await fetchCocktails(value);
                setCocktails(results);
                setIsLoading(false);
                setHasSearched(true);
            }, 1500);

            return () => clearTimeout(timeoutId);
        },
        []
    );

    useEffect(() => {
        const cleanup = debouncedSearch(searchTerm);
        return cleanup;
    }, [searchTerm, debouncedSearch]);

    return (
        <div style={{
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
                fontSize: isMobile ? "2rem" : "3rem",
                textShadow: "2px 2px 0px #ff00ff, 4px 4px 0px #00ffff",
                marginBottom: "2rem"
            }}>
                Explore Cocktails
            </h1>

            <input
                type="text"
                placeholder="Search cocktails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    padding: isMobile ? "0.8rem" : "1rem",
                    width: isMobile ? "90%" : "50%",
                    maxWidth: "600px",
                    margin: "0 auto 2rem auto",
                    borderRadius: "8px",
                    border: "2px solid #ff69b4",
                    background: "rgba(255, 105, 180, 0.1)",
                    color: "#ff69b4",
                    fontFamily: "'Press Start 2P', cursive",
                    fontSize: isMobile ? "0.8rem" : "1rem",
                    outline: "none"
                }}
            />

            {isLoading ? (
                <p style={{
                    background: "rgba(255, 105, 180, 0.1)",
                    padding: "1rem",
                    borderRadius: "8px",
                    border: "1px solid #ff69b4",
                    maxWidth: "600px",
                    margin: "0 auto",
                    lineHeight: "1.6"
                }}>searching...</p>
            ) : cocktails.length > 0 ? (
                <div style={{ flex: 1 }}>
                    <DrinkCarousel drinks={cocktails} />
                </div>
            ) : hasSearched ? (
                <p style={{
                    background: "rgba(255, 105, 180, 0.1)",
                    padding: "1rem",
                    borderRadius: "8px",
                    border: "1px solid #ff69b4",
                    maxWidth: "600px",
                    margin: "0 auto",
                    lineHeight: "1.6"
                }}>couldn't find any matches - what else are you in the mood for?</p>
            ) : null}
        </div>
    );
};

export default Home;
