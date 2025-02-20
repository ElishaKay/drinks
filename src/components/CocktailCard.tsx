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
                maxWidth: "600px",
                maxHeight: "600px", 
                display: "block",
                overflow: "hidden"
            }}
        >
            <img 
                src={cocktail.strDrinkThumb} 
                alt={cocktail.strDrink}
                style={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover"
                }}
            />
            <h3 style={{
                margin: "20px 0",
                fontSize: "2rem",
                textOverflow: "ellipsis", 
                overflow: "hidden",
                whiteSpace: "nowrap"
            }}>
                {cocktail.strDrink}
            </h3>
        </Link>
    );
};

export default CocktailCard;
