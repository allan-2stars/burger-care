import React, { Component } from 'react';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };
  componentDidMount() {
    axios
      .get('/orders.json')
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          // push the data object into an arrya + id:key
          fetchedOrders.push({ ...res.data[key], id: key });
        }
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }
  render() {
    let orders = this.state.orders.map(order => (
      <Order
        key={order.id}
        totalPrice={+order.price}
        ingredients={order.ingredients}
      />
    ));
    return <div>{orders}</div>;
  }
}
export default withErrorHandler(Orders, axios);
