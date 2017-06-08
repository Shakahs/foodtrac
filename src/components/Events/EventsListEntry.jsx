import React from 'react';
import { Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardText } from 'material-ui';
import moment from 'moment';
import propSchema from '../common/PropTypes';
import './EventsListEntry.scss';

const cardHeaderStyle = {
  padding: '10px 16px 8px 16px',
  fontWeight: 'bold',
};

const EventsListEntry = props => (
  <Col xs={12} sm={12} md={6} lg={6}>
    <Card className="card-header event-card">
      <CardHeader
        style={cardHeaderStyle}
        title={<Link to={`/events/${props.event.id}`}>{props.event.name}</Link>}
        subtitle={`${moment(props.event.start).format('YYYY-MM-DD h:mm a')} - ${props.event.brands_attending.length} Trucks | ${props.event.users_attending.length} People`}
      />
      <CardText className="card-text">
        {`Organized by ${props.event.owners.first_name} ${props.event.owners.last_name}`}
      </CardText>
      <CardText className="card-text">{props.event.locations.address}</CardText>
      <CardText className="card-text" expandable>{props.event.description}</CardText>
    </Card>
  </Col>
);

EventsListEntry.propTypes = {
  event: propSchema.event,
};

export default EventsListEntry;
