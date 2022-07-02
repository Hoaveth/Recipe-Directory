import React from "react";
import { Link } from "react-router-dom";
import deleteIcon from "../assets/trash.png";
//styles
import "./styles/RecipeList.css";

import { useTheme } from "../hooks/useTheme";
import { projectFirestore } from "../firebase/config";

export default function RecipeList({ recipes }) {
  const { mode } = useTheme();

  const handleDelete = (id) => {
    projectFirestore.collection("recipes").doc(id).delete();
  };

  if (recipes.length === 0) {
    return <div className="error">No recipes found.</div>;
  } else {
    return (
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <div key={recipe.id} className={`card ${mode}`}>
            <h3>{recipe.title}</h3>
            <p>{recipe.cookingTime} to make.</p>
            <div>{recipe.method.substring(0, 100)}...</div>
            <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
            <img
              alt="delete icon"
              className="delete"
              src={deleteIcon}
              onClick={() => handleDelete(recipe.id)}
            />{" "}
          </div>
        ))}
      </div>
    );
  }
}
