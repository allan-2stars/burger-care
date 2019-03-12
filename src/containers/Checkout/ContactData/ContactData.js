import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: { street: '', postCode: '' },
    loading: false
  };
  orderHandler = event => {
    event.preventDefault();
    //set loading to true for loading
    this.setState({ loading: true });
    const orderData = {
      ingredients: this.props.ingredients,
      // calculate price on server side as well
      price: this.props.totalPrice,
      customer: {
        name: 'Allan',
        address: { street: 'u street', code: 2000 },
        email: 'allan@a.com'
      }
    };
    axios
      .post('/orders.json', orderData)
      .then(res => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(err => this.setState({ loading: false }));
  };

  render() {
    let form = (
      <form>
        <input type='text' name='name' placeholder=' Your Name' />
        <input type='text' name='contact' placeholder=' Contact Number' />
        <input type='text' name='street' placeholder='Street' />
        <Button btnType='Success' clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
