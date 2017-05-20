import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MenuList from './MenuList';
import Trucks from './Trucks';
import EventsList from './EventsList';
import ReviewsList from './ReviewsList';
import CommentsList from './CommentsList';

const TabView = () => (
  <Switch>
    <Route path="/profile/menu" component={MenuList} />
    <Route path="/profile/trucks" component={Trucks} />
    <Route path="/profile/events" component={EventsList} />
    <Route path="/profile/reviews" component={ReviewsList} />
    <Route path="/profile/comments" component={CommentsList} />
  </Switch>
);

export default TabView;
