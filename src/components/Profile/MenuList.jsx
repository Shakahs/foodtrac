import React from 'react';
import { Grid } from 'react-flexbox-grid';
import MenuItemEntry from './MenuItemEntry';

// change tempArr with arrays of menu items
const tempArr = [];

const MenuList = () => (
  <Grid fluid>
    {tempArr.lenght > 0 ?
      tempArr.map(item => <MenuItemEntry item={item} />)
    :
      <div className="noItems">No Menu</div>
    }
  </Grid>
);

export default MenuList;
