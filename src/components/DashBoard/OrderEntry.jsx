import React, { Component } from 'react';
import { Paper } from 'material-ui';
import { Col } from 'react-flexbox-grid';
import propSchema from '../common/PropTypes';

class OrderEntry extends Component {
  constructor() {
    super();
    this.state = {};
  }

  calculateTotal() {
    let total = 0;
    this.props.order.menuitems.forEach((item) => {
      total += item.price;
    });
    return total / 100;
  }

  render() {
    return (
      <Col xs={6} sm={6} md={6} lg={6}>
        <Paper>
          <div>From {this.props.order.menuitems[0].brands.name} for ${this.calculateTotal()}</div>
        </Paper>
      </Col>
    );
  }
}

OrderEntry.propTypes = {
  order: propSchema.order,
};

export default OrderEntry;
