import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import MenuList from './MenuList';
import Trucks from './Trucks';
import EventsList from './EventsList';
import ReviewsList from './ReviewsList';
import CommentsList from './CommentsList';

const TabView = props => (
  <Col xs={12} sm={12} md={9} lg={9}>
    <Paper zDepth={1} className="brandTabView">
      <Switch>
        <Route path="/brand/:brandId/menu" component={MenuList} />
        <Route
          path="/brand/:brandId/trucks"
          render={() => (<Trucks brandName={props.brandName} trucks={props.trucks} />)}
        />
        <Route path="/brand/:brandId/events" component={EventsList} />
        <Route path="/brand/:brandId/reviews" component={ReviewsList} />
        <Route path="/brand/:brandId/comments" component={CommentsList} />
      </Switch>
    </Paper>
  </Col>
);

TabView.propTypes = {
  brandName: PropTypes.string.isRequired,
  trucks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TabView;
