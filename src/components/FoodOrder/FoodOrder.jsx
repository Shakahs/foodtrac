import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Row } from 'react-flexbox-grid';
import propSchema from '../common/PropTypes';
import MenuItemsList from './MenuItemsList';
import OrderSummary from './OrderSummary';

class FoodOrder extends Component {
  constructor() {
    super();
    this.state = {
      truck: {
        brands: {
          menu_items: [],
        },
        locations: {},
      },
      currentOrder: [],
    };
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/foodtrucks/${this.props.match.params.truckId}`)
      .then(({ data }) => this.setState({ truck: data }));
  }

  addToOrder(item) {
    const currentOrder = [...this.state.currentOrder];
    currentOrder.push(item);
    this.setState({ currentOrder });
  }

  removeFromOrder(i) {
    const currentOrder = [...this.state.currentOrder];
    currentOrder.splice(i, 1);
    this.setState({ currentOrder });
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <MenuItemsList
            truck={this.state.truck}
            addToOrder={this.addToOrder}
          />
          <OrderSummary
            truck={this.state.truck}
            currentOrder={this.state.currentOrder}
            removeFromOrder={this.removeFromOrder}
          />
        </Row>
      </Grid>
    );
  }
}

FoodOrder.propTypes = {
  match: propSchema.match,
};


export default FoodOrder;
