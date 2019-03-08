import React from 'react';

import Button from '../../UI/Button/Button';

const orderSummary = ({
  ingredients,
  purchaseCancelled,
  purchaseContinued
}) => {
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
      <Button btnType='Success' clicked={purchaseContinued}>
        COUNTINUE
      </Button>
      <Button btnType='Danger' clicked={purchaseCancelled}>
        CANCEL
      </Button>
    </React.Fragment>
  );
};
export default orderSummary;
