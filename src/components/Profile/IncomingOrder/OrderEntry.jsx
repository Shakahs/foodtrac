import React, { Component } from 'react';
import { TableRow, TableRowColumn, Checkbox } from 'material-ui';
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

  organizeMenuItems() {
    const items = {};
    const sortedItems = [];
    this.props.order.orderitems.forEach((item) => {
      items[item.menu_item.name] = (items[item.menu_item.name] || 0) + 1;
    });
    // eslint-disable-next-line guard-for-in
    for (const k in items) { // eslint-disable-line no-restricted-syntax
      sortedItems.push(`${items[k]} x ${k}`);
    }
    return sortedItems;
  }

  render() {
    let discountType = '';
    if (this.props.order.user_coupon) {
      discountType = this.props.order.user_coupon.coupons[0].flat_discount > 0
        ? `$${this.props.order.user_coupon.coupons[0].flat_discount} off`
        : `${this.props.order.user_coupon.coupons[0].percent_discount}% off`;
    }
    return (
      <TableRow>
        <TableRowColumn>{this.props.order.name}</TableRowColumn>
        <TableRowColumn>{this.organizeMenuItems().map(item =>
          (<div>
            <span>{item}</span>
            <br />
          </div>),
        )}</TableRowColumn>
        <TableRowColumn>{discountType}</TableRowColumn>
        <TableRowColumn>${this.calculateTotal()}</TableRowColumn>
        <TableRowColumn>
          <Checkbox
            onCheck={this.orderReady}
          />
        </TableRowColumn>
      </TableRow>
    );
  }
}

OrderEntry.propTypes = {
  order: propSchema.order,
  getOrders: propSchema.getOrders,
  truckId: propSchema.truckId,
};


export default OrderEntry;
