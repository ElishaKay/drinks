import AddNewDrink from "../components/AddNewDrink";

const AddDrinkPage = () => {
    return (
        <div style={{
            margin: "0 auto",
            padding: "2rem",
            textAlign: "center",
            background: "linear-gradient(to bottom, #1a1a1a, #2d2d2d)",
            color: "#ff69b4",
            fontFamily: "'Press Start 2P', cursive",
            minHeight: "88vh"
        }}>
            <AddNewDrink />
        </div>
    );
};

export default AddDrinkPage;
