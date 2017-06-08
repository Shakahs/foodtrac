import React, { Component } from 'react';
import { Paper } from 'material-ui';
import { Col } from 'react-flexbox-grid';
import propSchema from '../common/PropTypes';
import MenuItemEntry from './MenuItemEntry';

class MenuItemsList extends Component {
  constructor() {
    super();
    this.state = {
      appetizers: [],
      entrees: [],
      desserts: [],
      sides: [],
      drinks: [],
    };
  }

  componentWillReceiveProps({ truck }) {
    this.sortMenuItems(truck.brands.menu_items);
  }

  sortMenuItems(menuItems) {
    const appetizers = [];
    const entrees = [];
    const desserts = [];
    const sides = [];
    const drinks = [];
    menuItems.forEach((item) => {
      if (item.food_type_id === 1) {
        appetizers.push(item);
      }
      if (item.food_type_id === 2) {
        entrees.push(item);
      }
      if (item.food_type_id === 3) {
        sides.push(item);
      }
      if (item.food_type_id === 4) {
        desserts.push(item);
      }
      if (item.food_type_id === 5) {
        drinks.push(item);
      }
    });
    this.setState({
      appetizers,
      entrees,
      desserts,
      sides,
      drinks,
    });
  }

  render() {
    return (
      <Col xs={8} sm={8} md={8} lg={8}>
        <Paper>
          <div>Order from {this.props.truck.brands.name}&#39;s food truck</div>
          <br />
          {this.state.appetizers.length > 0 ?
            (<div>
              <h2>Appetizers</h2>
              {this.state.appetizers.map(menuItem =>
                (<MenuItemEntry
                  key={menuItem.id}
                  menuItem={menuItem}
                  addToOrder={this.props.addToOrder}
                />),
              )}
            </div>) : null
          }
          {this.state.entrees.length > 0 ?
            (<div>
              <h2>Entrees</h2>
              {this.state.entrees.map(menuItem =>
                (<MenuItemEntry
                  key={menuItem.id}
                  menuItem={menuItem}
                  addToOrder={this.props.addToOrder}
                />),
              )}
            </div>) : null
          }
          {this.state.desserts.length > 0 ?
            (<div>
              <h2>Desserts</h2>
              {this.state.desserts.map(menuItem =>
                (<MenuItemEntry
                  key={menuItem.id}
                  menuItem={menuItem}
                  addToOrder={this.props.addToOrder}
                />),
              )}
            </div>) : null
          }
          {this.state.sides.length > 0 ?
            (<div>
              <h2>Sides</h2>
              {this.state.sides.map(menuItem =>
                (<MenuItemEntry
                  key={menuItem.id}
                  menuItem={menuItem}
                  addToOrder={this.props.addToOrder}
                />),
              )}
            </div>) : null
          }
          {this.state.drinks.length > 0 ?
            (<div>
              <h2>Drinks</h2>
              {this.state.drinks.map(menuItem =>
                (<MenuItemEntry
                  key={menuItem.id}
                  menuItem={menuItem}
                  addToOrder={this.props.addToOrder}
                />),
              )}
            </div>) : null
          }
        </Paper>
      </Col>
    );
  }
}

MenuItemsList.propTypes = {
  truck: propSchema.truck,
  addToOrder: propSchema.addToOrder,
};

export default MenuItemsList;
