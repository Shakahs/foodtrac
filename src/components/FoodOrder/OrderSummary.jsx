import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Paper, RaisedButton } from 'material-ui';
import { Col } from 'react-flexbox-grid';
import axios from 'axios';
import propSchema from '../common/PropTypes';
import CartEntry from './CartEntry';

class OrderSummary extends Component {
  constructor() {
    super();
    this.state = {};
    this.calculateTotal = this.calculateTotal.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
  }

  calculateTotal() {
    let total = 0;
    this.props.currentOrder.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }

  submitOrder() {
    const orderItems = this.props.currentOrder.reduce((acc, item) => {
      for (let i = 0; i < item.quantity; i++) {
        acc.push({ menu_item_id: item.menu_item_id });
      }
      return acc;
    }, []);
    const order = {
      user_id: this.props.userId,
      truck_id: this.props.truck.id,
      date: new Date().toISOString(),
      ready: false,
      orderitems: orderItems,
    };
    axios.post(`/api/foodtrucks/${this.props.truck.id}/orders`, order)
      .then(res => console.log(res))
      .catch(e => console.log(e));
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
            onClick={this.submitOrder}
          />
        </Paper>
      </Col>
    );
  }
}

OrderSummary.propTypes = {
  currentOrder: propSchema.currentOrder,
  truck: propSchema.truck,
  userId: propSchema.userId,
};

const mapStateToProps = ({ user }) => {
  const userId = user.id;
  return { userId };
};

export default connect(mapStateToProps, null)(OrderSummary);
