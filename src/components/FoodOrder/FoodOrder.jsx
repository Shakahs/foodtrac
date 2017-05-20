import React, { Component } from 'react';
import MenuItemsList from './MenuItemsList';
import AvailableCouponsList from './AvailableCouponsList';

class FoodOrder extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <MenuItemsList />
        <AvailableCouponsList />
      </div>
    );
  }
}

export default FoodOrder;
