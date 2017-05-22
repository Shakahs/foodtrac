import React from 'react';
import { Row, Col } from 'react-flexbox-grid';

const MenuItemEntry = () => (
  <Row>
    <Col xs={3} sm={3} md={3} lg={3}>
      Food item name
    </Col>
    <Col xs={3} sm={3} md={3} lg={3}>
      Food item description
    </Col>
    <Col xs={3} sm={3} md={3} lg={3}>
      price: $00.00
    </Col>
    <Col xs={3} sm={3} md={3} lg={3}>
      Calories: 000
    </Col>
  </Row>
);

export default MenuItemEntry;
