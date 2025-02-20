import { useState } from "react";

const AddNewDrink = () => {
    const [drink, setDrink] = useState({ name: "", ingredients: "", instructions: "", image: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("New drink added:", drink);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={drink.name} onChange={(e) => setDrink({ ...drink, name: e.target.value })} required />
            <textarea placeholder="Ingredients" value={drink.ingredients} onChange={(e) => setDrink({ ...drink, ingredients: e.target.value })} required />
            <textarea placeholder="Instructions" value={drink.instructions} onChange={(e) => setDrink({ ...drink, instructions: e.target.value })} required />
            <input type="url" placeholder="Image URL" value={drink.image} onChange={(e) => setDrink({ ...drink, image: e.target.value })} />
            <button type="submit">Add Drink</button>
        </form>
    );
};

export default AddNewDrink;
