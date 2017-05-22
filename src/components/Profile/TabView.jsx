import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import MenuList from './MenuList';
import Trucks from './Trucks';
import EventsList from './EventsList';
import ReviewsList from './ReviewsList';
import CommentsList from './CommentsList';

const TabView = () => (
  <Col xs={12} sm={12} md={9} lg={9}>
    <Paper zDepth={1}>
      <Switch>
        <Route path="/profile/menu" component={MenuList} />
        <Route path="/profile/trucks" component={Trucks} />
        <Route path="/profile/events" component={EventsList} />
        <Route path="/profile/reviews" component={ReviewsList} />
        <Route path="/profile/comments" component={CommentsList} />
      </Switch>
    </Paper>
  </Col>
);

export default TabView;
