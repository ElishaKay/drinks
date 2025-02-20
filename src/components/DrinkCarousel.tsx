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
    const [position, setPosition] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [duplicatedDrinks, setDuplicatedDrinks] = useState<Drink[]>([]);

    useEffect(() => {
        // Create a circular array by adding first two elements at the end
        setDuplicatedDrinks([...drinks, drinks[0], drinks[1]]);
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
    }, [position, currentIndex]);

    const scrollAmount = 200;

    const handleNext = () => {
        if (containerRef.current) {
            let newPosition = position + scrollAmount;
            let newIndex = currentIndex + 1;
            
            // If we reach the end of the duplicated list
            if (newIndex >= drinks.length) {
                // Reset to first item position without animation
                containerRef.current.style.scrollBehavior = 'auto';
                containerRef.current.scrollLeft = 0;
                newPosition = scrollAmount;
                newIndex = 1;
                
                // Re-enable smooth scrolling after a brief delay
                setTimeout(() => {
                    if (containerRef.current) {
                        containerRef.current.style.scrollBehavior = 'smooth';
                        containerRef.current.scrollLeft = newPosition;
                    }
                }, 50);
            } else {
                containerRef.current.scrollTo({
                    left: newPosition,
                    behavior: 'smooth'
                });
            }
            
            setPosition(newPosition);
            setCurrentIndex(newIndex);
        }
    };

    const handlePrev = () => {
        if (containerRef.current) {
            let newPosition = position - scrollAmount;
            let newIndex = currentIndex - 1;
            
            // If we reach the start
            if (newIndex < 0) {
                // Jump to end position without animation
                const endScrollPosition = (drinks.length - 1) * scrollAmount;
                containerRef.current.style.scrollBehavior = 'auto';
                containerRef.current.scrollLeft = endScrollPosition;
                newPosition = endScrollPosition - scrollAmount;
                newIndex = drinks.length - 2;
                
                // Re-enable smooth scrolling after a brief delay
                setTimeout(() => {
                    if (containerRef.current) {
                        containerRef.current.style.scrollBehavior = 'smooth';
                        containerRef.current.scrollLeft = newPosition;
                    }
                }, 50);
            } else {
                containerRef.current.scrollTo({
                    left: newPosition,
                    behavior: 'smooth'
                });
            }
            
            setPosition(newPosition);
            setCurrentIndex(newIndex);
        }
    };

    return (
        <div className="carousel-wrapper" style={{
            background: "linear-gradient(to bottom, #1a1a1a, #2d2d2d)",
            padding: "2rem",
            borderRadius: "12px",
            position: "relative",
            fontFamily: "'Press Start 2P', cursive",
            overflow: "hidden"
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
                    gap: "20px",
                    padding: "1rem",
                    overflowX: "hidden",
                    scrollBehavior: "smooth",
                    WebkitOverflowScrolling: "touch",
                    scrollSnapType: "x mandatory"
                }}
            >
                {duplicatedDrinks.map((drink, index) => (
                    <motion.div
                        key={`${drink.idDrink}-${index}`}
                        whileHover={{ 
                            scale: 1.1,
                            transition: { duration: 0.3 }
                        }}
                        style={{
                            flex: "0 0 180px",
                            scrollSnapAlign: "start",
                            filter: "drop-shadow(0 0 10px #ff00ff)"
                        }}
                    >
                        <div style={{
                            background: "rgba(255, 105, 180, 0.1)",
                            padding: "1rem",
                            borderRadius: "8px",
                            border: "2px solid #ff69b4",
                            boxShadow: "0 0 15px #ff00ff"
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
