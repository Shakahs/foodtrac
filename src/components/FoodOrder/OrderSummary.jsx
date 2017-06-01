import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Paper, RaisedButton, Dialog, FlatButton } from 'material-ui';
import { Grid, Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import axios from 'axios';
import propSchema from '../common/PropTypes';
import CartEntry from './CartEntry';

class OrderSummary extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
    this.calculateTotal = this.calculateTotal.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
    this.orderComplete = this.orderComplete.bind(this);
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
      .then(() => this.orderComplete())
      .catch(e => console.log(e));
  }

  orderComplete() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const actions = [
      (<Link to="/">
        <FlatButton
          label="to Dashboard"
          primary
          onClick={this.orderComplete}
        />
      </Link>),
    ];
    return (
      <Col xs={4} sm={4} md={4} lg={4}>
        <Paper>
          <div>Order Summary</div>
          <br />
          <Grid fluid>
            {this.props.currentOrder.map((currentItem, i) =>
              (<CartEntry
                key={i} // eslint-disable-line react/no-array-index-key
                index={i}
                currentItem={currentItem}
                removeFromOrder={this.props.removeFromOrder}
              />),
            )}
          </Grid>
          <br />
          <div>
            TOTAL: ${this.calculateTotal()}
          </div>
          {this.props.currentOrder.length > 0 ?
            <RaisedButton
              label="Submit Order"
              onClick={this.submitOrder}
            /> : null
          }
          <Dialog
            title="Your order is complete!"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.orderComplete}
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
  removeFromOrder: propSchema.removeComment,
};

const mapStateToProps = ({ user }) => {
  const userId = user.id;
  return { userId };
};

export default connect(mapStateToProps, null)(OrderSummary);
