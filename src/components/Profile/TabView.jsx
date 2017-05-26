import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import propSchema from '../common/PropTypes';
import MenuList from './MenuList';
import Trucks from './Trucks';
import EventsList from './EventsList';
import ReviewsList from './ReviewsList';
import CommentsList from './CommentsList';
import ManageBrand from './ManageBrand';

const TabView = props => (
  <Col xs={12} sm={12} md={9} lg={9}>
    <Paper zDepth={1} className="brandTabView">
      <Switch>
        <Route path="/brand/:brandId/menu" component={MenuList} />
        <Route
          path="/brand/:brandId/trucks"
          render={() => (<Trucks
            brandName={props.brandName}
            trucks={props.trucks}
            markers={props.markers}
          />)}
        />
        <Route path="/brand/:brandId/events" component={EventsList} />
        <Route path="/brand/:brandId/reviews" component={ReviewsList} />
        <Route path="/brand/:brandId/comments" component={CommentsList} />
        <Route
          path="/brand/:brandId/manage"
          render={() => (<ManageBrand
            brandId={props.brandId}
            trucks={props.trucks}
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
};

export default TabView;
