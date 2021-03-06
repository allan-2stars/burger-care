import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link={'/'} exact>
        Burger Builder
      </NavigationItem>
      <NavigationItem link={'/orders'}>Orders</NavigationItem>
      <NavigationItem link={'/login'}>Login</NavigationItem>
      <NavigationItem link={'/signup'}>Signup</NavigationItem>
    </ul>
  );
};

export default navigationItems;
