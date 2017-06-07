import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import propSchema from '../common/PropTypes';
import MenuList from './MenuList';
import Trucks from './Trucks';
import EventsAttendingList from './EventsAttending';
import ReviewMain from './Reviews';
import CommentsView from '../common/Comments';
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
        <Route path="/brand/:brandId/events" render={routeProps => <EventsAttendingList {...routeProps} {...props} />} />
        <Route path="/brand/:brandId/reviews" render={routeProps => <ReviewMain {...routeProps} {...props} />} />
        <Route
          path="/brand/:brandId/comments"
          render={() => (<CommentsView
            comments={props.comments}
            submitComment={props.submitComment}
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
            defaultCouponId={props.defaultCouponId}
            rewardTrigger={props.rewardTrigger}
            coupon={props.coupon}
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
  removeComment: propSchema.removeComment,
  editComment: propSchema.editComment,
  defaultCouponId: propSchema.defaultCouponId,
  rewardTrigger: propSchema.rewardTrigger,
  coupon: propSchema.coupon,
};

export default TabView;
