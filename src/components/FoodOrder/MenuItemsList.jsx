import React from 'react';
import { Paper } from 'material-ui';
import { Col } from 'react-flexbox-grid';
import MenuItemEntry from './MenuItemEntry';

const MenuItemsList = () => (
  <Col xs={8} sm={8} md={8} lg={8}>
    <Paper>
      <div>Pick your Order</div>
      <MenuItemEntry />
    </Paper>
  </Col>
);

export default MenuItemsList;
