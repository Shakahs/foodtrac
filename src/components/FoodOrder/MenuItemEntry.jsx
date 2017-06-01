import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { FlatButton } from 'material-ui';
import propSchema from '../common/PropTypes';

const MenuItemEntry = props => (
  <Row>
    <Col xs={3} sm={3} md={3} lg={3}>
      <div>{props.menuItem.name}</div>
    </Col>
    <Col xs={4} sm={4} md={4} lg={4}>
      <div>{props.menuItem.description}</div>
    </Col>
    <Col xs={1} sm={1} md={1} lg={1}>
      <div>${props.menuItem.price}</div>
    </Col>
    <Col xs={1} sm={1} md={1} lg={1}>
      <div>{props.menuItem.calories}</div>
    </Col>
    <Col xs={2} sm={2} md={2} lg={2}>
      <FlatButton
        label="Add to Cart"
      />
    </Col>
  </Row>
);

MenuItemEntry.propTypes = {
  menuItem: propSchema.menuItem,
};

export default MenuItemEntry;
