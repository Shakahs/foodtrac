import React, { Component } from 'react';
import OrderList from './OrderList';

class IncomingOrder extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <OrderList />
    );
  }
}

export default IncomingOrder;
