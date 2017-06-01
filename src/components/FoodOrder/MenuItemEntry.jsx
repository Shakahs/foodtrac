import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { FlatButton, TextField } from 'material-ui';
import propSchema from '../common/PropTypes';
import './MenuItemEntry.scss';

class MenuItemEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.menuItem.name,
      price: this.props.menuItem.price,
      quantity: 1,
    };
  }

  setQuantity(val) {
    this.setState({ quantity: Number(val) });
  }

  render() {
    return (
      <Row>
        <Col xs={3} sm={3} md={3} lg={3}>
          <div>{this.props.menuItem.name}</div>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4}>
          <div>{this.props.menuItem.description}</div>
        </Col>
        <Col xs={1} sm={1} md={1} lg={1}>
          <div>${this.props.menuItem.price}</div>
        </Col>
        <Col xs={1} sm={1} md={1} lg={1}>
          <div>{this.props.menuItem.calories}</div>
        </Col>
        <Col xs={1} sm={1} md={1} lg={1}>
          <TextField
            className="quantityOrder"
            floatingLabelText="Quantity"
            type="number"
            onChange={(e, val) => this.setQuantity(val)}
          />
        </Col>
        <Col xs={2} sm={2} md={2} lg={2}>
          <FlatButton
            label="Add to Cart"
            onClick={() => this.props.addToOrder(this.state)}
          />
        </Col>
      </Row>
    );
  }
}

MenuItemEntry.propTypes = {
  menuItem: propSchema.menuItem,
  addToOrder: propSchema.addToOrder,
};

export default MenuItemEntry;
