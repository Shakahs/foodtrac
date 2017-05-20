import React, {Component} from 'react';
import MenuItemsList from './MenuItemsList.jsx';
import AvailableCouponsList from './AvailableCouponsList.jsx';

class FoodOrder extends Component {

  render() {
    return (
    	<div>
	      <MenuItemsList />
	      <AvailableCouponsList />
    	</div>
    );
  };
}

export default FoodOrder;