import React, { Component } from 'react';
import { Paper, FlatButton } from 'material-ui';
import axios from 'axios';
import propSchema from '../../common/PropTypes';

class OrderEntry extends Component {
  constructor() {
    super();
    this.state = {};
    this.orderReady = this.orderReady.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
  }

  orderReady() {
    axios.put(`/api/orders/${this.props.order.id}`, { ready: true })
      .then(() => this.props.getOrders(this.props.truckId))
      .catch(e => console.log(e));
  }

  calculateTotal() {
    let total = 0;
    this.props.order.orderitems.forEach((item) => {
      total += item.menu_item.price;
    });
    if (this.props.order.user_coupon) {
      if (this.props.order.user_coupon.coupons[0].flat_discount > 0) {
        total -= (this.props.order.user_coupon.coupons[0].flat_discount);
      } else {
        total -= (total * (this.props.order.user_coupon.coupons[0].percent_discount / 100));
      }
    }
    return total / 100;
  }

  render() {
    let discountType = '';
    if (this.props.order.user_coupon) {
      discountType = this.props.order.user_coupon.coupons[0].flat_discount > 0
        ? `$${this.props.order.user_coupon.coupons[0].flat_discount} off`
        : `${this.props.order.user_coupon.coupons[0].percent_discount}% off`;
    }
    return (
      <Paper>
        Order placed by: {this.props.order.name}
        <br />
        <br />
        {this.props.order.orderitems.map(({ menu_item }) =>
          <div>{menu_item.name}</div>,
        )}
        <br />
        {this.props.order.user_coupon
          ? <div>{this.props.order.name} used a {discountType} Coupon.</div>
          : null
        }
        Total due: ${this.calculateTotal()}
        <FlatButton
          label="Order ready"
          onClick={this.orderReady}
        />
      </Paper>
    );
  }
}

OrderEntry.propTypes = {
  order: propSchema.order,
  getOrders: propSchema.getOrders,
  truckId: propSchema.truckId,
};


export default OrderEntry;
