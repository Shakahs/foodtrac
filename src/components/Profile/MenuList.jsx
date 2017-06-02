import React, { Component } from 'react';
import { Grid } from 'react-flexbox-grid';
import propSchema from '../common/PropTypes';
import MenuItemEntry from './MenuItemEntry';

class MenuList extends Component {
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

  componentDidMount() {
    this.sortMenuItems();
  }

  sortMenuItems() {
    const appetizers = [];
    const entrees = [];
    const desserts = [];
    const sides = [];
    const drinks = [];
    this.props.menuItems.forEach((item) => {
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
      <Grid fluid>
        {this.state.appetizers.length > 0 ?
          (<div>
            <h2>Appetizers</h2>
            {this.state.appetizers.map(item =>
              <MenuItemEntry key={item.id} item={item} />,
            )}
          </div>
          ) : null
        }
        {this.state.entrees.length > 0 ?
          (<div>
            <h2>Entrees</h2>
            {this.state.entrees.map(item =>
              <MenuItemEntry key={item.id} item={item} />,
            )}
          </div>
          ) : null
        }
        {this.state.desserts.length > 0 ?
          (<div>
            <h2>Desserts</h2>
            {this.state.desserts.map(item =>
              <MenuItemEntry key={item.id} item={item} />,
            )}
          </div>
          ) : null
        }
        {this.state.sides.length > 0 ?
          (<div>
            <h2>Sides</h2>
            {this.state.sides.map(item =>
              <MenuItemEntry key={item.id} item={item} />,
            )}
          </div>
          ) : null
        }
        {this.state.drinks.length > 0 ?
          (<div>
            <h2>Drinks</h2>
            {this.state.drinks.map(item =>
              <MenuItemEntry key={item.id} item={item} />,
            )}
          </div>
          ) : null
        }
      </Grid>
    );
  }
}

MenuList.propTypes = {
  menuItems: propSchema.menuItems,
};

export default MenuList;
