import { Link } from "react-router-dom";

interface CocktailCardProps {
    cocktail: any;
}

const CocktailCard: React.FC<CocktailCardProps> = ({ cocktail }) => {
    return (
        <div className="cocktail-card">
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            <h3>{cocktail.strDrink}</h3>
            <Link to={`/cocktail/${cocktail.idDrink}`}>View Recipe</Link>
        </div>
    );
};

export default CocktailCard;
