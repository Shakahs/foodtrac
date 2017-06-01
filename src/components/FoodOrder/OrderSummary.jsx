import React, { Component } from 'react';
import { Paper, RaisedButton } from 'material-ui';
import { Col } from 'react-flexbox-grid';
import propSchema from '../common/PropTypes';
import CartEntry from './CartEntry';

class OrderSummary extends Component {
  constructor() {
    super();
    this.state = {};
    this.calculateTotal = this.calculateTotal.bind(this);
  }

  calculateTotal() {
    let total = 0;
    this.props.currentOrder.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }

  render() {
    return (
      <Col xs={4} sm={4} md={4} lg={4}>
        <Paper>
          <div>Order Summary</div>
          <br />
          {this.props.currentOrder.map(currentItem =>
            <CartEntry currentItem={currentItem} />,
          )}
          <br />
          <div>
            TOTAL: ${this.calculateTotal()}
          </div>
          <RaisedButton
            label="Submit Order"
          />
        </Paper>
      </Col>
    );
  }
}

OrderSummary.propTypes = {
  currentOrder: propSchema.currentOrder,
};

export default OrderSummary;
