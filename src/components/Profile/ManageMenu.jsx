import React, { Component } from 'react';
import { FlatButton, RaisedButton } from 'material-ui';
import { Grid } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
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

  componentDidMount() {
    this.setCurrentMenu();
  }

  setCurrentMenu() {
    const menuItems = this.props.menuItems.map(item =>
      [item, false],
    );
    this.setState({ menuItems });
  }

  addMenuItem() {
    const menuItems = [...this.state.menuItems];
    const newItem = [{
      brand_id: this.props.brandId,
    }, true];
    menuItems.push(newItem);
    this.setState({ menuItems });
  }

  removeMenuItem(index) {
    if (!this.state.menuItems[index][1]) {
      axios.delete(`/api/menuitems/${this.state.menuItems[index][0].id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
    const menuItems = [...this.state.menuItems];
    menuItems.splice(index, 1);
    this.setState({ menuItems });
  }

  changeItem(val, change, i) {
    const menuItems = [...this.state.menuItems];
    if (change === 'price' || change === 'calories') {
      menuItems[i][0][change] = Number(val);
    } else {
      menuItems[i][0][change] = val;
    }
    this.setState({ menuItems });
  }

  saveChanges() {
    this.state.menuItems.forEach((item) => {
      if (item[1]) {
        axios.post('/api/menuitems', item[0])
          .then(res => console.log(res))
          .catch(err => console.log(err));
      } else {
        axios.put(`/api/menuitems/${item[0].id}`, item[0])
          .then(res => console.log(res))
          .catch(err => console.log(err));
      }
    });
    this.props.getBrand(this.props.brandId);
  }

  render() {
    return (
      <div>
        <Grid fluid>
          {this.state.menuItems.map((menuItem, i) =>
            (<ManageMenuItem
              key={menuItem[0].id}
              index={i}
              new={menuItem[1]}
              removeMenuItem={this.removeMenuItem}
              changeItem={this.changeItem}
              menuItem={menuItem[0]}
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
          <Link to={`/brand/${this.props.brandId}/trucks`}>
            <RaisedButton
              label="Save Changes"
              onClick={this.saveChanges}
            />
          </Link> : null
        }
      </div>
    );
  }
}

ManageMenu.propTypes = {
  brandId: propSchema.brandId,
  menuItems: propSchema.menuItems,
  getBrand: propSchema.getBrand,
};

export default ManageMenu;
