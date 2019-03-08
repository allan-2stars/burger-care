import React from 'react';

const orderSummary = ({ ingredients }) => {
  const ingredientSummary = Object.keys(ingredients).map(ingredientKey => (
    <li key={ingredientKey}>
      <span style={{ textTransform: 'capitalize' }}>{ingredientKey}</span>:{' '}
      {ingredients[ingredientKey]}
    </li>
  ));
  return (
    <React.Fragment>
      <h3>Your Order</h3>
      <p>Hi, your delicious food ...</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to Checkout?</p>
    </React.Fragment>
  );
};
export default orderSummary;
