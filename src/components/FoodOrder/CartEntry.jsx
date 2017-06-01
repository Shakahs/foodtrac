import React from 'react';
import propSchema from '../common/PropTypes';

const CartEntry = props => (
  <div>
    {props.currentItem.quantity} X {props.currentItem.name} ${props.currentItem.price * props.currentItem.quantity}
  </div>
);

CartEntry.propTypes = {
  currentItem: propSchema.currentItem,
};

export default CartEntry;
