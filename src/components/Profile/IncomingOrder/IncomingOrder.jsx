import React, { Component } from 'react';
import axios from 'axios';
import { Table, TableHeader, TableRow, TableHeaderColumn, TableBody } from 'material-ui';
import propSchema from '../../common/PropTypes';
import OrderEntry from './OrderEntry';

class IncomingOrder extends Component {
  constructor() {
    super();
    this.state = {
      orders: [],
      update: null,
    };
    this.getOrders = this.getOrders.bind(this);
  }

  componentDidMount() {
    this.getOrders(this.props.match.params.truckId);
    this.state.update = setInterval(() => {
      this.getOrders(this.props.match.params.truckId);
    }, 5000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.truckId !== this.props.match.params.truckId) {
      this.getOrders(nextProps.match.params.truckId);
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.update);
  }

  getOrders(truckId) {
    axios.get(`/api/foodtrucks/${truckId}/orders`)
      .then(({ data }) => this.setState({ orders: data }))
      .catch(e => console.log(e));
  }

  render() {
    return (
      <Table onRowSelection={index => this.orderReady(index)}>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Order for:</TableHeaderColumn>
            <TableHeaderColumn>Item ordered:</TableHeaderColumn>
            <TableHeaderColumn>Coupon:</TableHeaderColumn>
            <TableHeaderColumn>Total due:</TableHeaderColumn>
            <TableHeaderColumn>Ready:</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.state.orders.map(order => // eslint-disable-line no-confusing-arrow
            order.ready === 0
            ? <OrderEntry
              key={order.id}
              order={order}
              truckId={this.props.match.params.truckId}
              getOrders={this.getOrders}
            />
            : null,
          )}
        </TableBody>
      </Table>
    );
  }
}

IncomingOrder.propTypes = {
  match: propSchema.match,
};

export default IncomingOrder;
