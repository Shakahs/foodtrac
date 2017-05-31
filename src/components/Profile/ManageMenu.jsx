import React, { Component } from 'react';
import { FlatButton, RaisedButton } from 'material-ui';
import { Grid } from 'react-flexbox-grid';
import axios from 'axios';
import propSchema from '../common/PropTypes';
import ManageMenuItem from './ManageMenuItem';

class ManageMenu extends Component {
  constructor() {
    super();
    this.state = {
      menuItems: [],
    };
    this.addMenuItem = this.addMenuItem.bind(this);
    this.removeMenuItem = this.removeMenuItem.bind(this);
    this.changeItem = this.changeItem.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  addMenuItem() {
    const menuItems = [...this.state.menuItems];
    const newItem = {
      brand_id: this.props.brandId,
    };
    menuItems.push(newItem);
    this.setState({ menuItems });
  }

  removeMenuItem(index) {
    const menuItems = [...this.state.menuItems];
    menuItems.splice(index, 1);
    this.setState({ menuItems });
  }

  changeItem(val, change, i) {
    const menuItems = [...this.state.menuItems];
    if (change === 'price' || change === 'calories') {
      menuItems[i][change] = Number(val);
    } else {
      menuItems[i][change] = val;
    }
    this.setState({ menuItems });
  }

  saveChanges() {
    // axios call to update menu items
    this.state.menuItems.forEach((item) => {
      axios.post('/api/menuitems', item)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    });
  }

  render() {
    return (
      <div>
        <Grid fluid>
          {this.state.menuItems.map((menuItem, i) =>
            (<ManageMenuItem
              index={i}
              removeMenuItem={this.removeMenuItem}
              changeItem={this.changeItem}
              menuItem={menuItem}
            />),
          )}
        </Grid>
        <FlatButton
          label="Add food item"
          onClick={this.addMenuItem}
        />
        <br />
        <br />
        {this.state.menuItems.length > 0 ?
          <RaisedButton
            label="Save Changes"
            onClick={this.saveChanges}
          /> : null
        }
      </div>
    );
  }
}

ManageMenu.propTypes = {
  brandId: propSchema.brandId,
};

export default ManageMenu;
