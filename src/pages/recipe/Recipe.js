import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
//styles
import "./Recipe.css";

import { projectFirestore } from "../../firebase/config";

export default function Recipe() {
  const { id } = useParams();
  const { mode } = useTheme();
  const history = useHistory();
  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);
    projectFirestore
      .collection("recipes")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setRecipe(doc.data());
          setIsPending(false);
        } else {
          setError("No Document found");
          setIsPending(false);
        }
      });
  }, [id]);

  const handleUpdate = () => {
    history.push(`/update/${id}`);
  };

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h1>{recipe.title}</h1>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
          <button className="update-button" onClick={() => handleUpdate()}>
            Update Me
          </button>
        </>
      )}
    </div>
  );
}
