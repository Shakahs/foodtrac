import React from 'react';
import { Paper } from 'material-ui';
import { Col } from 'react-flexbox-grid';
import MenuItemEntry from './MenuItemEntry';

const temp = [1, 2, 3, 4, 5, 6];

const MenuItemsList = () => (
  <Col xs={8} sm={8} md={8} lg={8}>
    <Paper>
      <div>Pick your Order</div>
      {temp.map(menuItem =>
        <MenuItemEntry menuItem={menuItem} />,
      )}
    </Paper>
  </Col>
);

export default MenuItemsList;
