import React from 'react';

const Layout = props => {
  return (
    // Toolbar, SideDrawer, Backdrop
    <React.Fragment>
      <div>Toolbar, SideDrawer, Backdrop</div>
      <main>{props.children}</main>
    </React.Fragment>
  );
};
export default Layout;
