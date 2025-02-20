import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface Drink {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
}

interface DrinkCarouselProps {
    drinks: Drink[];
}

const DrinkCarousel: React.FC<DrinkCarouselProps> = ({ drinks }) => {
    const [index, setIndex] = useState(0);

    const handleNext = () => {
        setIndex((prev) => (prev + 1) % drinks.length);
    };

    const handlePrev = () => {
        setIndex((prev) => (prev - 1 + drinks.length) % drinks.length);
    };

    return (
        <div className="carousel-container">
            <button className="arrow left" onClick={handlePrev}>
                <ChevronLeft size={32} />
            </button>

            <div className="carousel">
                {drinks.map((drink, i) => {
                    const offset = (i - index) * 50;
                    const rotateY = (i - index) * -30;

                    return (
                        <motion.div
                            key={drink.idDrink}
                            className="drink-card"
                            initial={{ opacity: 0, rotateY: rotateY, x: offset }}
                            animate={{ opacity: i === index ? 1 : 0.6, rotateY: rotateY, x: offset }}
                            transition={{ type: "spring", stiffness: 100 }}
                        >
                            <img src={drink.strDrinkThumb} alt={drink.strDrink} />
                            <h3>{drink.strDrink}</h3>
                        </motion.div>
                    );
                })}
            </div>

            <button className="arrow right" onClick={handleNext}>
                <ChevronRight size={32} />
            </button>
        </div>
    );
};

export default DrinkCarousel;
