import React from 'react';
import { CardHeader } from 'material-ui';
import PropTypes from 'prop-types';
import './Emblem.scss';

const Emblem = props => (
  <CardHeader avatar={props.avatar} title={props.title} subtitle={props.subtitle} />
);

Emblem.propTypes = {
  avatar: PropTypes.element.isRequired,
  title: PropTypes.element.isRequired,
  subtitle: PropTypes.element.isRequired,
};

export default Emblem;
