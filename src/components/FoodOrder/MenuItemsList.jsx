import React from 'react';
import { Paper } from 'material-ui';
import { Col } from 'react-flexbox-grid';
import propSchema from '../common/PropTypes';
import MenuItemEntry from './MenuItemEntry';

const MenuItemsList = props => (
  <Col xs={8} sm={8} md={8} lg={8}>
    <Paper>
      <div>Order from {props.truck.brands.name}&#39;s food truck</div>
      <div>located at: {props.truck.locations.address}</div>
      <br />
      {props.truck.brands.menu_items.map(menuItem =>
        <MenuItemEntry key={menuItem.id} menuItem={menuItem} />,
      )}
    </Paper>
  </Col>
);

MenuItemsList.propTypes = {
  truck: propSchema.truck,
};

export default MenuItemsList;
