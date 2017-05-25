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
        />))}
    </Row>
  </Grid>
);

TrucksList.propTypes = {
  user: propSchema.user,
  trucks: propSchema.trucks,
};

const mapStateToProps = ({ auth, user }) => {
  const isLoggedIn = auth.isLoggedIn;
  return { isLoggedIn, user };
};

export default connect(mapStateToProps, null)(TrucksList);
