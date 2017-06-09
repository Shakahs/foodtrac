import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Paper } from 'material-ui';
import propSchema from '../common/PropTypes';
import './menu.scss';

const MenuItemEntry = props => (
  <Paper className="menuItem">
    <Row>
      <Col xs={5} sm={5} md={5} lg={5}>
        {props.item.name}
      </Col>
      <Col xs={5} sm={5} md={5} lg={5}>
        {props.item.description}
      </Col>
      <Col xs={2} sm={2} md={2} lg={2}>
      ${props.item.price}
      </Col>
    </Row>
  </Paper>
);

MenuItemEntry.propTypes = {
  item: propSchema.item,
};

export default MenuItemEntry;
