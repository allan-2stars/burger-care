import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            {/* // a component directly wrapped by Route, will have the property of route history */}
            {/* // or you can use withRouter to wrap the component on export */}
            <Route path='/' exact component={BurgerBuilder} />
            <Route path='/checkout' component={Checkout} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
