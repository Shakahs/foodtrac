import React from 'react';
import { Card, CardTitle } from 'material-ui';
import { Grid, Row } from 'react-flexbox-grid';
import propSchema from '../common/PropTypes';
import OrderEntry from './OrderEntry';

const OrdersList = props => (
  <Card>
    <CardTitle title="Your Orders" />
    <Grid fluid>
      <Row>
        {props.orders.map(order =>
          <OrderEntry order={order} />,
        )}
      </Row>
    </Grid>
  </Card>
);

OrdersList.propTypes = {
  orders: propSchema.orders,
};

export default OrdersList;
