import { Link } from "react-router-dom";
import '../styles/components.scss';

const Navbar = () => {
    return (
        <nav style={{
            background: "linear-gradient(to bottom, #1a1a1a, #2d2d2d)",
            padding: "1rem 2rem",
            color: "#ff69b4",
            fontFamily: "'Press Start 2P', cursive"
        }}>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                maxWidth: "1200px",
                margin: "0 auto"
            }}>
                <Link to="/" style={{textDecoration: "none"}}>
                    <h1 style={{
                        fontSize: "2rem",
                        textShadow: "2px 2px 0px #ff00ff, 4px 4px 0px #00ffff",
                        margin: 0,
                        color: "#ff69b4"
                    }}>Cocktail Finder</h1>
                </Link>
                <ul style={{
                    listStyle: "none", 
                    display: "flex",
                    gap: "2rem",
                    margin: 0,
                    padding: 0
                }}>
                    <li>
                        <Link to="/" style={{
                            color: "#00ffff",
                            textDecoration: "none",
                            textShadow: "1px 1px #ff00ff",
                            transition: "all 0.3s ease"
                        }}>Home</Link>
                    </li>
                    <li>
                        <Link to="/add-drink" style={{
                            color: "#00ffff",
                            textDecoration: "none",
                            textShadow: "1px 1px #ff00ff",
                            transition: "all 0.3s ease"
                        }}>Add New Drink</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;