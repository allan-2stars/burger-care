import React from 'react';

import classes from './Layout.module.css';
import Backdrop from '../UI/Backdrop/Backdrop';

const Layout = props => {
  return (
    // Toolbar, SideDrawer, Backdrop
    <React.Fragment>
      <div>Toolbar, SideDrawer, Backdrop</div>
      <Backdrop show={props.show} clicked={props.clicked} />
      <main className={classes.Content}>{props.children}</main>
    </React.Fragment>
  );
};
export default Layout;
