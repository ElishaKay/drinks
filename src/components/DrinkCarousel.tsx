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
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
        if (isMobile) {
            return [drinks[currentIndex]];
        }
        const prev = currentIndex === 0 ? drinks.length - 1 : currentIndex - 1;
        const next = currentIndex === drinks.length - 1 ? 0 : currentIndex + 1;
        return [drinks[prev], drinks[currentIndex], drinks[next]];
    };

    return (
        <div className="carousel-wrapper" style={{
            background: "linear-gradient(to bottom, #1a1a1a, #2d2d2d)",
            padding: isMobile ? "1rem" : "2rem",
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
                    left: isMobile ? "0.5rem" : "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    background: "rgba(255, 105, 180, 0.1)",
                    border: "2px solid #ff00ff",
                    borderRadius: "50%",
                    padding: isMobile ? "0.3rem" : "0.5rem",
                    color: "#00ffff",
                    cursor: "pointer",
                    boxShadow: "0 0 10px #ff00ff"
                }}
            >
                <ChevronLeft size={isMobile ? 24 : 32} />
            </motion.button>

            <div
                ref={containerRef}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center", 
                    gap: "20px",
                    padding: isMobile ? "0.5rem" : "1rem",
                    position: "relative",
                    height: isMobile ? "60vh" : "100vh"
                }}
            >
                {getVisibleDrinks().map((drink, index) => (
                    <motion.div
                        key={`${drink.idDrink}-${index}`}
                        initial={false}
                        animate={{
                            scale: isMobile ? 1 : (index === 1 ? 1 : 0.8),
                            x: isMobile ? 0 : (index - 1) * (window.innerWidth * 0.25),
                            rotateY: isMobile ? 0 : (index === 0 ? 33 : index === 2 ? -33 : 0),
                            z: isMobile ? 0 : (index === 1 ? 0 : -100),
                            opacity: isMobile ? 1 : (index === 1 ? 1 : 0.6)
                        }}
                        whileHover={{
                            scale: isMobile ? 1.02 : (index === 1 ? 1.1 : 0.9),
                            transition: {
                                duration: 0.2
                            }
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                        }}
                        style={{
                            position: "absolute",
                            width: isMobile ? "100%" : "25%",
                            height: isMobile ? "55vh" : "80vh",
                            transformStyle: "preserve-3d",
                            transformOrigin: isMobile ? "center center" : 
                                (index === 0 ? "right center" : index === 2 ? "left center" : "center center")
                        }}
                    >
                        <div style={{
                            background: "rgba(255, 105, 180, 0.1)",
                            padding: isMobile ? "0.5rem" : "1rem",
                            borderRadius: "8px",
                            border: "2px solid #ff69b4",
                            boxShadow: isMobile ? "0 0 15px #ff00ff" :
                                (index === 1 ? "0 0 25px #ff00ff" : "0 0 15px rgba(255, 0, 255, 0.5)"),
                            perspective: "1000px",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            fontSize: isMobile ? "0.8rem" : "1rem"
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
                    right: isMobile ? "0.5rem" : "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    background: "rgba(255, 105, 180, 0.1)",
                    border: "2px solid #ff00ff",
                    borderRadius: "50%",
                    padding: isMobile ? "0.3rem" : "0.5rem",
                    color: "#00ffff",
                    cursor: "pointer",
                    boxShadow: "0 0 10px #ff00ff"
                }}
            >
                <ChevronRight size={isMobile ? 24 : 32} />
            </motion.button>
        </div>
    );
};

export default DrinkCarousel;
