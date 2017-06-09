import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { FlatButton, TextField, CardText, FontIcon } from 'material-ui';
import 'font-awesome/css/font-awesome.min.css';
import propSchema from '../common/PropTypes';
import './foodOrder.scss';

class MenuItemEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.menuItem.name,
      price: this.props.menuItem.price,
      quantity: 3,
      menu_item_id: this.props.menuItem.id,
    };
  }

  setQuantity(val) {
    this.setState({ quantity: Number(val) });
  }

  render() {
    return (
      <Row className="menuEntryRow">
        <Col xs={3} sm={3} md={3} lg={3}>
          <CardText>{this.props.menuItem.name}</CardText>
        </Col>
        <Col xs={3} sm={3} md={3} lg={3}>
          <CardText>${this.props.menuItem.price / 100}</CardText>
        </Col>
        <Col xs={3} sm={3} md={3} lg={3}>
          <TextField
            className="quantityOrder"
            floatingLabelText="Quantity"
            type="number"
            onChange={(e, val) => this.setQuantity(val)}
          />
        </Col>
        <Col xs={3} sm={3} md={3} lg={3}>
          <FlatButton
            label={<FontIcon className="fa fa-cart-plus" />}
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
