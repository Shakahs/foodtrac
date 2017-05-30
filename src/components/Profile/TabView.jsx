import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import propSchema from '../common/PropTypes';
import MenuList from './MenuList';
import Trucks from './Trucks';
import EventsList from './EventsList';
import ReviewMain from './Reviews';
import CommentsList from './CommentsList';
import ManageBrand from './ManageBrand';

const TabView = props => (
  <Col xs={12} sm={12} md={9} lg={9}>
    <Paper zDepth={1} className="brandTabView">
      <Switch>
        <Route
          path="/brand/:brandId/menu"
          render={() => (
            <MenuList menuItems={props.menuItems} />
          )}
        />
        <Route
          path="/brand/:brandId/trucks"
          render={({ match }) => (<Trucks
            brandName={props.brandName}
            trucks={props.trucks}
            markers={props.markers}
            path={match.path}
          />)}
        />
        <Route path="/brand/:brandId/events" component={EventsList} />
        <Route path="/brand/:brandId/reviews" component={ReviewMain} />
        <Route path="/brand/:brandId/comments" component={CommentsList} />
        <Route
          path="/brand/:brandId/manage"
          render={() => (<ManageBrand
            brandId={props.brandId}
            trucks={props.trucks}
            getBrand={props.getBrand}
            menuItems={props.menuItems}
          />)}
        />
      </Switch>
    </Paper>
  </Col>
);

TabView.propTypes = {
  brandId: propSchema.brandId,
  brandName: propSchema.brandName,
  trucks: propSchema.trucks,
  markers: propSchema.markers,
  getBrand: propSchema.getBrand,
  menuItems: propSchema.menuItems,
};

export default TabView;
