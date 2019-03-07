import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICE = {
  salad: 0.5,
  bacon: 1.2,
  cheese: 0.8,
  meat: 1.5
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 3
  };

  // add ingredient
  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  };

  // remove ingredient
  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount - 1;
    if (updatedCount >= 0) {
      const updatedIngredients = {
        ...this.state.ingredients
      };
      updatedIngredients[type] = updatedCount;
      const priceDeduction = INGREDIENT_PRICE[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceDeduction;

      this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    }
  };

  render() {
    const disableInfo = {
      ...this.state.ingredients
    };
    for (let key in disableInfo) {
      // set disableInfo's value as true or false.
      // eg, disable[salad] = 0, then disableInfo[salad] = true
      disableInfo[key] = disableInfo[key] <= 0;
    }
    return (
      <React.Fragment>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdd={this.addIngredientHandler}
          ingredientRemove={this.removeIngredientHandler}
          disabled={disableInfo}
        />
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;
