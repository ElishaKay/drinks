import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CocktailCard from "./CocktailCard";

interface Drink {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
}

interface DrinkCarouselProps {
    drinks: Drink[];
}

const DrinkCarousel: React.FC<DrinkCarouselProps> = ({ drinks }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [duplicatedDrinks, setDuplicatedDrinks] = useState<Drink[]>([]);

    useEffect(() => {
        // Create a circular array by adding first element at the end
        setDuplicatedDrinks([...drinks, drinks[0]]);
    }, [drinks]);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                handlePrev();
            } else if (e.key === "ArrowRight") {
                handleNext();
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [currentIndex]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex >= drinks.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex <= 0 ? drinks.length - 1 : prevIndex - 1
        );
    };

    const getVisibleDrinks = () => {
        const prev = currentIndex === 0 ? drinks.length - 1 : currentIndex - 1;
        const next = currentIndex === drinks.length - 1 ? 0 : currentIndex + 1;
        return [drinks[prev], drinks[currentIndex], drinks[next]];
    };

    return (
        <div className="carousel-wrapper" style={{
            background: "linear-gradient(to bottom, #1a1a1a, #2d2d2d)",
            padding: "2rem",
            borderRadius: "12px",
            position: "relative",
            fontFamily: "'Press Start 2P', cursive",
            overflow: "hidden",
            perspective: "1000px"
        }}>
            <motion.button
                className="arrow left"
                onClick={handlePrev}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                    position: "absolute",
                    left: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    background: "rgba(255, 105, 180, 0.1)",
                    border: "2px solid #ff00ff",
                    borderRadius: "50%",
                    padding: "0.5rem",
                    color: "#00ffff",
                    cursor: "pointer",
                    boxShadow: "0 0 10px #ff00ff"
                }}
            >
                <ChevronLeft size={32} />
            </motion.button>

            <div
                ref={containerRef}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "20px",
                    padding: "1rem",
                    position: "relative",
                    height: "400px"
                }}
            >
                {getVisibleDrinks().map((drink, index) => (
                    <motion.div
                        key={`${drink.idDrink}-${index}`}
                        initial={false}
                        animate={{
                            scale: index === 1 ? 1 : 0.8,
                            x: (index - 1) * 250,
                            rotateY: index === 0 ? 45 : index === 2 ? -45 : 0,
                            z: index === 1 ? 0 : -100,
                            opacity: index === 1 ? 1 : 0.6
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                        }}
                        style={{
                            position: "absolute",
                            width: "200px",
                            transformStyle: "preserve-3d"
                        }}
                    >
                        <div style={{
                            background: "rgba(255, 105, 180, 0.1)",
                            padding: "1rem",
                            borderRadius: "8px",
                            border: "2px solid #ff69b4",
                            boxShadow: index === 1 ? 
                                "0 0 25px #ff00ff" : 
                                "0 0 15px rgba(255, 0, 255, 0.5)"
                        }}>
                            <CocktailCard cocktail={drink} />
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.button
                className="arrow right"
                onClick={handleNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                    position: "absolute",
                    right: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    background: "rgba(255, 105, 180, 0.1)",
                    border: "2px solid #ff00ff",
                    borderRadius: "50%",
                    padding: "0.5rem",
                    color: "#00ffff",
                    cursor: "pointer",
                    boxShadow: "0 0 10px #ff00ff"
                }}
            >
                <ChevronRight size={32} />
            </motion.button>
        </div>
    );
};

export default DrinkCarousel;
