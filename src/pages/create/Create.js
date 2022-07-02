import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { projectFirestore } from "../../firebase/config";

//styles
import "./Create.css";

export default function Create() {
  let history = useHistory();

  //For updating recipe
  const { id: updateId } = useParams();
  const isUpdate = updateId !== null || updateId !== undefined ? true : false;
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  //For creating recipe
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState("");
  const ingredientInput = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //set the postData and send a POST request
    const doc = {
      title,
      ingredients,
      method,
      cookingTime: cookingTime + " minutes",
    };

    try {
      if (!isUpdate) {
        await projectFirestore.collection("recipes").add(doc);
      } else {
        projectFirestore.collection("recipes").doc(updateId).update(doc);
      }
      history.push("/");
    } catch (err) {
      console.log(err);
    }
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
    if (isUpdate) {
      projectFirestore
        .collection("recipes")
        .doc(updateId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            let recipe = doc.data();
            setTitle(recipe.title);
            setCookingTime(parseInt(recipe.cookingTime));
            setMethod(recipe.method);
            setIngredients(recipe.ingredients);
            setIsPending(false);
          } else {
            setError("No Document found");
            setIsPending(false);
          }
        });
    }
  }, [updateId, isUpdate]);

  return (
    <div className="create">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      <h2 className="page-title">
        {isUpdate ? `Add a New Recipe` : `Update Recipe`}
      </h2>
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
