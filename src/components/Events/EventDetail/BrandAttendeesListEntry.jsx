import React from 'react';
import TruckEmblem from '../../common/Emblem/TruckEmblem';
import propSchema from '../../common/PropTypes';

const BrandAttendeesListEntry = props => (
  <div>
    <TruckEmblem truck={props.attendee} />
  </div>
);

BrandAttendeesListEntry.propTypes = {
  attendee: propSchema.truck,
};

export default BrandAttendeesListEntry;
