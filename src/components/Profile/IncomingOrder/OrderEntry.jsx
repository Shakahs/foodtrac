import React, { Component } from 'react';
import { Paper, FlatButton } from 'material-ui';
import axios from 'axios';
import propSchema from '../../common/PropTypes';

class OrderEntry extends Component {
  constructor() {
    super();
    this.state = {};
    this.orderReady = this.orderReady.bind(this);
  }

  orderReady() {
    axios.put(`/api/orders/${this.props.order.id}`, { ready: true })
      .then(() => this.props.getOrders(this.props.truckId))
      .catch(e => console.log(e));
  }

  render() {
    return (
      <Paper>
        Order placed at: {this.props.order.date}
        {this.props.order.orderitems.map(({ menu_item }) =>
          <div>{menu_item.name}</div>,
        )}
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
