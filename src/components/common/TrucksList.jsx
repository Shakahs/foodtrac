import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row } from 'react-flexbox-grid';
import propSchema from './PropTypes';
import TruckEntry from './TruckEntry';

const TrucksList = props => (
  <Grid fluid>
    <Row>
      {props.trucks.map(truck =>
        (<TruckEntry
          key={truck.id}
          truck={truck}
          isLoggedIn={props.isLoggedIn}
          user={props.user}
          path={props.path}
        />))}
    </Row>
  </Grid>
);

TrucksList.propTypes = {
  trucks: propSchema.trucks,
  path: propSchema.path,
};

const mapStateToProps = ({ auth, user }) => {
  const isLoggedIn = auth.isLoggedIn;
  return { isLoggedIn, user };
};

export default connect(mapStateToProps, null)(TrucksList);
