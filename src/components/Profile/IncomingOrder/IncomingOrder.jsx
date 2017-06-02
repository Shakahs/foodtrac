import React, { Component } from 'react';
import OrderList from './OrderList';

class IncomingOrder extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <div>Incoming Orders</div>
        <OrderList />
      </div>
    );
  }
}

export default IncomingOrder;
