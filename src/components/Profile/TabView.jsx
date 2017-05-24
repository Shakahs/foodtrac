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
        <Route path="/brand/:brandId/manage" component={ManageBrand} />
      </Switch>
    </Paper>
  </Col>
);

TabView.propTypes = {
  brandName: PropTypes.string.isRequired,
  trucks: PropTypes.arrayOf(PropTypes.shape({
    brand_id: PropTypes.number,
    id: PropTypes.number,
    name: PropTypes.string,
    locations: PropTypes.array,
  })).isRequired,
  markers: PropTypes.arrayOf(PropTypes.shape({
    position: PropTypes.shape({ lat: PropTypes.number, lng: PropTypes.number }),
    key: PropTypes.number,
    defaultAnimation: PropTypes.number,
  })).isRequired,
};

export default TabView;
