import React from 'react';
import { FlatButton } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid';
import propSchema from '../common/PropTypes';

const CartEntry = props => (
  <Row>
    <Col xs={6} sm={6} md={6} lg={6}>
      {props.currentItem.quantity} X {props.currentItem.name}
    </Col>
    <Col xs={4} sm={4} md={4} lg={4}>
      ${(props.currentItem.price / 100) * props.currentItem.quantity}
    </Col>
    <Col xs={2} sm={2} md={2} lg={2}>
      <FlatButton
        label="X"
        onClick={() => props.removeFromOrder(props.index)}
      />
    </Col>
  </Row>
);

CartEntry.propTypes = {
  currentItem: propSchema.currentItem,
  removeFromOrder: propSchema.removeFromOrder,
  index: propSchema.index,
};

export default CartEntry;
