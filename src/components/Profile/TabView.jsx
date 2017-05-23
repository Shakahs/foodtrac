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
        <Route path="/brand/:brandId/menu" component={MenuList} />
        <Route path="/brand/:brandId/trucks" component={Trucks} />
        <Route path="/brand/:brandId/events" component={EventsList} />
        <Route path="/brand/:brandId/reviews" component={ReviewsList} />
        <Route path="/brand/:brandId/comments" component={CommentsList} />
      </Switch>
    </Paper>
  </Col>
);

export default TabView;
