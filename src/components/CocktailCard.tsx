import { Link } from "react-router-dom";

interface CocktailCardProps {
    cocktail: any;
}

const CocktailCard: React.FC<CocktailCardProps> = ({ cocktail }) => {
    return (
        <Link to={`/cocktail/${cocktail.idDrink}`} className="cocktail-card">
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            <h3>{cocktail.strDrink}</h3>
        </Link>
    );
};

export default CocktailCard;
