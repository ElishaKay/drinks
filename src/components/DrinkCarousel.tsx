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
    const containerRef = useRef<HTMLDivElement>(null);
    const [duplicatedDrinks, setDuplicatedDrinks] = useState<Drink[]>([]);

    useEffect(() => {
        // Duplicate the drinks array 3 times to create a seamless loop
        setDuplicatedDrinks([...drinks, ...drinks, ...drinks]);
    }, [drinks]);

    const scrollAmount = 200;

    const handleNext = () => {
        if (containerRef.current) {
            const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth;
            let newPosition = position + scrollAmount * 3; // Multiply by 3 to move one full card
            
            // If we're near the end, jump back to the first set of drinks
            if (newPosition >= maxScroll - scrollAmount * 3) {
                newPosition = scrollAmount * 3; // Move to the start of the second set
            }
            
            setPosition(newPosition);
            containerRef.current.scrollTo({
                left: newPosition,
                behavior: 'smooth'
            });
        }
    };

    const handlePrev = () => {
        if (containerRef.current) {
            let newPosition = position - scrollAmount * 3; // Multiply by 3 to move one full card
            
            // If we're near the start, jump to the last set of drinks
            if (newPosition <= scrollAmount * 3) {
                newPosition = containerRef.current.scrollWidth - (containerRef.current.clientWidth + scrollAmount * 3);
            }
            
            setPosition(newPosition);
            containerRef.current.scrollTo({
                left: newPosition,
                behavior: 'smooth'
            });
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
