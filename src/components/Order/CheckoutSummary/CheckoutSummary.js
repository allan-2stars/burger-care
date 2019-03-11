import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = ({
  ingredients,
  checkoutCancelled,
  checkoutContinued
}) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>good taste</h1>
      <div style={{ width: '100%', margin: 'auto', scroll: 'hidden' }}>
        <Burger ingredients={ingredients} />
      </div>
      <Button btnType='Danger' clicked={checkoutCancelled}>
        CANCEL
      </Button>
      <Button btnType='Success' clicked={checkoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default checkoutSummary;
