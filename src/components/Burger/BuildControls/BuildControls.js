import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {
    label: 'Salad',
    type: 'salad'
  },
  {
    label: 'Bacon',
    type: 'bacon'
  },
  {
    label: 'Cheese',
    type: 'cheese'
  },
  {
    label: 'Meat',
    type: 'meat'
  }
];

const buildControls = ({
  ingredientAdd,
  ingredientRemove,
  disabled,
  price,
  purchaseable
}) => (
  <div className={classes.BuildControls}>
    <p>
      Total Price: <strong>{price.toFixed(2)}</strong>
    </p>
    {controls.map(control => (
      <BuildControl
        key={control.label}
        label={control.label}
        added={() => ingredientAdd(control.type)}
        removed={() => ingredientRemove(control.type)}
        disabled={disabled[control.type]}
      />
    ))}
    <button className={classes.OrderButton} disabled={!purchaseable}>
      Order Now
    </button>
  </div>
);
export default buildControls;
