import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

    const scrollAmount = 300;

    const handleNext = () => {
        if (containerRef.current) {
            const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth;
            setPosition((prev) => Math.min(prev + scrollAmount, maxScroll));
        }
    };

    const handlePrev = () => {
        setPosition((prev) => Math.max(prev - scrollAmount, 0));
    };

    return (
        <div className="carousel-wrapper">
            <motion.button
                className="arrow left"
                onClick={handlePrev}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <ChevronLeft size={32} />
            </motion.button>

            <motion.div
                ref={containerRef}
                className="carousel"
                animate={{ x: -position }}
                transition={{ 
                    type: "spring",
                    stiffness: 70,
                    damping: 20,
                    mass: 1
                }}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px"
                }}
            >
                {drinks.map((drink, i) => (
                    <motion.div
                        key={drink.idDrink}
                        className="drink-card"
                        initial={{ rotateY: 0 }}
                        animate={{ 
                            rotateY: position > 0 ? -15 : 0,
                            z: 50
                        }}
                        whileHover={{ 
                            scale: 1.1,
                            rotateY: 15,
                            transition: { duration: 0.3 }
                        }}
                        style={{
                            transformStyle: "preserve-3d",
                            flex: "0 0 180px"
                        }}
                    >
                        <img 
                            src={drink.strDrinkThumb} 
                            alt={drink.strDrink}
                            style={{
                                width: "100%",
                                height: "200px",
                                objectFit: "cover",
                                borderRadius: "12px 12px 0 0"
                            }}
                        />
                        <h3>{drink.strDrink}</h3>
                    </motion.div>
                ))}
            </motion.div>

            <motion.button
                className="arrow right"
                onClick={handleNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <ChevronRight size={32} />
            </motion.button>
        </div>
    );
};

export default DrinkCarousel;
