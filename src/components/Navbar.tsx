import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <h1>Cocktail Finder</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/add-drink">Add New Drink</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
