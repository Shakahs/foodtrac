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
    };
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

  render() {
    return (
      <Grid fluid>
        <Row>
          <MenuItemsList truck={this.state.truck} />
          <OrderSummary />
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
