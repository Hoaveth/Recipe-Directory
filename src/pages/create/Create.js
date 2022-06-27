import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

//styles
import "./Create.css";

export default function Create() {
  let history = useHistory();
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState("");
  const ingredientInput = useRef(null);

  const { postData, data, error } = useFetch(
    "http://localhost:3000/recipes",
    "POST"
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    //set the postData and send a POST request
    postData({
      title,
      ingredients,
      method,
      cookingTime: cookingTime + " minutes",
    });
  };

  const handleAddIngredient = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();

    //Check if ingredient is unique
    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, ing]);
    }

    //Clear the newIngredient and set focus
    setNewIngredient("");
    ingredientInput.current.focus();
  };

  useEffect(() => {
    //Redirect the user to the homepage
    if (data) {
      history.push("/");
    }
  }, [data, history]);

  return (
    <div className="create">
      <h2 className="page-title"> Add a New Recipe </h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe Title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        {/* Ingredients go here */}
        <label>
          <span>Recipe Ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button onClick={handleAddIngredient} className="btn">
              Add Ingredient
            </button>
          </div>
        </label>
        <p>
          Current Ingredients:
          {ingredients &&
            ingredients.map((ing) => {
              return <em key={ing}>{ing}, </em>;
            })}
        </p>

        <label>
          <span>Recipe Method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>
        <label>
          <span>Cooking Time (minutes):</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
}
