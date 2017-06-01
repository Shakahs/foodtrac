import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  }

  componentDidMount() {
    this.setTruckInfo();
  }

  setTruckInfo() {
    this.props.trucks.forEach((truck) => {
      if (truck.id === Number(this.props.match.params.truckId)) {
        this.setState({ truck });
      }
    });
  }

  addToOrder(item) {
    const currentOrder = [...this.state.currentOrder];
    currentOrder.push(item);
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
          />
        </Row>
      </Grid>
    );
  }
}

FoodOrder.propTypes = {
  match: propSchema.match,
  trucks: propSchema.trucks,
};

const mapStateToProps = ({ mapReducer }) => {
  const trucks = mapReducer.trucks;
  return { trucks };
};

export default connect(mapStateToProps, null)(FoodOrder);
