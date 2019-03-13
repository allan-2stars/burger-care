import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: { type: 'text', placeholder: 'Your name' },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: { type: 'text', placeholder: 'Street' },
        value: ''
      },
      contact: {
        elementType: 'input',
        elementConfig: { type: 'text', placeholder: 'Contact' },
        value: ''
      },
      postCode: {
        elementType: 'input',
        elementConfig: { type: 'text', placeholder: 'Post Code' },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'deliveroo', displayValue: 'Deliveroo' },
            { value: 'sydsend', displayValue: 'Sydney Send' },
            { value: 'ups', displayValue: 'UPS' }
          ]
        },
        value: ''
      }
    },
    loading: false
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    // save element value under base key for later copy back to updatedOrderForm,
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    // change the value and then,
    updatedFormElement.value = event.target.value;
    // copy back to updatedOrderForm
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    // all done, deep copy otherwise will loss data
    this.setState({ orderForm: updatedOrderForm });
  };

  orderHandler = event => {
    event.preventDefault();
    //set loading to true for loading
    this.setState({ loading: true });
    const orderData = {
      ingredients: this.props.ingredients,
      // calculate price on server side as well
      price: this.props.totalPrice
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
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({ id: key, config: this.state.orderForm[key] });
    }
    let form = (
      <form>
        {formElementsArray.map(formEl => (
          <Input
            elementType={formEl.config.elementType}
            elementConfig={formEl.config.elementConfig}
            value={formEl.config.value}
            changed={event => this.inputChangedHandler(event, formEl.id)}
          />
        ))}
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
