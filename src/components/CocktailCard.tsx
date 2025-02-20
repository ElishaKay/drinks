import { Link } from "react-router-dom";

interface CocktailCardProps {
    cocktail: any;
}

const CocktailCard: React.FC<CocktailCardProps> = ({ cocktail }) => {
    return (
        <Link 
            to={`/cocktail/${cocktail.idDrink}`} 
            className="cocktail-card"
            style={{
                maxWidth: "1200px",
                height: "100%",
                display: "block",
                overflow: "hidden"
            }}
        >
            <img 
                src={cocktail.strDrinkThumb} 
                alt={cocktail.strDrink}
                style={{
                    width: "100%",
                    height: "calc(100% - 60px)", // Leave space for title
                    objectFit: "cover"
                }}
            />
            <h3 style={{
                margin: "10px 0",
                fontSize: "2rem",
                textOverflow: "ellipsis", 
                overflow: "hidden",
                whiteSpace: "nowrap",
                color: "#00ffff",
                textShadow: "2px 2px #ff00ff"
            }}>
                {cocktail.strDrink}
            </h3>
        </Link>
    );
};

export default CocktailCard;
