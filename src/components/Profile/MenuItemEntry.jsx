import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import propSchema from '../common/PropTypes';

const MenuItemEntry = props => (
  <Row>
    <Col xs={3} sm={3} md={3} lg={3}>
      {props.item.name}
    </Col>
    <Col xs={4} sm={4} md={4} lg={4}>
      {props.item.description}
    </Col>
    <Col xs={2} sm={2} md={2} lg={2}>
      ${props.item.price}
    </Col>
    {props.item.calories !== 0 ?
      <Col xs={3} sm={3} md={3} lg={3}>
        Calories: {props.item.calories}
      </Col> : null
    }
  </Row>
);

MenuItemEntry.propTypes = {
  item: propSchema.item,
};

export default MenuItemEntry;
