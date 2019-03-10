import React, { Component } from 'react';
import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICE = {
  salad: 0.55,
  bacon: 1.25,
  cheese: 0.85,
  meat: 1.6
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 3,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  // get ingredients data
  componentDidMount() {
    axios
      .get('https://react-my-burger-a4ed4.firebaseio.com/ingredients.json')
      .then(res => this.setState({ ingredients: res.data }))
      .catch(err => {
        this.setState({ error: true });
      });
  }
  updatePurchaseState = ingredients => {
    // use below commented method will not get the correct state
    // use above, transfer the parrameter from updated ingredient
    // const ingredients = { ...this.state.ingredients };

    const sum = Object.keys(ingredients)
      .map(ingredientKey => ingredients[ingredientKey])
      .reduce((acc, value) => acc + value, 0);
    // if sum > 0 so we can let use to purchase
    this.setState({ purchaseable: sum > 0 });
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
    this.updatePurchaseState(updatedIngredients);
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
      this.updatePurchaseState(updatedIngredients);
    }
  };

  // check if click on the order now button,
  // if clicked on order now successfully, set to true
  // in order to show the order summary
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // set loading to true for loading
    this.setState({ loading: true });
    const orderData = {
      ingredient: this.state.ingredients,
      // calculate price on server side as well
      price: this.state.totalPrice,
      customer: {
        name: 'Allan',
        address: { street: 'u street', code: 2000 },
        email: 'allan@a.com'
      }
    };
    axios
      .post('/order.json', orderData)
      .then(res => this.setState({ loading: false, purchasing: false }))
      .catch(err => this.setState({ loading: false, purchasing: false }));
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
    let orderSummary = null;
    // save burger component into a variable and use spinner
    // before the burger info loaded from DB
    let burger = this.state.error ? (
      <p>Ingredients cannot be loaded!</p>
    ) : (
      <Spinner />
    );
    if (this.state.ingredients) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdd={this.addIngredientHandler}
            ingredientRemove={this.removeIngredientHandler}
            disabled={disableInfo}
            price={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            ordered={this.purchaseHandler}
          />
        </React.Fragment>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <React.Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
