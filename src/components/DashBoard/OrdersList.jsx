import React from 'react';
import { CardTitle } from 'material-ui';
import { Grid, Row } from 'react-flexbox-grid';
import propSchema from '../common/PropTypes';
import OrderEntry from './OrderEntry';
import DashEntry from './DashEntry';

const OrdersList = props => (
  <DashEntry>
    <CardTitle title="Your Orders" />
    <Grid fluid>
      <Row>
        {props.orders && props.orders.length > 0
          ? props.orders.map(order => <OrderEntry order={order} />)
          : <h2>You have not made any orders yet.</h2>}
      </Row>
    </Grid>
  </DashEntry>
);

OrdersList.propTypes = {
  orders: propSchema.orders,
};

export default OrdersList;
