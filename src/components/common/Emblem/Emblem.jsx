import React from 'react';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import './Emblem.scss';

const Emblem = props => (
  <Paper className="emblem" zDepth={1}>
    <div className="emblemLeft">
      {props.avatar}
    </div>
    <div className="emblemRight">
      {props.children}
    </div>
  </Paper>
);

Emblem.propTypes = {
  avatar: PropTypes.element.isRequired,
  children: PropTypes.arrayOf(PropTypes.element),
};

export default Emblem;
