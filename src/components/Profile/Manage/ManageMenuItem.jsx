import React from 'react';
import { TextField, SelectField, MenuItem, FlatButton, Paper, FontIcon } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid';
import 'font-awesome/css/font-awesome.min.css';
import propSchema from '../../common/PropTypes';

const ManageMenuItem = props => (
  <Paper className="menuItem">
    <Row>
      <Col xs={4} sm={4} md={3} lg={3} className="menuField">
        <TextField
          floatingLabelText="Name"
          hintText="Name"
          onChange={(e, val) => props.changeItem(val, 'name', props.index)}
          value={props.menuItem.name}
        />
      </Col>
      <Col xs={6} sm={6} md={4} lg={4} className="menuField">
        <TextField
          floatingLabelText="Description"
          hintText="Description"
          onChange={(e, val) => props.changeItem(val, 'description', props.index)}
          value={props.menuItem.description}
        />
      </Col>
      <Col xs={2} sm={2} md={1} lg={1} className="menuField">
        <TextField
          floatingLabelText="Price"
          hintText="Price"
          type="number"
          onChange={(e, val) => props.changeItem(val, 'price', props.index)}
          value={props.menuItem.price}
        />
      </Col>
      <Col xs={3} sm={3} md={1} lg={1} className="menuField">
        <TextField
          floatingLabelText="Calories"
          hintText="Calories"
          type="number"
          onChange={(e, val) => props.changeItem(val, 'calories', props.index)}
          value={props.menuItem.calories}
        />
      </Col>
      <Col xs={6} sm={6} md={2} lg={2} className="menuField">
        <SelectField
          floatingLabelText="Type"
          onChange={(e, i, val) => props.changeItem(val, 'food_type_id', props.index)}
          value={props.menuItem.food_type_id}
        >
          <MenuItem value={1} primaryText="Appetizers" />
          <MenuItem value={2} primaryText="Entrees" />
          <MenuItem value={3} primaryText="Sides" />
          <MenuItem value={4} primaryText="Desserts" />
          <MenuItem value={5} primaryText="Drinks" />
        </SelectField>
      </Col>
      <Col xs={3} sm={3} md={1} lg={1} className="menuField">
        <FlatButton
          className="removeButton"
          label={<FontIcon className="fa fa-times" />}
          onClick={() => props.removeMenuItem(props.index)}
        />
      </Col>
    </Row>
  </Paper>
);

ManageMenuItem.propTypes = {
  changeItem: propSchema.changeItem,
  removeMenuItem: propSchema.removeMenuItem,
  menuItem: propSchema.menuItem,
  index: propSchema.index,
};

export default ManageMenuItem;
