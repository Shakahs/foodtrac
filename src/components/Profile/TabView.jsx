import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import propSchema from '../common/PropTypes';
import MenuList from './MenuList';
import Trucks from './Trucks';
import EventsMain from './Events';
import ReviewMain from './Reviews';
import CommentsView from './CommentsView';
import ManageBrand from './ManageBrand';
import IncomingOrder from './IncomingOrder/IncomingOrder';
import './TabView.scss';

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
        <Route path="/brand/:brandId/events" render={routeProps => <EventsMain {...routeProps} {...props} />} />
        <Route path="/brand/:brandId/reviews" render={routeProps => <ReviewMain {...routeProps} {...props} />} />
        <Route
          path="/brand/:brandId/comments"
          render={() => (<CommentsView
            comments={props.comments}
            submitComment={props.submitComment}
            userId={props.userId}
            removeComment={props.removeComment}
            editComment={props.editComment}
          />)}
        />
        <Route
          path="/brand/:brandId/manage"
          render={() => (<ManageBrand
            brandId={props.brandId}
            trucks={props.trucks}
            getBrand={props.getBrand}
            menuItems={props.menuItems}
          />)}
        />
        <Route path="/brand/:brandId/orders/:truckId" component={IncomingOrder} />
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
  comments: propSchema.comments,
  submitComment: propSchema.submitComment,
  userId: propSchema.userId,
  removeComment: propSchema.removeComment,
  editComment: propSchema.editComment,
};

export default TabView;
