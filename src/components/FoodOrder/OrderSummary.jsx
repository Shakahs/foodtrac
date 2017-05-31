import React from 'react';
import { Paper, RaisedButton } from 'material-ui';
import { Col } from 'react-flexbox-grid';

const OrderSummary = () => (
  <Col xs={4} sm={4} md={4} lg={4}>
    <Paper>
      <div>Order Summary</div>
      <RaisedButton
        label="Submit Order"
      />
    </Paper>
  </Col>
);

export default OrderSummary;
