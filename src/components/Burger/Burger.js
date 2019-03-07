import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const Burger = ({ ingredients }) => {
  // get the ingredients props from upper component -- Burger Builder
  // then transfer the object into an array
  //
  let transformIngredients = Object.keys(ingredients)
    .map(ingKey => {
      // gether how many such ingredient keys we have
      // spread the keys into a new array which is ingredientsKeys
      // only declear the array space, not the content which is undefined
      const ingredientsKeys = [...Array(ingredients[ingKey])];
      // map over every array decleared space, the variable name does not matter
      // so we use _, but the index is for key value to make it unique.
      return ingredientsKeys.map((_, index) => {
        console.log('inside:', index);
        // unique key eg: meat0 or salad3.
        // will map every declared space, aim is to run the numbers of BurgerIngredient Component
        return <BurgerIngredient key={ingKey + index} type={ingKey} />;
      });
    })
    // use reduce to flat out the elements
    .reduce((array, element) => {
      return array.concat(element);
    }, []);

  if (transformIngredients.length === 0) {
    transformIngredients = <p>Add some ingredient</p>;
  }

  console.log(transformIngredients);
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={'bread-top'} />
      {transformIngredients}
      <BurgerIngredient type={'bread-bottom'} />
    </div>
  );
};

export default Burger;
