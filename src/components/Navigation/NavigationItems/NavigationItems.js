import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link={'/'} active>
        Burger Builder
      </NavigationItem>
      <NavigationItem link={'/'}>Checkout</NavigationItem>
      <NavigationItem link={'/'}>Login</NavigationItem>
      <NavigationItem link={'/'}>Signup</NavigationItem>
    </ul>
  );
};

export default navigationItems;
