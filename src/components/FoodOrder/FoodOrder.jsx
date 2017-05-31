import React, { Component } from 'react';
import { Grid, Row } from 'react-flexbox-grid';
import MenuItemsList from './MenuItemsList';
import OrderSummary from './OrderSummary';

class FoodOrder extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <MenuItemsList />
          <OrderSummary />
        </Row>
      </Grid>
    );
  }
}

export default FoodOrder;
