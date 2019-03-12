import React from 'react';
import classes from './Order.module.css';

const order = ({ totalPrice, ingredients }) => {
  // transform ingredient
  const transferredIngredients = [];
  for (let ingredientName in ingredients) {
    transferredIngredients.push({
      name: ingredientName,
      amount: ingredients[ingredientName]
    });
  }

  const ingredientOutput = transferredIngredients.map(ing => {
    return (
      <span
        key={ing.name}
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid black',
          padding: '3px'
        }}
      >
        {ing.name} ({ing.amount})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients:{ingredientOutput}</p>
      <p>
        Price: <strong>AUD {totalPrice.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
